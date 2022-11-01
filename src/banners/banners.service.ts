import { BannersModel } from './banners.model';

class BannersService {
    public async createBanner(body: any): Promise<any> {
        try {
            const create_banner: any = await BannersModel.create(body);
            return [201, { message: 'banner added', create_banner }];
        } catch (error) {
            return [500, error];
        }
    }

    public async bannerExist(banner_id: string): Promise<any> {
        try {
            const banners = await BannersModel.find({ banner_id: banner_id });
            if (banners.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return [500, error];
        }
    }

    public async updateBanner(banner_id: string, body: any): Promise<any> {
        try {
            const bannerExist: boolean = await this.bannerExist(banner_id);
            if (!bannerExist) {
                return [404, { message: "Banner not found." }]
            }
            const edit_banner = await BannersModel.findOneAndUpdate({ banner_id: banner_id }, body).setOptions({ new: true });
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

    public async deleteBanner(body: object, banner_id: string): Promise<any> {
        try {
            const bannerExist: boolean = await this.bannerExist(banner_id);
            if (!bannerExist) {
                return [404, { message: "Banner not found." }]
            }
            const delete_banner_remove = await BannersModel.findOneAndDelete({ banner_id: banner_id }, body)
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
            let segmentCount: number = await BannersModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }

    public async getBannersService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await BannersModel.find(body);
            } else {
                listSegment = await BannersModel.find(body).setOptions({ skip: skip, limit: limit });
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

    public async addBannersImage(file: any, banner_id: string): Promise<any> {
        try {
            const existNews: any = await BannersModel.findOne({ banner_id: banner_id });
            if (!existNews) {
                return [404, { message: "The banner not found." }]
            }
            if (file === undefined) {
                return [500, {
                    message: "Archivo subido sin exito"
                }]
            }
            let response = file.location + "?t=" + Date.now();;
            const picture = await BannersModel.findOneAndUpdate({ banner_id: banner_id }, { banner_image: response }, { upsert: true, new: true });
            return [201, {
                message: "Banner image updated.", picture
            }];
        } catch (error) {
            return [500, error];
        }
    }
}

export default new BannersService;
