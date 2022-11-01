import { categoriesModel, ICategoriesSubcategories, ICategoriesSubSubcategories, subcategoriesModel, subsubcategoriesModel } from './categories.model';

class CategoriesService {
    public async fetchCategoriesService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let categories;
            if (page == 0) {
                categories = await categoriesModel.find(body).populate(
                    {
                        path: 'subcategories',
                        populate: {
                            path: 'subsubcategories'
                        }
                    }
                );
            } else {
                categories = await categoriesModel.find(body).setOptions({ skip: skip, limit: limit }).populate(
                    {
                        path: 'subcategories',
                        populate: {
                            path: 'subsubcategories'
                        }
                    }
                );
            }
            if (!categories) {
                return [400, {
                    message: 'There are no categories.'
                }];
            }
            return [200, {
                categories
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async fetchSubcategoriesService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let subcategories;
            if (page == 0) {
                subcategories = await subcategoriesModel.find(body);
            } else {
                subcategories = await subcategoriesModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!subcategories) {
                return [400, {
                    message: 'There are no subcategories.'
                }];
            }
            return [200, {
                subcategories
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async fetchSubsubcategoriesService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let subsubcategories;
            if (page == 0) {
                subsubcategories = await subsubcategoriesModel.find(body);
            } else {
                subsubcategories = await subsubcategoriesModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!subsubcategories) {
                return [400, {
                    message: 'There are no subsubcategories.'
                }];
            }
            return [200, {
                subsubcategories
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getCategoryService(category_id: string): Promise<any> {
        try {
            let categories;
            categories = await categoriesModel.findOne({ category_id: category_id }).populate(
                {
                    path: 'subcategories',
                    populate: {
                        path: 'subsubcategories'
                    }
                }
            );
            return [200, {
                categories
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getSubcategoryService(subcategory_id: string): Promise<any> {
        try {
            let subcategories;
            subcategories = await subcategoriesModel.findOne({ subcategory_id: subcategory_id }).populate(
                {
                    path: 'subsubcategories',
                }
            );
            return [200, {
                subcategories
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getSubsubcategoryService(subsubcategory_id: string): Promise<any> {
        try {
            let subsubcategories;
            subsubcategories = await subsubcategoriesModel.findOne({ subsubcategory_id: subsubcategory_id });
            return [200, {
                subsubcategories
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async createCategories(body: any): Promise<any> {
        try {
            const create_category: any = await categoriesModel.create(body);
            if (!create_category) {
                return [400, {
                    message: 'Subcategory not added'
                }];
            }
            return [201, { message: 'category added', create_category }];
        } catch (error) {
            return [500, error];
        }
    }

    public async createSubcategories(body: any, category_id: string): Promise<any> {
        try {
            const category: any = await this.categoryExist(category_id);
            if (!category) {
                return [404, { message: "Category not found." }]
            }
            body.category_root = category[0].category_name;
            const create_subcategory: any = await subcategoriesModel.create(body);
            if (!create_subcategory) {
                return [400, {
                    message: 'Subcategory not added'
                }];
            }
            const insert_subcategory: any = await categoriesModel.findOneAndUpdate({ category_id: category_id }, {
                $push: { subcategories: create_subcategory._id }
            }, { upsert: true, new: true });
            if (!insert_subcategory) {
                return [400, {
                    message: 'Subcategory not added'
                }];
            }
            return [201, { message: 'Subcategory added', create_subcategory }];
        } catch (error) {
            return [500, error];
        }
    }

    public async createSubsubcategories(body: any, category_id: string, subcategory_id: string): Promise<any> {
        try {
            const category: any = await this.categoryExist(category_id);
            if (!category) {
                return [404, { message: "Category not found." }]
            }
            body.category_root = category[0].category_name;
            const subcategory: any = await this.subcategoryExist(subcategory_id);
            if (!subcategory) {
                return [404, { message: "Subcategory not found." }]
            }
            body.subcategory = subcategory[0].subcategory_name;
            const create_subsubcategory: any = await subsubcategoriesModel.create(body);
            if (!create_subsubcategory) {
                return [400, {
                    message: 'Subcategory not added'
                }];
            }
            const insert_subsubcategory: any = await subcategoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, {
                $push: { subsubcategories: create_subsubcategory._id }
            }, { upsert: true, new: true });
            if (!insert_subsubcategory) {
                return [400, {
                    message: 'Subsubcategory not added'
                }];
            }
            return [201, { message: 'Subcategory added', create_subsubcategory }];
        } catch (error) {
            return [500, error];
        }
    }

    public async updateCategory(category_id: string, body: any): Promise<any> {
        try {
            const category: any = await this.categoryExist(category_id);
            if (!category) {
                return [404, { message: "Category not found." }]
            }
            const edit_category = await categoriesModel.findOneAndUpdate({ category_id: category_id }, body).setOptions({ new: true });
            if (!edit_category) {
                return [400, {
                    message: 'Category not update'
                }];
            }
            return [200, {
                edit_category: edit_category
            }]
        } catch (error) {
            return [500, error];
        }
    }

    public async updateSubcategory(subcategory_id: string, body: any): Promise<any> {
        try {
            const subcategory = await this.subcategoryExist(subcategory_id);
            if (!subcategory) {
                return [404, { message: "Subcategory not found." }]
            }
            const edit_subcategory = await subcategoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, body).setOptions({ new: true });
            if (!edit_subcategory) {
                return [400, {
                    message: 'Subcategory not delete'
                }];
            }
            return [200, {
                edit_subcategory: edit_subcategory
            }]
        } catch (error) {
            return [500, error];
        }
    }

    public async updateSubsubcategory(subsubcategory_id: string, body: any): Promise<any> {
        try {
            const subsubcategory = await this.subsubcategoryExist(subsubcategory_id);
            if (!subsubcategory) {
                return [404, { message: "Subcategory not found." }]
            }
            const edit_subsubcategory = await subsubcategoriesModel.findOneAndUpdate({ subsubcategory_id: subsubcategory_id }, body).setOptions({ new: true });
            if (!edit_subsubcategory) {
                return [400, {
                    message: 'Subcategory not delete'
                }];
            }
            return [200, {
                edit_subcategory: edit_subsubcategory
            }]
        } catch (error) {
            return [500, error];
        }
    }

    public async deleteCategories(category_id: string): Promise<any> {
        try {
            const category: boolean = await this.categoryExist(category_id);
            if (!category) {
                return [404, { message: "Category not found." }]
            }
            category[0].subcategories.forEach(async (subcategory: any) => {
                const subcategory_founded: any = await subcategoriesModel.find({ _id: subcategory.valueOf() });
                subcategory_founded[0].subsubcategories.forEach(async (subsubcategory: any) => {
                    const subcategory_delete = await subsubcategoriesModel.findOneAndDelete({ _id: subsubcategory.valueOf() });
                    if (!subcategory_delete) {
                        return [400, {
                            message: 'Subsubcategory not delete'
                        }];
                    }
                });
                const subcategory_delete = await subcategoriesModel.findOneAndDelete({ _id: subcategory.valueOf() });
                if (!subcategory_delete) {
                    return [400, {
                        message: 'Subcategory not delete'
                    }];
                }
            });
            const delete_category_remove = await categoriesModel.findOneAndDelete({ category_id: category_id })
            if (!delete_category_remove) {
                return [400, {
                    message: 'Category not delete'
                }];
            }
            return [200, {
                message: 'Category deleted', delete_category_remove: delete_category_remove
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async deleteSubcategories(category_id: string, subcategory_id: string): Promise<any> {
        try {
            const subcategory: any = await this.subcategoryExist(subcategory_id);
            if (!subcategory) {
                return [404, { message: "Subcategory not found." }]
            }
            const pull_subcategory: any = await categoriesModel.findOneAndUpdate({ category_id: category_id }, {
                $pull: { subcategories: subcategory[0]._id.valueOf() }
            });
            if (!pull_subcategory) {
                return [404, { message: "Category not updated.1" }]
            }
            subcategory[0].subsubcategories.forEach(async (subsubcategory: any) => {
                const subcategory_delete = await subsubcategoriesModel.findOneAndDelete({ _id: subsubcategory.valueOf() });
                if (!subcategory_delete) {
                    return [400, {
                        message: 'Subsubcategory not delete'
                    }];
                }
            });
            const delete_category_remove = await subcategoriesModel.findOneAndDelete({ subcategory_id: subcategory_id })
            if (!delete_category_remove) {
                return [400, {
                    message: 'Subcategory not delete'
                }];
            }
            return [200, {
                message: 'Subcategory deleted', delete_category_remove: delete_category_remove
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async deleteSubsubcategories(category_id: string, subcategory_id: string, subsubcategory_id: string): Promise<any> {
        try {
            const subsubcategory: any = await this.subsubcategoryExist(subsubcategory_id);
            if (!subsubcategory) {
                return [404, { message: "Subsubcategory not found." }]
            }
            const subcategory: any = await this.categoryExist(category_id);
            if (!subcategory) {
                return [404, { message: "Category not found." }]
            }
            const pull_subsubcategory: any = await subcategoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, {
                $pull: { subsubcategories: subsubcategory[0]._id }
            });
            if (!pull_subsubcategory) {
                return [404, { message: "Subcategory not updated." }]
            }
            const delete_subsubcategory_remove = await subsubcategoriesModel.findOneAndDelete({ subsubcategory_id: subsubcategory_id });
            return [200, {
                message: 'Subsubcategory deleted', delete_category_remove: delete_subsubcategory_remove
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getCategoriesCount(body: object): Promise<any> {
        try {
            let segmentCount: number = await categoriesModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }


    public async categoryExist(category_id: string): Promise<any> {
        try {
            const category = await categoriesModel.find({ category_id: category_id });
            if (category.length > 0) {
                return category;
            } else {
                return;
            }
        } catch (error) {
            return [500, error];
        }
    }

    public async subcategoryExist(subcategory_id: string): Promise<any> {
        try {
            const category = await subcategoriesModel.find({ subcategory_id: subcategory_id });
            if (category.length > 0) {
                return category
            } else {
                return
            }
        } catch (error) {
            return [500, error];
        }
    }

    public async subsubcategoryExist(subsubcategory_id: string): Promise<any> {
        try {
            const subsubcategory = await subsubcategoriesModel.find({ subsubcategory_id: subsubcategory_id });
            if (subsubcategory.length > 0) {
                return subsubcategory
            } else {
                return
            }
        } catch (error) {
            return [500, error];
        }
    }

    public async quitSubSubCategory(subsubcategory: any) {
        try {
            const subcategoryExist: boolean = await this.subcategoryExist(subsubcategory);
            if (!subcategoryExist) {
                return [404, { message: "Subsubcategory not found." }]
            }
            const delete_category_remove = await subsubcategoriesModel.findOneAndDelete({ subsubcategory_id: subsubcategory.subsubcategory_id })
            if (!delete_category_remove) {
                return [400, {
                    message: 'Subsubcategory not delete'
                }];
            }
            return
        } catch (error) {
            return [500, error];
        }
    }

    public async getSubcategoriesCount(body: object): Promise<any> {
        try {
            let segmentCount: number = await subcategoriesModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }

    public async addSubcategoriesImage(file: any, subcategory_id: string): Promise<any> {
        try {
            const existSubcategory: any = await categoriesModel.findOne({ subcategory_id: subcategory_id });
            if (!existSubcategory) {
                return [404, { message: "The subcategory not found." }]
            }
            if (file === undefined) {
                return [500, {
                    message: "File upload error"
                }]
            }
            let response = file.location + "?t=" + Date.now();;
            const picture = await categoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, { category_image: response }, { upsert: true, new: true });
            return [201, {
                message: "Subcategory image updated.", picture
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async addCategoriesImage(file: any, category_id: string): Promise<any> {
        try {
            const existCategory: any = await categoriesModel.findOne({ category_id: category_id });
            if (!existCategory) {
                return [404, { message: "The category not found." }]
            }
            if (file === undefined) {
                return [500, {
                    message: "File  not upload"
                }]
            }
            let response = file.location + "?t=" + Date.now();;
            const picture = await categoriesModel.findOneAndUpdate({ category_id: category_id }, { category_image: response }, { upsert: true, new: true });
            return [201, {
                message: "Category image updated.", picture
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getSubsubcategoriesCount(body: object): Promise<any> {
        try {
            let segmentCount: number = await subsubcategoriesModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }
}

export default new CategoriesService;
