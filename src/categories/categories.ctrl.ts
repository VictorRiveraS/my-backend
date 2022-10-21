import { NextFunction, Request, Response } from 'express';
import Handler from '../helpers/request.handler';
import service from './categories.service';
import { UUIDv4 } from "uuid-v4-validator";

class CategoriesCtrl {
    public async fetchCategories(req: Request, res: Response): Promise<any> {
        try {
            const page: number = Number(req.query.page);
            const limit: any = Number(req.query.limit);
            let body: object;
            if (req.query.search) {
                const search: string = String(req.query.search);
                const regex = new RegExp(search, 'i');
                body = {
                    "$or": [
                        { 'id': { '$regex': regex } },
                        { 'name': { '$regex': regex } },
                    ],
                };
            } else {
                body = {}
            }
            const skip: number = (page - 1) * limit;
            const totalItems = await service.getCategoriesCount(body);
            let response: any = await service.getCategoriesService(body, page, limit, skip);
            const data: object = {
                totalItems: totalItems,
                pageLength: limit,
                numberPages: Math.ceil(totalItems / limit),
                thisPage: response[1].listSegment.length,
                items: response[1].listSegment
            }
            Handler(res, response[0], data);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async getCategoriesById(req: Request, res: Response): Promise<any> {
        try {
            /*  const response = await service.forgotPassword(req.body.email);
             Handler(res, response[0], response[1]); */
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async createCategories(req: Request, res: Response): Promise<any> {
        try {
            const body = req.body;
            body.banner_id = new UUIDv4().id.substring(0, 8);
            const response = await service.createCategories(body);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async addCategoriesImage(req: Request | any, res: Response): Promise<any> {
        try {
            const banner_id: any = req.query.banner_id;
            const image: any = req.file;
            const response = await service.addCategoriesImage(image, banner_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async updateCategories(req: Request, res: Response): Promise<any> {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const banner_id: any = req.query.banner_id;
            const body: object = req.body;
            const response = await service.updateCategory(banner_id, body);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async deleteCategories(req: Request, res: Response): Promise<any> {
        try {
            const banner_id: any = req.query.banner_id;
            const body: object = req.body;
            let data: object = {
                ...body,
            };
            const response = await service.deleteCategories(data, banner_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async setInfoUpload(req: any, res: Response, next: NextFunction): Promise<any> {
        try {
            const allowedTypes = ["principal_banner", "brand_banner"];
            const banner_id: any = req.query.banner_id;
            const type: string = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                Handler(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Banners' + "/" + type + "/" + banner_id + "/";
            req.params.type_upload_s3 = type;
            next();
        } catch (error) {
            Handler(res, 500, error);
        }
    }
}

export default new CategoriesCtrl;