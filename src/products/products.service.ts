import { ProductsModel } from './products.model';

class productsService {


    public async createProduct(body: any): Promise<any> {
        try {
            const create_product: any = await ProductsModel.create(body);
            return [201, { message: 'Product added', create_product }];
        } catch (error) {
            return [500, error];
        }
    }

    public async productExist(product_id: string): Promise<any> {
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

    public async updateProduct(product_id: string, body: any): Promise<any> {
        try {
            const productExist: boolean = await this.productExist(product_id);
            if (!productExist) {
                return [404, { message: "product not found." }]
            }
            const edit_product = await ProductsModel.findOneAndUpdate({ product_id: product_id }, body).setOptions({ new: true });
            if (!edit_product) {
                return [401, {
                    message: 'Product not update'
                }];
            }
            return [200, {
                edit_product
            }]
        } catch (error) {
            return [500, error];
        }
    }

    public async deleteProduct(body: object, product_id: string): Promise<any> {
        try {
            const productExist: boolean = await this.productExist(product_id);
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

    public async getProductsCount(body: object): Promise<any> {
        try {
            let segmentCount: number = await ProductsModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }

    public async getProductService(body: object, page: number, limit: number, skip: number): Promise<any> {
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

    public async getProductByIdService(product_id: string): Promise<any> {
        try {
            const products = await ProductsModel.find({ product_id: product_id });
            if (!products) {
                return [400, {
                    message: 'Product dont exists.'
                }];
            }
            return [200, {
                products
            }];
        } catch (error) {
            return [500, error];
        }
    }
}

export default new productsService;