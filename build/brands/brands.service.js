"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brands_model_1 = require("./brands.model");
class BrandsService {
    async createBrands(body) {
        try {
            const create_brand = await brands_model_1.brandsModel.create(body);
            return [201, { message: 'brand added', create_brand }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async brandExist(brand_id) {
        try {
            const brand = await brands_model_1.brandsModel.find({ brand_id: brand_id });
            if (brand.length > 0) {
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
    async updateBrands(brand_id, body) {
        try {
            const brandExist = await this.brandExist(brand_id);
            if (!brandExist) {
                return [404, { message: "Brand not found." }];
            }
            const edit_brand = await brands_model_1.brandsModel.findOneAndUpdate({ brand_id: brand_id }, body).setOptions({ new: true });
            if (!edit_brand) {
                return [401, {
                        message: 'Brand not update'
                    }];
            }
            return [200, {
                    edit_brand: edit_brand
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async deleteBrands(body, brand_id) {
        try {
            const brandExist = await this.brandExist(brand_id);
            if (!brandExist) {
                return [404, { message: "Brand not found." }];
            }
            const delete_brand_remove = await brands_model_1.brandsModel.findOneAndDelete({ brand_id: brand_id }, body);
            if (!delete_brand_remove) {
                return [400, {
                        message: 'Brand not delete'
                    }];
            }
            return [200, {
                    message: 'Brand deleted', delete_brand_remove: delete_brand_remove
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getBrandsCount(body) {
        try {
            let segmentCount = await brands_model_1.brandsModel.find(body).count();
            return segmentCount;
        }
        catch (error) {
            throw error;
        }
    }
    async getBrandsService(body, page, limit, skip) {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await brands_model_1.brandsModel.find(body);
            }
            else {
                listSegment = await brands_model_1.brandsModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                        message: 'There are no brands.'
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
    async addBrandsImage(file, brand_id) {
        try {
            const existCategory = await brands_model_1.brandsModel.findOne({ brand_id: brand_id });
            if (!existCategory) {
                return [404, { message: "The Brand not found." }];
            }
            if (file === undefined) {
                return [500, {
                        message: "Archivo subido sin exito"
                    }];
            }
            let response = file.location + "?t=" + Date.now();
            ;
            const picture = await brands_model_1.brandsModel.findOneAndUpdate({ brand_id: brand_id }, { category_image: response }, { upsert: true, new: true });
            return [201, {
                    message: "Brand image updated.", picture
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
}
exports.default = new BrandsService;
