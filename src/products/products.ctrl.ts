import { NextFunction, Request, Response } from 'express';
import Handler from '../helpers/request.handler';
import service from './products.service';
import { UUIDv4 } from "uuid-v4-validator";
import { brandsModel } from '../brands/brands.model';
import { laboratoriesModel } from '../laboratories/laboratories.model';

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

    /*   public async getProductsByCategory(req: Request, res: Response): Promise<any> {
          try {
              const onSort = (value: any) => {
                  const values: object = {
                      'A - Z': { 'product_name': 'asc' },
                      'Z - A': { 'product_name': 'desc' },
                      'Precio mayor a menor': { 'product_price': 'desc' },
                      'Precio menor a mayor': { 'product_price': 'asc' },
                  }
                  return values[value]
              }
              const category_id = req.params.category_id;
              let search: object | string = '';
              const page: number = Number(req.query.page);
              const limit: number = Number(req.query.limit);
              let brands: string = '';
              let subcategory: string = '';
              let min: number = 0;
              let max: number = 1000000;
              let sort: object = { 'created_At': 'asc' };
              if (req.query.search !== '') {
                  const querySearch: string = String(req.query.search);
                  const regex = new RegExp(querySearch, 'i');
                  search =
                      [
                          { 'product_id': { '$regex': regex } },
                          { 'product_name': { '$regex': regex } },
                      ]
              }
              if (req.query.sort !== '') sort = onSort(req.query.sort);
              if (req.query.min !== '') min = Number(req.query.min);
              if (req.query.max !== '') max = Number(req.query.max);
              if (req.query.subcategory !== '') subcategory = req.query.subcategory.toString();
              //  if (req.query.brands !== '') brands = req.query.brands.toString();
              const skip: number = (page - 1) * limit;
              let response: any = await service.getProductByCategoryService(category_id, page, search, brands, subcategory, min, max, sort, limit, skip);
              const totalItems = response[2];
              const filter_brands = response[3];
              const filter_unique_brands = response[4];
              const filter_labs = response[5];
              const filter_unique_labs = response[6];
              const filter_unique_uses = response[7];
              const filter_unique_sufferings = response[8];
              const data: object = {
                  totalItems: totalItems,
                  pageLength: limit,
                  numberPages: Math.ceil(Number(totalItems) / limit),
                  thisPage: response[1].products.length,
                  items: response[1].products,
                  allBrands: filter_brands,
                  allLaboratories: filter_labs,
                  brands_to_filter_items: filter_unique_brands,
                  labs_to_filter_items: filter_unique_labs,
                  uses_to_filter_items: filter_unique_uses,
                  sufferings_to_filter_items: filter_unique_sufferings,
              }
              Handler(res, response[0], data)
          } catch (error) {
              console.log(error);
  
              Handler(res, 500, error);
          }
      } */

    public async getProductsByCategory(req: Request, res: Response): Promise<any> {
        try {
            const onSort = (value: any) => {
                const values: object = {
                    'A - Z': { 'product_name': 'asc' },
                    'Z - A': { 'product_name': 'desc' },
                    'Precio mayor a menor': { 'product_price': 'desc' },
                    'Precio menor a mayor': { 'product_price': 'asc' },
                }
                return values[value]
            }
            const page: number = Number(req.query.page);
            const page_size: number = Number(req.query.limit);
            const pagination: object = {
                skip: (page - 1) * page_size,
                limit: page_size
            };
            let findParams: object = {
                product_category_id: req.params.category_id
            };
            if (req.query.subcategory !== '') {
                const product_subcategory_id = req.query.subcategory.toString()
                findParams = {
                    ...findParams,
                    product_subcategory_id
                };
            };
            let sort: object = { 'created_At': 'asc' };
            if (req.query.sort !== '') sort = onSort(req.query.sort);
            if (req.query.search !== '') {
                const querySearch: string = String(req.query.search);
                const regex = new RegExp(querySearch, 'i');
                const search =
                    [
                        { 'product_id': { '$regex': regex } },
                        { 'product_name': { '$regex': regex } },
                    ]
                findParams = {
                    ...findParams,
                    search
                };
            }
            if (req.query.min !== '' || req.query.max !== '') {
                let limits: object = {};
                if (Number(req.query.min)) limits["$gte"] = Number(req.query.min);
                if (Number(req.query.max)) limits["$lte"] = Number(req.query.max);
                findParams = {
                    ...findParams,
                    product_price: limits,
                }
            }
            if (req.body.brands[0] && req.body.brands.length > 0) {
                // se puede mejorar cambiando el modelo agregando nombre ademas de id
                let brandIds: any[] = [];
                await Promise.all(
                    req.body.brands.map(
                        async (brand_name: string) => {
                            const brand = await brandsModel.findOne({ brand_name });
                            if (brand) brandIds.push(brand.brand_id)
                        }
                    )
                )
                findParams = {
                    ...findParams,
                    product_brand_id: brandIds
                }
            }
            if (req.body.labs[0] && req.body.labs.length > 0) {
                let labsIds: any[] = [];
                await Promise.all(
                    req.body.labs.map(
                        async (laboratory_name: string) => {
                            const lab = await laboratoriesModel.findOne({ brand_name: laboratory_name });
                            if (lab) labsIds.push(lab.laboratory_id)
                        }
                    )
                )
                findParams = {
                    ...findParams,
                    labs: labsIds
                }
            }

            if (req.body.suffers[0] && req.body.suffers.length > 0) {
                findParams = {
                    ...findParams,
                    product_technical_info: {
                        $elemMatch: { value: req.body.suffers }
                    }
                }
            }
            if (req.body.uses[0] && req.body.uses.length > 0) {
                findParams = {
                    ...findParams,
                    product_technical_info: {
                        $elemMatch: { value: req.body.uses }
                    }
                }
            }
            if (req.body.uses[0] && req.body.suffers[0] && req.body.uses.length > 0 && req.body.suffers.length > 0) {
                findParams = {
                    ...findParams,
                    product_technical_info: {
                        $all: [
                            { $elemMatch: { value: req.body.uses } },
                            { $elemMatch: { value: req.body.suffers } },
                        ]
                    }
                }
            }
            let response: any = await service.getProductByCategoryService(findParams, sort, pagination);
            const totalItems = response[2];
            const filter_brands = response[3];
            const filter_unique_brands = response[4];
            const filter_labs = response[5];
            const filter_unique_labs = response[6];
            const filter_unique_uses = response[7];
            const filter_unique_sufferings = response[8];
            const data: object = {
                totalItems: totalItems,
                pageLength: page_size,
                numberPages: Math.ceil(Number(totalItems) / page_size),
                thisPage: response[1].products.length,
                items: response[1].products,
                allBrands: filter_brands,
                allLaboratories: filter_labs,
                brands_to_filter_items: filter_unique_brands,
                labs_to_filter_items: filter_unique_labs,
                uses_to_filter_items: filter_unique_uses,
                sufferings_to_filter_items: filter_unique_sufferings,
            }
            Handler(res, response[0], data)
        } catch (error) {
            console.log(error);

            Handler(res, 500, error);
        }
    }

    public async createProducts(req: Request, res: Response): Promise<any> {
        try {
            const body = req.body;
            body.product_id = new UUIDv4().id.substring(0, 8);
            body.product_family_friend_url = body["product_name"].replace(/[^a-z0-9_-]/gi, '-').replace(/_{1,}/g, '-').replace(/-{2,}/g, '-').toLowerCase();
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

    public async addProductImage(req: Request | any, res: Response): Promise<any> {
        try {
            const product_id: any = req.query.product_id;
            const image: any = req.file;
            const response = await service.addProductImage(image, product_id);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async setInfoUpload(req: any, res: Response, next: NextFunction): Promise<any> {
        try {
            const allowedTypes = ["principal_product"];
            const product_id: any = req.query.product_id;
            const type: string = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                Handler(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Products' + "/" + type + "/" + product_id + "/";
            req.params.type_upload_s3 = type;
            next();
        } catch (error) {
            Handler(res, 500, error);
        }
    }


}

export default new ProductsCtrl;