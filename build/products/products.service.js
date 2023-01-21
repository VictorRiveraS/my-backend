"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brands_model_1 = require("../brands/brands.model");
const categories_model_1 = require("../categories/categories.model");
const laboratories_model_1 = require("../laboratories/laboratories.model");
const products_model_1 = require("./products.model");
class productsService {
    async createProduct(body) {
        try {
            console.log(body.product_family_friend_url);
            const create_product = await products_model_1.ProductsModel.create(body);
            console.log(create_product);
            const brand = await brands_model_1.brandsModel.findOneAndUpdate({ brand_id: body.product_brand_id });
            const laboratory = await laboratories_model_1.laboratoriesModel.findOneAndUpdate({ laboratory_id: body.product_laboratory_id });
            const insert_products_category = await categories_model_1.categoriesModel.findOneAndUpdate({ category_id: body.product_category_id }, {
                $push: { products: create_product._id, brands: brand, laboratories: laboratory }
            }, { upsert: true, new: true });
            if (!insert_products_category) {
                return [400, {
                        message: 'Product not add in category'
                    }];
            }
            if (body.product_subcategory_id) {
                const insert_products_subcategory = await categories_model_1.subcategoriesModel.findOneAndUpdate({ subcategory_id: body.product_subcategory_id }, {
                    $push: { products: create_product._id, brands: brand, laboratories: laboratory }
                }, { upsert: true, new: true });
                if (!insert_products_subcategory) {
                    return [400, {
                            message: 'Product not add in subcategory'
                        }];
                }
            }
            if (body.product_subsubcategory_id) {
                const insert_products_subsubcategory = await categories_model_1.subsubcategoriesModel.findOneAndUpdate({ subsubcategory_id: body.product_subsubcategory_id }, {
                    $push: { products: create_product._id, brands: brand, laboratories: laboratory }
                }, { upsert: true, new: true });
                if (!insert_products_subsubcategory) {
                    return [400, {
                            message: 'Product not add in subsusbcategory'
                        }];
                }
            }
            return [201, { message: 'Product added', create_product }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async productExist(product_id) {
        try {
            const products = await products_model_1.ProductsModel.find({ product_id: product_id });
            if (products.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return [500, error];
        }
    }
    async updateProduct(product_id, body) {
        try {
            const productExist = await this.productExist(product_id);
            if (!productExist) {
                return [404, { message: "product not found." }];
            }
            const update_product = await products_model_1.ProductsModel.findOneAndUpdate({ product_id: product_id }, body).setOptions({ new: true });
            if (!update_product) {
                return [401, {
                        message: 'Product not update'
                    }];
            }
            return [200, {
                    edit_product: update_product
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async deleteProduct(body, product_id) {
        try {
            const productExist = await this.productExist(product_id);
            if (!productExist) {
                return [404, { message: "Product not found." }];
            }
            const delete_product_remove = await products_model_1.ProductsModel.findOneAndDelete({ product_id: product_id }, body);
            if (!delete_product_remove) {
                return [400, {
                        message: 'Product not delete'
                    }];
            }
            return [200, {
                    message: 'Product deleted', delete_product_remove
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getProductsCount(body) {
        try {
            let productCount = await products_model_1.ProductsModel.find(body).count();
            return productCount;
        }
        catch (error) {
            throw error;
        }
    }
    async getProductService(body, page, limit, skip) {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await products_model_1.ProductsModel.find(body);
            }
            else {
                listSegment = await products_model_1.ProductsModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                        message: 'There are no products.'
                    }];
            }
            return [200, {
                    listSegment
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getProductByIdService(product_id) {
        try {
            const products = await products_model_1.ProductsModel.find({ product_id: product_id });
            if (!products) {
                return [400, {
                        message: "Product don't exists."
                    }];
            }
            return [200, {
                    products
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getProductsByCategoryCount(body) {
        try {
            const productsLength = await products_model_1.ProductsModel.find(body).count();
            if (!productsLength) {
                return [400, {
                        message: "Product don't exists."
                    }];
            }
            return [200, {
                    products: productsLength
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getProductByCategoryService(findParams, sort, pagination) {
        try {
            let products = await products_model_1.ProductsModel.find(findParams).setOptions(pagination).sort(sort);
            const totalItems = await products_model_1.ProductsModel.find(findParams).count();
            const total_products = await products_model_1.ProductsModel.find(findParams);
            let labs = [];
            let brands = [];
            let usesNumbers = [];
            let labsNumbers = [];
            let brandsNumbers = [];
            let sufferingsNumbers = [];
            await Promise.all(total_products.map(async (product) => {
                brands.push(await brands_model_1.brandsModel.findOne({ brand_id: product.product_brand_id }));
                labs.push(await laboratories_model_1.laboratoriesModel.find({ laboratory_id: product.product_lab_id }));
                brandsNumbers.push(product.product_brand_id);
                labsNumbers.push(product.product_lab_id);
                usesNumbers.push(product.product_technical_info.find((codes) => codes.code == 'duration') ?? '');
                sufferingsNumbers.push(product.product_technical_info.find((codes) => codes.code == 'type') ?? '');
            }));
            let uniqueLabs = [];
            let uniqueUses = [];
            let uniqueBrands = [];
            let uniqueSufferings = [];
            let uniqueUsesNumbers = [...new Set(usesNumbers)];
            let uniqueLabsNumbers = [...new Set(labsNumbers)];
            let uniqueBrandsNumbers = [...new Set(brandsNumbers)];
            let uniqueSufferingsNumbers = [...new Set(sufferingsNumbers)];
            await Promise.all(uniqueBrandsNumbers.map(async (brand) => {
                uniqueBrands.push(await brands_model_1.brandsModel.findOne({ brand_id: brand }));
            }));
            await Promise.all(uniqueLabsNumbers.map(async (laboratory) => {
                uniqueLabs.push(await laboratories_model_1.laboratoriesModel.findOne({ laboratory_id: laboratory }));
            }));
            uniqueSufferings = uniqueSufferingsNumbers.map((uses) => { return uses.value; });
            uniqueUses = uniqueUsesNumbers.map((uses) => { return uses.value; });
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
        }
        catch (error) {
            return [500, error];
        }
    }
    async addProductImage(image, product_id) {
        try {
            const existNews = await products_model_1.ProductsModel.findOne({ product_id: product_id });
            if (!existNews) {
                return [404, { message: "The product not found." }];
            }
            if (image === undefined) {
                return [500, {
                        message: "Archivo subido sin exito"
                    }];
            }
            let response = image.location + "?t=" + Date.now();
            ;
            const picture = await products_model_1.ProductsModel.findOneAndUpdate({ product_id: product_id }, { product_image: response }, { upsert: true, new: true });
            return [201, {
                    message: "Banner image updated.", picture
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
}
exports.default = new productsService;
