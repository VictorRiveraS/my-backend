import { NextFunction, Request, Response } from 'express';
import Handler from '../helpers/request.handler';
import service from './brands.service';
import { UUIDv4 } from "uuid-v4-validator";

class BrandsCtrl {
    public async fetchBrands(req: Request, res: Response): Promise<any> {
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
            const totalItems = await service.getBrandsCount(body);
            let response: any = await service.getBrandsService(body, page, limit, skip);
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

    public async getBrandsById(req: Request, res: Response): Promise<any> {
        try {
            /*  const response = await service.forgotPassword(req.body.email);
             Handler(res, response[0], response[1]); */
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async createBrands(req: Request, res: Response): Promise<any> {
        try {
            const body = req.body;
            body.category_id = new UUIDv4().id.substring(0, 8);
            const response = await service.createBrands(body);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async addBrandsImage(req: Request | any, res: Response): Promise<any> {
        try {
            const category_id: any = req.query.category_id;
            const image: any = req.file;
            const response = await service.addBrandsImage(image, category_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async updateBrands(req: Request, res: Response): Promise<any> {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const category_id: any = req.query.category_id;
            const body: object = req.body;
            const response = await service.updateBrands(category_id, body);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async deleteBrands(req: Request, res: Response): Promise<any> {
        try {
            const category_id: any = req.query.category_id;
            const body: object = req.body;
            let data: object = {
                ...body,
            };
            const response = await service.deleteBrands(data, category_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async setInfoUpload(req: any, res: Response, next: NextFunction): Promise<any> {
        try {
            const allowedTypes = ["principal_category", "secundary_category"];
            const category_id: any = req.query.category_id;
            const type: string = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                Handler(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Brands' + "/" + type + "/" + category_id + "/";
            req.params.type_upload_s3 = type;
            next();
        } catch (error) {
            Handler(res, 500, error);
        }
    }
}

export default new BrandsCtrl;