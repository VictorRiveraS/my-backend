import { brandsModel } from '../brands/brands.model';
import { categoriesModel, subcategoriesModel, subsubcategoriesModel } from '../categories/categories.model';
import { laboratoriesModel } from '../laboratories/laboratories.model';
import { ProductsModel } from './products.model';

class productsService {
    public async createProduct(body: any): Promise<Array<any>> {
        try {
            const create_product: any = await ProductsModel.create(body);
            const brand: any = await brandsModel.findOneAndUpdate({ brand_id: body.product_brand_id })
            const laboratory: any = await laboratoriesModel.findOneAndUpdate({ laboratory_id: body.product_laboratory_id })
            const insert_products_category: any = await categoriesModel.findOneAndUpdate({ category_id: body.product_category_id }, {
                $push: { products: create_product._id, brands: brand, laboratories: laboratory }
            }, { upsert: true, new: true });
            if (!insert_products_category) {
                return [400, {
                    message: 'Product not add in category'
                }];
            }
            if (body.product_subcategory_id) {
                const insert_products_subcategory: any = await subcategoriesModel.findOneAndUpdate({ subcategory_id: body.product_subcategory_id }, {
                    $push: { products: create_product._id, brands: brand, laboratories: laboratory }
                }, { upsert: true, new: true });
                if (!insert_products_subcategory) {
                    return [400, {
                        message: 'Product not add in subcategory'
                    }];
                }
            }
            if (body.product_subsubcategory_id) {
                const insert_products_subsubcategory: any = await subsubcategoriesModel.findOneAndUpdate({ subsubcategory_id: body.product_subsubcategory_id }, {
                    $push: { products: create_product._id, brands: brand, laboratories: laboratory }
                }, { upsert: true, new: true });
                if (!insert_products_subsubcategory) {
                    return [400, {
                        message: 'Product not add in subsusbcategory'
                    }];
                }
            }
            return [201, { message: 'Product added', create_product }];
        } catch (error) {
            return [500, error];
        }
    }

    public async productExist(product_id: string): Promise<boolean | Array<any>> {
        try {
            const products = await ProductsModel.find({ product_id: product_id });
            if (products.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return [500, error];
        }
    }

    public async updateProduct(product_id: string, body: any): Promise<Array<any>> {
        try {
            const productExist: boolean | any[] = await this.productExist(product_id);
            if (!productExist) {
                return [404, { message: "product not found." }]
            }
            const update_product = await ProductsModel.findOneAndUpdate({ product_id: product_id }, body).setOptions({ new: true });
            if (!update_product) {
                return [401, {
                    message: 'Product not update'
                }];
            }
            return [200, {
                edit_product: update_product
            }]
        } catch (error) {
            return [500, error];
        }
    }

    public async deleteProduct(body: object, product_id: string): Promise<Array<any>> {
        try {
            const productExist: boolean | Array<any> = await this.productExist(product_id);
            if (!productExist) {
                return [404, { message: "Product not found." }]
            }
            const delete_product_remove = await ProductsModel.findOneAndDelete({ product_id: product_id }, body)
            if (!delete_product_remove) {
                return [400, {
                    message: 'Product not delete'
                }];
            }
            return [200, {
                message: 'Product deleted', delete_product_remove
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getProductsCount(body: object): Promise<number> {
        try {
            let productCount: number = await ProductsModel.find(body).count();
            return productCount
        } catch (error) {
            throw error;
        }
    }

    public async getProductService(body: object, page: number, limit: number, skip: number): Promise<Array<any>> {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await ProductsModel.find(body);
            } else {
                listSegment = await ProductsModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                    message: 'There are no products.'
                }];
            }
            return [200, {
                listSegment
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getProductByIdService(product_id: string): Promise<Array<any>> {
        try {
            const products = await ProductsModel.find({ product_id: product_id });
            if (!products) {
                return [400, {
                    message: "Product don't exists."
                }];
            }
            return [200, {
                products
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getProductsByCategoryCount(body: object): Promise<Array<any>> {
        try {
            const productsLength = await ProductsModel.find(body).count();
            if (!productsLength) {
                return [400, {
                    message: "Product don't exists."
                }];
            }
            return [200, {
                products: productsLength
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getProductByCategoryService(category_id: string, page: number, search: any, brand: string, subcategory: string, min: number, max: number, sort: any, limit: number, skip: number): Promise<Array<any>> {
        try {
            let products;
            let filters: any = {
                product_category_id: category_id,
                product_price: { $lte: max, $gte: min },
            }
            if (typeof search !== 'string') filters['$or'] = search
            if (subcategory !== '') filters['product_subcategory_id'] = { $eq: subcategory }
            if (brand !== '') filters['product_brand_id'] = { $eq: brand }
            if (page == 0) products = await ProductsModel.find(filters).sort(sort);
            else products = await ProductsModel.find(filters).setOptions({ skip: skip, limit: limit }).sort(sort);
            const totalItems = await ProductsModel.find(filters).count();
            const total_products = await ProductsModel.find(filters)
            let labs: any[] = [];
            let brands: any[] = [];
            let usesNumbers: any[] = [];
            let labsNumbers: any[] = [];
            let brandsNumbers: any[] = [];
            let sufferingsNumbers: any[] = [];
            await Promise.all(
                total_products.map(async (product: any) => {
                    brands.push(await brandsModel.findOne({ brand_id: product.product_brand_id }));
                    labs.push(await laboratoriesModel.find({ laboratory_id: product.product_lab_id }));
                    brandsNumbers.push(product.product_brand_id);
                    labsNumbers.push(product.product_lab_id);
                    usesNumbers.push(product.product_technical_info.find((codes: any) => codes.code == 'duration') ?? '');
                    sufferingsNumbers.push(product.product_technical_info.find((codes: any) => codes.code == 'type') ?? '');
                })
            );
            let uniqueLabs = [];
            let uniqueUses = [];
            let uniqueBrands = [];
            let uniqueSufferings = [];
            let uniqueUsesNumbers = [...new Set(usesNumbers)];
            let uniqueLabsNumbers = [...new Set(labsNumbers)];
            let uniqueBrandsNumbers = [...new Set(brandsNumbers)];
            let uniqueSufferingsNumbers = [...new Set(sufferingsNumbers)];
            await Promise.all(
                uniqueBrandsNumbers.map(async (brand: string) => {
                    uniqueBrands.push(await brandsModel.findOne({ brand_id: brand }));
                }),
            );
            await Promise.all(
                uniqueLabsNumbers.map(async (laboratory: string) => {
                    uniqueLabs.push(await laboratoriesModel.findOne({ laboratory_id: laboratory }));
                })
            );
            uniqueSufferings = uniqueSufferingsNumbers.map((uses) => { return uses.value })
            uniqueUses = uniqueUsesNumbers.map((uses) => { return uses.value })
            if (!products) {
                return [400, {
                    message: 'There are no categories.'
                }];
            }
            return [200, {
                products
            },
                totalItems,
                brands,
                uniqueBrands,
                labs,
                uniqueLabs,
                [...new Set(uniqueUses)],
                [...new Set(uniqueSufferings)]
            ];
        } catch (error) {
            return [500, error];
        }
    }

    public async addProductImage(image: any, product_id: string): Promise<any> {
        try {
            const existNews: any = await ProductsModel.findOne({ product_id: product_id });
            if (!existNews) {
                return [404, { message: "The product not found." }]
            }
            if (image === undefined) {
                return [500, {
                    message: "Archivo subido sin exito"
                }]
            }
            let response = image.location + "?t=" + Date.now();;
            const picture = await ProductsModel.findOneAndUpdate({ product_id: product_id }, { product_image: response }, { upsert: true, new: true });
            return [201, {
                message: "Banner image updated.", picture
            }];
        } catch (error) {
            return [500, error];
        }
    }
}

export default new productsService;
