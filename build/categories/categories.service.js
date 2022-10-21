"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_model_1 = require("./categories.model");
class CategoriesService {
    async createCategories(body) {
        try {
            const create_category = await categories_model_1.categoriesModel.create(body);
            return [201, { message: 'category added', create_category }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async categoryExist(category_id) {
        try {
            const category = await categories_model_1.categoriesModel.find({ category_id: category_id });
            if (category.length > 0) {
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
    async updateCategory(category_id, body) {
        try {
            const categoryExist = await this.categoryExist(category_id);
            if (!categoryExist) {
                return [404, { message: "Category not found." }];
            }
            const edit_category = await categories_model_1.categoriesModel.findOneAndUpdate({ category_id: category_id }, body).setOptions({ new: true });
            if (!edit_category) {
                return [401, {
                        message: 'Category not update'
                    }];
            }
            return [200, {
                    edit_category: edit_category
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async deleteCategories(body, category_id) {
        try {
            const categoryExist = await this.categoryExist(category_id);
            if (!categoryExist) {
                return [404, { message: "Category not found." }];
            }
            const delete_category_remove = await categories_model_1.categoriesModel.findOneAndDelete({ category_id: category_id }, body);
            if (!delete_category_remove) {
                return [400, {
                        message: 'Category not delete'
                    }];
            }
            return [200, {
                    message: 'Category deleted', delete_category_remove: delete_category_remove
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getCategoriesCount(body) {
        try {
            let segmentCount = await categories_model_1.categoriesModel.find(body).count();
            return segmentCount;
        }
        catch (error) {
            throw error;
        }
    }
    async getCategoriesService(body, page, limit, skip) {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await categories_model_1.categoriesModel.find(body);
            }
            else {
                listSegment = await categories_model_1.categoriesModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                        message: 'There are no categories.'
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
    async addCategoriesImage(file, category_id) {
        try {
            const existCategory = await categories_model_1.categoriesModel.findOne({ category_id: category_id });
            if (!existCategory) {
                return [404, { message: "The category not found." }];
            }
            if (file === undefined) {
                return [500, {
                        message: "Archivo subido sin exito"
                    }];
            }
            let response = file.location + "?t=" + Date.now();
            ;
            const picture = await categories_model_1.categoriesModel.findOneAndUpdate({ category_id: category_id }, { category_image: response }, { upsert: true, new: true });
            return [201, {
                    message: "Category image updated.", picture
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
}
exports.default = new CategoriesService;
