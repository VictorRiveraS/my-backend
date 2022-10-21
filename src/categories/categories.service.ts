import { categoriesModel } from './categories.model';

class CategoriesService {
    public async createCategories(body: any): Promise<any> {
        try {
            const create_category: any = await categoriesModel.create(body);
            return [201, { message: 'category added', create_category }];
        } catch (error) {
            return [500, error];
        }
    }

    public async categoryExist(category_id: string): Promise<any> {
        try {
            const category = await categoriesModel.find({ category_id: category_id });
            if (category.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return [500, error];
        }
    }

    public async updateCategory(category_id: string, body: any): Promise<any> {
        try {
            const categoryExist: boolean = await this.categoryExist(category_id);
            if (!categoryExist) {
                return [404, { message: "Category not found." }]
            }
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

    public async deleteCategories(body: object, category_id: string): Promise<any> {
        try {
            const categoryExist: boolean = await this.categoryExist(category_id);
            if (!categoryExist) {
                return [404, { message: "Category not found." }]
            }
            const delete_category_remove = await categoriesModel.findOneAndDelete({ category_id: category_id }, body)
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
                    message: "Archivo subido sin exito"
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
}

export default new CategoriesService;
