"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_model_1 = require("./categories.model");
class CategoriesService {
    async fetchCategoriesService(body, page, limit, skip) {
        try {
            let categories;
            if (page == 0) {
                categories = await categories_model_1.categoriesModel.find(body).populate([
                    {
                        path: 'subcategories',
                        populate: {
                            path: 'subsubcategories products brands laboratories'
                        }
                    },
                    {
                        path: 'products brands laboratories',
                    }
                ]);
            }
            else {
                categories = await categories_model_1.categoriesModel.find(body).setOptions({ skip: skip, limit: limit }).populate([
                    {
                        path: 'subcategories',
                        populate: {
                            path: 'subsubcategories products brands laboratories'
                        }
                    },
                    {
                        path: 'products brands laboratories',
                    }
                ]);
            }
            if (!categories) {
                return [400, {
                        message: 'There are no categories.'
                    }];
            }
            this.getLabsCount(categories);
            return [200, {
                    categories
                }];
        }
        catch (error) {
            console.log(error);
            return [500, error];
        }
    }
    async fetchSubcategoriesService(body, page, limit, skip) {
        try {
            let subcategories;
            if (page == 0) {
                subcategories = await categories_model_1.subcategoriesModel.find(body).populate([
                    {
                        path: 'subsubcategories',
                        populate: {
                            path: 'subsubcategories products brands laboratories'
                        }
                    },
                    {
                        path: 'subsubcategories products brands laboratories',
                    },
                ]);
            }
            else {
                subcategories = await categories_model_1.subcategoriesModel.find(body).setOptions({ skip: skip, limit: limit }).populate([
                    {
                        path: 'subsubcategories',
                        populate: {
                            path: 'subsubcategories products brands laboratories'
                        }
                    },
                    {
                        path: 'subsubcategories products brands laboratories',
                    },
                ]);
            }
            if (!subcategories) {
                return [400, {
                        message: 'There are no subcategories.'
                    }];
            }
            return [200, {
                    subcategories
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async fetchSubsubcategoriesService(body, page, limit, skip) {
        try {
            let subsubcategories;
            if (page == 0) {
                subsubcategories = await categories_model_1.subsubcategoriesModel.find(body).populate({
                    path: 'products brands laboratories',
                });
            }
            else {
                subsubcategories = await categories_model_1.subsubcategoriesModel.find(body).setOptions({ skip: skip, limit: limit }).populate({
                    path: 'products brands laboratories',
                });
            }
            if (!subsubcategories) {
                return [400, {
                        message: 'There are no subsubcategories.'
                    }];
            }
            return [200, {
                    subsubcategories
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getCategoryService(category_id) {
        try {
            let categories;
            categories = await categories_model_1.categoriesModel.findOne({ category_id: category_id }).populate({
                path: 'subcategories',
                populate: {
                    path: 'subsubcategories'
                }
            });
            this.getLabsCount(categories);
            return [200, {
                    categories
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getSubcategoryService(subcategory_id) {
        try {
            let subcategories;
            subcategories = await categories_model_1.subcategoriesModel.findOne({ subcategory_id: subcategory_id }).populate({
                path: 'subsubcategories',
            });
            return [200, {
                    subcategories
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getSubsubcategoryService(subsubcategory_id) {
        try {
            let subsubcategories;
            subsubcategories = await categories_model_1.subsubcategoriesModel.findOne({ subsubcategory_id: subsubcategory_id });
            return [200, {
                    subsubcategories
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async createCategories(body) {
        try {
            const create_category = await categories_model_1.categoriesModel.create(body);
            if (!create_category) {
                return [400, {
                        message: 'Subcategory not added'
                    }];
            }
            return [201, { message: 'category added', create_category }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async createSubcategories(body, category_id) {
        try {
            const category = await this.categoryExist(category_id);
            if (!category) {
                return [404, { message: "Category not found." }];
            }
            body.category_root = category[0].category_name;
            const create_subcategory = await categories_model_1.subcategoriesModel.create(body);
            if (!create_subcategory) {
                return [400, {
                        message: 'Subcategory not added'
                    }];
            }
            const insert_subcategory = await categories_model_1.categoriesModel.findOneAndUpdate({ category_id: category_id }, {
                $push: { subcategories: create_subcategory._id }
            }, { upsert: true, new: true });
            if (!insert_subcategory) {
                return [400, {
                        message: 'Subcategory not added'
                    }];
            }
            return [201, { message: 'Subcategory added', create_subcategory }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async createSubsubcategories(body, category_id, subcategory_id) {
        try {
            const category = await this.categoryExist(category_id);
            if (!category) {
                return [404, { message: "Category not found." }];
            }
            body.category_root = category[0].category_name;
            const subcategory = await this.subcategoryExist(subcategory_id);
            if (!subcategory) {
                return [404, { message: "Subcategory not found." }];
            }
            body.subcategory = subcategory[0].subcategory_name;
            const create_subsubcategory = await categories_model_1.subsubcategoriesModel.create(body);
            if (!create_subsubcategory) {
                return [400, {
                        message: 'Subcategory not added'
                    }];
            }
            const insert_subsubcategory = await categories_model_1.subcategoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, {
                $push: { subsubcategories: create_subsubcategory._id }
            }, { upsert: true, new: true });
            if (!insert_subsubcategory) {
                return [400, {
                        message: 'Subsubcategory not added'
                    }];
            }
            return [201, { message: 'Subcategory added', create_subsubcategory }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async updateCategory(category_id, body) {
        try {
            const category = await this.categoryExist(category_id);
            if (!category) {
                return [404, { message: "Category not found." }];
            }
            const edit_category = await categories_model_1.categoriesModel.findOneAndUpdate({ category_id: category_id }, body).setOptions({ new: true });
            if (!edit_category) {
                return [400, {
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
    async updateSubcategory(subcategory_id, body) {
        try {
            const subcategory = await this.subcategoryExist(subcategory_id);
            if (!subcategory) {
                return [404, { message: "Subcategory not found." }];
            }
            const edit_subcategory = await categories_model_1.subcategoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, body).setOptions({ new: true });
            if (!edit_subcategory) {
                return [400, {
                        message: 'Subcategory not delete'
                    }];
            }
            return [200, {
                    edit_subcategory: edit_subcategory
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async updateSubsubcategory(subsubcategory_id, body) {
        try {
            const subsubcategory = await this.subsubcategoryExist(subsubcategory_id);
            if (!subsubcategory) {
                return [404, { message: "Subcategory not found." }];
            }
            const edit_subsubcategory = await categories_model_1.subsubcategoriesModel.findOneAndUpdate({ subsubcategory_id: subsubcategory_id }, body).setOptions({ new: true });
            if (!edit_subsubcategory) {
                return [400, {
                        message: 'Subcategory not delete'
                    }];
            }
            return [200, {
                    edit_subcategory: edit_subsubcategory
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async deleteCategories(category_id) {
        try {
            const category = await this.categoryExist(category_id);
            if (!category) {
                return [404, { message: "Category not found." }];
            }
            category[0].subcategories.forEach(async (subcategory) => {
                const subcategory_founded = await categories_model_1.subcategoriesModel.find({ _id: subcategory.valueOf() });
                subcategory_founded[0].subsubcategories.forEach(async (subsubcategory) => {
                    const subcategory_delete = await categories_model_1.subsubcategoriesModel.findOneAndDelete({ _id: subsubcategory.valueOf() });
                    if (!subcategory_delete) {
                        return [400, {
                                message: 'Subsubcategory not delete'
                            }];
                    }
                });
                const subcategory_delete = await categories_model_1.subcategoriesModel.findOneAndDelete({ _id: subcategory.valueOf() });
                if (!subcategory_delete) {
                    return [400, {
                            message: 'Subcategory not delete'
                        }];
                }
            });
            const delete_category_remove = await categories_model_1.categoriesModel.findOneAndDelete({ category_id: category_id });
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
    async deleteSubcategories(category_id, subcategory_id) {
        try {
            const subcategory = await this.subcategoryExist(subcategory_id);
            if (!subcategory) {
                return [404, { message: "Subcategory not found." }];
            }
            const pull_subcategory = await categories_model_1.categoriesModel.findOneAndUpdate({ category_id: category_id }, {
                $pull: { subcategories: subcategory[0]._id.valueOf() }
            });
            if (!pull_subcategory) {
                return [404, { message: "Category not updated.1" }];
            }
            subcategory[0].subsubcategories.forEach(async (subsubcategory) => {
                const subcategory_delete = await categories_model_1.subsubcategoriesModel.findOneAndDelete({ _id: subsubcategory.valueOf() });
                if (!subcategory_delete) {
                    return [400, {
                            message: 'Subsubcategory not delete'
                        }];
                }
            });
            const delete_category_remove = await categories_model_1.subcategoriesModel.findOneAndDelete({ subcategory_id: subcategory_id });
            if (!delete_category_remove) {
                return [400, {
                        message: 'Subcategory not delete'
                    }];
            }
            return [200, {
                    message: 'Subcategory deleted', delete_category_remove: delete_category_remove
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async deleteSubsubcategories(category_id, subcategory_id, subsubcategory_id) {
        try {
            const subsubcategory = await this.subsubcategoryExist(subsubcategory_id);
            if (!subsubcategory) {
                return [404, { message: "Subsubcategory not found." }];
            }
            const subcategory = await this.categoryExist(category_id);
            if (!subcategory) {
                return [404, { message: "Category not found." }];
            }
            const pull_subsubcategory = await categories_model_1.subcategoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, {
                $pull: { subsubcategories: subsubcategory[0]._id }
            });
            if (!pull_subsubcategory) {
                return [404, { message: "Subcategory not updated." }];
            }
            const delete_subsubcategory_remove = await categories_model_1.subsubcategoriesModel.findOneAndDelete({ subsubcategory_id: subsubcategory_id });
            return [200, {
                    message: 'Subsubcategory deleted', delete_category_remove: delete_subsubcategory_remove
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
    async categoryExist(category_id) {
        try {
            const category = await categories_model_1.categoriesModel.find({ category_id: category_id });
            if (category.length > 0) {
                return category;
            }
            else {
                return;
            }
        }
        catch (error) {
            return [500, error];
        }
    }
    async subcategoryExist(subcategory_id) {
        try {
            const category = await categories_model_1.subcategoriesModel.find({ subcategory_id: subcategory_id });
            if (category.length > 0) {
                return category;
            }
            else {
                return;
            }
        }
        catch (error) {
            return [500, error];
        }
    }
    async subsubcategoryExist(subsubcategory_id) {
        try {
            const subsubcategory = await categories_model_1.subsubcategoriesModel.find({ subsubcategory_id: subsubcategory_id });
            if (subsubcategory.length > 0) {
                return subsubcategory;
            }
            else {
                return;
            }
        }
        catch (error) {
            return [500, error];
        }
    }
    async quitSubSubCategory(subsubcategory) {
        try {
            const subcategoryExist = await this.subcategoryExist(subsubcategory);
            if (!subcategoryExist) {
                return [404, { message: "Subsubcategory not found." }];
            }
            const delete_category_remove = await categories_model_1.subsubcategoriesModel.findOneAndDelete({ subsubcategory_id: subsubcategory.subsubcategory_id });
            if (!delete_category_remove) {
                return [400, {
                        message: 'Subsubcategory not delete'
                    }];
            }
            return;
        }
        catch (error) {
            return [500, error];
        }
    }
    async getSubcategoriesCount(body) {
        try {
            let segmentCount = await categories_model_1.subcategoriesModel.find(body).count();
            return segmentCount;
        }
        catch (error) {
            throw error;
        }
    }
    async addSubcategoriesImage(file, subcategory_id) {
        try {
            const existSubcategory = await categories_model_1.categoriesModel.findOne({ subcategory_id: subcategory_id });
            if (!existSubcategory) {
                return [404, { message: "The subcategory not found." }];
            }
            if (file === undefined) {
                return [500, {
                        message: "File upload error"
                    }];
            }
            let response = file.location + "?t=" + Date.now();
            ;
            const picture = await categories_model_1.categoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, { category_image: response }, { upsert: true, new: true });
            return [201, {
                    message: "Subcategory image updated.", picture
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
                        message: "File  not upload"
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
    async getSubsubcategoriesCount(body) {
        try {
            let segmentCount = await categories_model_1.subsubcategoriesModel.find(body).count();
            return segmentCount;
        }
        catch (error) {
            throw error;
        }
    }
    async getLabsCount(body) {
        try {
            //let labsCount: number = await categoriesModel.find();
            //return labsCount
            return;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new CategoriesService;
