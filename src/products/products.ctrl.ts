import { Request, Response } from 'express';
import Handler from '../helpers/request.handler';
import service from './products.service';
import { UUIDv4 } from "uuid-v4-validator";
class ProductsCtrl {
    public async fetchProducts(req: Request, res: Response): Promise<any> {
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
                body = {

                }
            }
            const skip: number = (page - 1) * limit;
            const totalItems = await service.getProductsCount(body);
            let response: any = await service.getProductService(body, page, limit, skip);
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

    public async getProductsById(req: Request, res: Response): Promise<any> {
        try {
            const product_id = req.params.product_id;
            let response: any = await service.getProductByIdService(product_id);
            Handler(res, response[0], response[1])
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async createProducts(req: Request, res: Response): Promise<any> {
        try {
            const body = req.body;
            body.product_id = new UUIDv4().id.substring(0, 8);
            const response = await service.createProduct(body);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async updateProducts(req: Request, res: Response): Promise<any> {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const product_id: any = req.query.product_id;
            const body: object = req.body;
            const response = await service.updateProduct(product_id, body);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async deleteProducts(req: Request, res: Response): Promise<any> {
        try {
            const product_id: any = req.query.product_id;
            const body: object = req.body;
            let data: object = {
                ...body,
            };
            const response = await service.deleteProduct(data, product_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }
}

export default new ProductsCtrl;