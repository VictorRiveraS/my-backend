"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_model_1 = require("./products.model");
class productsService {
    async createProduct(body) {
        try {
            const create_product = await products_model_1.ProductsModel.create(body);
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
            const edit_product = await products_model_1.ProductsModel.findOneAndUpdate({ product_id: product_id }, body).setOptions({ new: true });
            if (!edit_product) {
                return [401, {
                        message: 'Product not update'
                    }];
            }
            return [200, {
                    edit_product
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
            let segmentCount = await products_model_1.ProductsModel.find(body).count();
            return segmentCount;
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
                        message: 'Product dont exists.'
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
}
exports.default = new productsService;
