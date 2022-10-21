import { categorysModel } from './categories.model';

class BannersService {
    public async createCategories(body: any): Promise<any> {
        try {
            const create_banner: any = await categorysModel.create(body);
            return [201, { message: 'banner added', create_banner }];
        } catch (error) {
            return [500, error];
        }
    }

    public async categoryExist(category_id: string): Promise<any> {
        try {
            const banners = await categorysModel.find({ category_id: category_id });
            if (banners.length > 0) {
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
            const bannerExist: boolean = await this.categoryExist(category_id);
            if (!bannerExist) {
                return [404, { message: "Banner not found." }]
            }
            const edit_banner = await categorysModel.findOneAndUpdate({ category_id: category_id }, body).setOptions({ new: true });
            if (!edit_banner) {
                return [401, {
                    message: 'News not update'
                }];
            }
            return [200, {
                edit_banner
            }]
        } catch (error) {
            return [500, error];
        }
    }

    public async deleteCategories(body: object, category_id: string): Promise<any> {
        try {
            const bannerExist: boolean = await this.categoryExist(category_id);
            if (!bannerExist) {
                return [404, { message: "Banner not found." }]
            }
            const delete_banner_remove = await categorysModel.findOneAndDelete({ category_id: category_id }, body)
            if (!delete_banner_remove) {
                return [400, {
                    message: 'Banner not delete'
                }];
            }
            return [200, {
                message: 'Banner deleted', delete_banner_remove
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getCategoriesCount(body: object): Promise<any> {
        try {
            let segmentCount: number = await categorysModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }

    public async getCategoriesService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await categorysModel.find(body);
            } else {
                listSegment = await categorysModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                    message: 'There are no banners.'
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
            const existNews: any = await categorysModel.findOne({ category_id: category_id });
            if (!existNews) {
                return [404, { message: "The banner not found." }]
            }
            if (file === undefined) {
                return [500, {
                    message: "Archivo subido sin exito"
                }]
            }
            let response = file.location + "?t=" + Date.now();;
            const picture = await categorysModel.findOneAndUpdate({ category_id: category_id }, { banner_image: response }, { upsert: true, new: true });
            return [201, {
                message: "Banner image updated.", picture
            }];
        } catch (error) {
            return [500, error];
        }
    }
}

export default new BannersService;
