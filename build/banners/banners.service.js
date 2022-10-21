"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const banners_model_1 = require("./banners.model");
class BannersService {
    async createBanner(body) {
        try {
            const create_banner = await banners_model_1.BannersModel.create(body);
            return [201, { message: 'banner added', create_banner }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async bannerExist(banner_id) {
        try {
            const banners = await banners_model_1.BannersModel.find({ banner_id: banner_id });
            if (banners.length > 0) {
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
    async updateBanner(banner_id, body) {
        try {
            const bannerExist = await this.bannerExist(banner_id);
            if (!bannerExist) {
                return [404, { message: "Banner not found." }];
            }
            const edit_banner = await banners_model_1.BannersModel.findOneAndUpdate({ banner_id: banner_id }, body).setOptions({ new: true });
            if (!edit_banner) {
                return [401, {
                        message: 'News not update'
                    }];
            }
            return [200, {
                    edit_banner
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async deleteBanner(body, banner_id) {
        try {
            const bannerExist = await this.bannerExist(banner_id);
            if (!bannerExist) {
                return [404, { message: "Banner not found." }];
            }
            const delete_banner_remove = await banners_model_1.BannersModel.findOneAndDelete({ banner_id: banner_id }, body);
            if (!delete_banner_remove) {
                return [400, {
                        message: 'Banner not delete'
                    }];
            }
            return [200, {
                    message: 'Banner deleted', delete_banner_remove
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getBannersCount(body) {
        try {
            let segmentCount = await banners_model_1.BannersModel.find(body).count();
            return segmentCount;
        }
        catch (error) {
            throw error;
        }
    }
    async getBannersService(body, page, limit, skip) {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await banners_model_1.BannersModel.find(body);
            }
            else {
                listSegment = await banners_model_1.BannersModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                        message: 'There are no banners.'
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
    async addBannersImage(file, banner_id) {
        try {
            const existNews = await banners_model_1.BannersModel.findOne({ banner_id: banner_id });
            if (!existNews) {
                return [404, { message: "The banner not found." }];
            }
            if (file === undefined) {
                return [500, {
                        message: "Archivo subido sin exito"
                    }];
            }
            let response = file.location + "?t=" + Date.now();
            ;
            const picture = await banners_model_1.BannersModel.findOneAndUpdate({ banner_id: banner_id }, { banner_image: response }, { upsert: true, new: true });
            return [201, {
                    message: "Banner image updated.", picture
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
}
exports.default = new BannersService;
