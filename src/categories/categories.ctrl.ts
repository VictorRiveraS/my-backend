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
            body.category_id = new UUIDv4().id.substring(0, 8);
            const response = await service.createCategories(body);
            console.log(response);
            Handler(res, response[0], response[1]);
        } catch (error) {
            console.log(error);

            Handler(res, 500, error);
        }
    }

    public async addCategoriesImage(req: Request | any, res: Response): Promise<any> {
        try {
            const category_id: any = req.query.category_id;
            const image: any = req.file;
            const response = await service.addCategoriesImage(image, category_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async updateCategories(req: Request, res: Response): Promise<any> {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const category_id: any = req.query.category_id;
            const body: object = req.body;
            const response = await service.updateCategory(category_id, body);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async deleteCategories(req: Request, res: Response): Promise<any> {
        try {
            const category_id: any = req.query.category_id;
            const body: object = req.body;
            const response = await service.deleteCategories(category_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async setInfoUpload(req: any, res: Response, next: NextFunction): Promise<any> {
        try {
            const allowedTypes = ["principal_category", "secondary_category"];
            const category_id: any = req.query.category_id;
            const type: string = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                Handler(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Categories' + "/" + type + "/" + category_id + "/";
            req.params.type_upload_s3 = type;
            next();
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async fetchSubcategories(req: Request, res: Response): Promise<any> {
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
            const totalItems = await service.getSubcategoriesCount(body);
            let response: any = await service.getSubcategoriesService(body, page, limit, skip);
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

    public async getSubcategoriesById(req: Request, res: Response): Promise<any> {
        try {
            /*  const response = await service.forgotPassword(req.body.email);
             Handler(res, response[0], response[1]); */
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async createSubcategories(req: Request, res: Response): Promise<any> {
        try {
            const body = req.body;
            body.subcategory_id = new UUIDv4().id.substring(0, 8);
            const category_id: any = body.category_root_id;
            const response = await service.createSubcategories(body, category_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async addSubcategoriesImage(req: Request | any, res: Response): Promise<any> {
        try {
            const subcategory_id: any = req.query.subcategory_id;
            const image: any = req.file;
            const response = await service.addSubcategoriesImage(image, subcategory_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async updateSubcategories(req: Request, res: Response): Promise<any> {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const subcategory_id: any = req.query.subcategory_id;
            const body: object = req.body;
            const response = await service.updateSubcategory(subcategory_id, body);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async deleteSubcategories(req: Request, res: Response): Promise<any> {
        try {
            const subcategory_id: any = req.query.subcategory_id;
            const body: object = req.body;
            let data: object = {
                ...body,
            };
            const response = await service.deleteSubcategories(data, subcategory_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async setInfoSubCatUpload(req: any, res: Response, next: NextFunction): Promise<any> {
        try {
            const allowedTypes = ["principal_subcategory", "secondary_subcategory"];
            const subcategory_id: any = req.query.subcategory_id;
            const type: string = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                Handler(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Subcategories' + "/" + type + "/" + subcategory_id + "/";
            console.log(req.params.route_upload_s3);
            req.params.type_upload_s3 = type;
            next();
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async fetchSubsubcategories(req: Request, res: Response): Promise<any> {
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
            const totalItems = await service.getSubsubcategoriesCount(body);
            let response: any = await service.getSubsubcategoriesService(body, page, limit, skip);
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

    public async getSubsubcategoriesById(req: Request, res: Response): Promise<any> {
        try {
            /*  const response = await service.forgotPassword(req.body.email);
             Handler(res, response[0], response[1]); */
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async createSubsubcategories(req: Request, res: Response): Promise<any> {
        try {
            const body = req.body;
            body.subsubcategory_id = new UUIDv4().id.substring(0, 8);
            const category_id: any = body.category_root_id;
            const subcategory_id: any = body.subcategory_id;
            const response = await service.createSubsubcategories(body, category_id, subcategory_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async addSubsubcategoriesImage(req: Request | any, res: Response): Promise<any> {
        try {
            const subcategory_id: any = req.query.subcategory_id;
            const image: any = req.file;
            const response = await service.addSubcategoriesImage(image, subcategory_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async updateSubsubcategories(req: Request, res: Response): Promise<any> {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const subcategory_id: any = req.query.subcategory_id;
            const body: object = req.body;
            const response = await service.updateSubcategory(subcategory_id, body);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async deleteSubsubcategories(req: Request, res: Response): Promise<any> {
        try {
            const category_id: any = req.query.category_id;
            const subcategory_id: any = req.query.subcategory_id;
            const subsubcategory_id: any = req.query.subsubcategory_id;
            const body: object = req.body;
            let data: object = {
                ...body,
            };
            const response = await service.deleteSubsubcategories(category_id, subcategory_id, subsubcategory_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async setInfoSubsubcategoryUpload(req: any, res: Response, next: NextFunction): Promise<any> {
        try {
            const allowedTypes = ["principal_subcategory", "secondary_subcategory"];
            const subcategory_id: any = req.query.subcategory_id;
            const type: string = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                Handler(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Subcategories' + "/" + type + "/" + subcategory_id + "/";
            console.log(req.params.route_upload_s3);
            req.params.type_upload_s3 = type;
            next();
        } catch (error) {
            Handler(res, 500, error);
        }
    }
}

export default new CategoriesCtrl;