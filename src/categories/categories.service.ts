import { categoriesModel, ICategoriesSubcategories, ICategoriesSubSubcategories, subcategoriesModel, subsubcategoriesModel } from './categories.model';

class CategoriesService {
    public async createCategories(body: any): Promise<any> {
        try {
            console.log(body);
            const create_category: any = await categoriesModel.create(body);
            console.log(create_category);

            return [201, { message: 'category added', create_category }];
        } catch (error) {
            return [500, error];
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

    public async updateCategory(category_id: string, body: any): Promise<any> {
        try {
            const category: boolean = await this.categoryExist(category_id);
            if (!category) {
                return [404, { message: "Category not found." }]
            }
            category[0].category_subcategory.forEach(async (subcategory_original: any) => {
                const subcategoryCheck = body.category_subcategory.some((subcategory_new: any) => {
                    return subcategory_new.subcategory_id == subcategory_original.subcategory_id
                });
                if (!subcategoryCheck) {
                    subcategory_original.category_subsubcategory.forEach(async (subsubcategory_original: any) => {
                        await this.quitSubSubCategory(subsubcategory_original);
                    });
                    await this.quitSubCategory(subcategory_original);
                };
            });
            const edit_category = await categoriesModel.findOneAndUpdate({ category_id: category_id }, body).setOptions({ new: true });
            if (!edit_category) {
                return [401, {
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

    public async quitSubCategory(subcategory: any) {
        try {
            const subcategoryExist: boolean = await this.subcategoryExist(subcategory);
            if (!subcategoryExist) {
                return [404, { message: "Subcategory not found." }]
            }
            const delete_subcategory_remove = await subcategoriesModel.findOneAndDelete({ subcategory_id: subcategory.subcategory_id })
            if (!delete_subcategory_remove) {
                return [400, {
                    message: 'Subcategory not delete'
                }];
            }
            return
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
            category[0].category_subcategory.forEach(async (subcategory_original: any) => {
                subcategory_original.category_subsubcategory.forEach(async (subsubcategory_original: any) => {
                    await this.quitSubSubCategory(subsubcategory_original);
                });
                await this.quitSubCategory(subcategory_original);
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

    public async getCategoriesCount(body: object): Promise<any> {
        try {
            let segmentCount: number = await categoriesModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }

    public async getCategoriesService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await categoriesModel.find(body);
            } else {
                listSegment = await categoriesModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                    message: 'There are no categories.'
                }];
            }
            return [200, {
                listSegment
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

    public async createSubcategories(body: any, category_id: string): Promise<any> {
        try {
            const create_subcategory: any = await subcategoriesModel.create(body);
            const root_category: Array<ICategoriesSubcategories> = [{
                subcategory_id: create_subcategory.subcategory_id,
                subcategory_name: create_subcategory.subcategory_name
            }]
            await categoriesModel.findOneAndUpdate({ category_id: category_id }, { category_subcategory: root_category }, { upsert: true, new: true });
            return [201, { message: 'Subcategory added', create_subcategory }];
        } catch (error) {
            return [500, error];
        }
    }

    public async createSubsubcategories(body: any, category_id: string, subcategory_id: string): Promise<any> {
        try {
            const create_subsubcategory: any = await subsubcategoriesModel.create(body);
            const category: any = await categoriesModel.find({ category_id: category_id });
            const subcategory: any = category[0].category_subcategory.find((category: any) => category.subcategory_id == subcategory_id);
            let checkName: any
            if (subcategory) {
                checkName = subcategory.category_subsubcategory.find((subcategory: any) => subcategory.subsubcategory_name == body.subsubcategory_name);
            } else {
                checkName = false;
            }
            let root_category!: Array<ICategoriesSubcategories>
            let sub_category!: Array<ICategoriesSubSubcategories>
            let newSubsubcategory: any
            if (!checkName) {
                sub_category = [{
                    subsubcategory_id: create_subsubcategory.subsubcategory_id,
                    subsubcategory_name: create_subsubcategory.subsubcategory_name
                }];
                if (!subcategory) {
                    newSubsubcategory = [
                        ...sub_category
                    ]
                } else {
                    newSubsubcategory = [
                        ...subcategory?.category_subsubcategory,
                        ...sub_category
                    ]
                }
                root_category = [{
                    subcategory_id: create_subsubcategory.subcategory_id,
                    subcategory_name: create_subsubcategory.subcategory,
                    category_subsubcategory: [...newSubsubcategory]
                }]
                await categoriesModel.findOneAndUpdate({ category_id: category_id }, { category_subcategory: root_category }, { upsert: true, new: true });
                await subcategoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, { category_subsubcategory: newSubsubcategory }, { upsert: true, new: true });
                return [201, { message: 'Subcategory added', create_subcategory: create_subsubcategory }];
            }
            return [400, 'The category name has been registered'];
        } catch (error) {
            console.log(error);
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

    public async updateSubcategory(subcategory_id: string, body: any): Promise<any> {
        try {
            const subcategory = await this.subcategoryExist(subcategory_id);
            if (!subcategory) {
                return [404, { message: "Subcategory not found." }]
            }
            subcategory[0].category_subsubcategory.forEach((subsubcategory_original: any) => {
                const subsubcategoryCheck = body.category_subsubcategory.some((subsubcategory_new: any) => {
                    return subsubcategory_new.subsubcategory_id == subsubcategory_original.subsubcategory_id
                });
                if (!subsubcategoryCheck) this.quitSubSubCategory(subsubcategory_original);
            });
            const edit_subcategory = await subcategoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, body).setOptions({ new: true });
            if (!edit_subcategory) {
                return [400, {
                    message: 'Subcategory not update'
                }];
            }
            return [200, {
                edit_subcategory: edit_subcategory
            }]
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

    public async deleteSubcategories(body: object, subcategory_id: string): Promise<any> {
        try {
            const subcategoryExist: boolean = await this.subcategoryExist(subcategory_id);
            if (!subcategoryExist) {
                return [404, { message: "Subcategory not found." }]
            }
            const subcategory = await this.subcategoryExist(subcategory_id);
            if (!subcategory) {
                return [404, { message: "Subcategory not found." }]
            }
            subcategory[0].category_subsubcategory.forEach((subsubcategory_original: any) => {
                this.quitSubSubCategory(subsubcategory_original);
            });
            const delete_category_remove = await subcategoriesModel.findOneAndDelete({ subcategory_id: subcategory_id }, body)
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

    public async getSubcategoriesCount(body: object): Promise<any> {
        try {
            let segmentCount: number = await subcategoriesModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }

    public async getSubcategoriesService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await subcategoriesModel.find(body);
            } else {
                listSegment = await subcategoriesModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                    message: 'There are no subcategories.'
                }];
            }
            return [200, {
                listSegment
            }];
        } catch (error) {
            return [500, error];
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

    public async subsubcategoryExist(subsubcategory_id: string): Promise<any> {
        try {
            const subsubcategory = await subcategoriesModel.find({ subsubcategory_id: subsubcategory_id });
            if (subsubcategory.length > 0) {
                return subsubcategory
            } else {
                return
            }
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

    public async getSubsubcategoriesService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await subsubcategoriesModel.find(body);
            } else {
                listSegment = await subsubcategoriesModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                    message: 'There are no subsubcategories.'
                }];
            }
            return [200, {
                listSegment
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async deleteSubsubcategories(category_id: string, subcategory_id: string, subsubcategory_id: string): Promise<any> {
        try {
            const subsubcategory: boolean = await this.subsubcategoryExist(subsubcategory_id);
            if (!subsubcategory) {
                return [404, { message: "Subsubcategory not found." }]
            }
            const update_category = await categoriesModel.findOneAndUpdate({ category_id: category_id }, {
                '$pull':
                {
                    "category_subcategory.$[].category_subsubcategory": { 'subsubcategory_id': subsubcategory_id }
                }
            });
            const update_subcategory = await subcategoriesModel.findOneAndUpdate({ subcategory_id: subcategory_id }, {
                '$pull':
                    { 'category_subsubcategory': { 'subsubcategory_id': subsubcategory_id } }
            });
            const delete_subsubcategory_remove = await subsubcategoriesModel.findOneAndDelete({ subsubcategory_id: subsubcategory_id });
            if (!update_category) {
                return [400, {
                    message: 'Category not delete'
                }];
            }
            if (!update_subcategory) {
                return [400, {
                    message: 'Subcategory not delete'
                }];
            }
            if (!delete_subsubcategory_remove) {
                return [400, {
                    message: 'Subsubcategory not delete'
                }];
            }
            return [200, {
                message: 'Subsubcategory deleted', delete_category_remove: delete_subsubcategory_remove
            }];
        } catch (error) {
            return [500, error];
        }
    }
}

export default new CategoriesService;
