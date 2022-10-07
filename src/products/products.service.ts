import { ProductsModel } from './products.model';

class BannersService {


    public async createProduct(body: any): Promise<any> {
        try {
            console.log(body.banner_id);
            const create_banner: any = await ProductsModel.create(body);
            return [201, { message: 'banner added', create_banner }];
        } catch (error) {
            return [500, error];
        }
    }

    public async productExist(banner_id: string): Promise<any> {
        try {
            const banners = await ProductsModel.find({ product_id: banner_id });
            if (banners.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return [500, error];
        }
    }

    public async updateProduct(banner_id: string, body: any): Promise<any> {
        try {
            const bannerExist: boolean = await this.productExist(banner_id);
            if (!bannerExist) {
                return [404, { message: "Banner not found." }]
            }
            const edit_banner = await ProductsModel.findOneAndUpdate({ product_id: banner_id }, body).setOptions({ new: true });
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

    public async deleteProduct(body: object, banner_id: string): Promise<any> {
        try {
            const bannerExist: boolean = await this.productExist(banner_id);
            if (!bannerExist) {
                return [404, { message: "Banner not found." }]
            }
            const delete_banner_remove = await ProductsModel.findOneAndDelete({ product_id: banner_id }, body)
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

    public async getBannersCount(body: object): Promise<any> {
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
}

export default new BannersService;
