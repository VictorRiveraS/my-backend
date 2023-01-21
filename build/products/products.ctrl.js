"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_handler_1 = __importDefault(require("../helpers/request.handler"));
const products_service_1 = __importDefault(require("./products.service"));
const uuid_v4_validator_1 = require("uuid-v4-validator");
const brands_model_1 = require("../brands/brands.model");
const laboratories_model_1 = require("../laboratories/laboratories.model");
class ProductsCtrl {
    async fetchProducts(req, res) {
        try {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            let body;
            if (req.query.search) {
                const search = String(req.query.search);
                const regex = new RegExp(search, 'i');
                body = {
                    "$or": [
                        { 'id': { '$regex': regex } },
                        { 'name': { '$regex': regex } },
                    ],
                };
            }
            else {
                body = {};
            }
            const skip = (page - 1) * limit;
            const totalItems = await products_service_1.default.getProductsCount(body);
            let response = await products_service_1.default.getProductService(body, page, limit, skip);
            const data = {
                totalItems: totalItems,
                pageLength: limit,
                numberPages: Math.ceil(totalItems / limit),
                thisPage: response[1].listSegment.length,
                items: response[1].listSegment
            };
            (0, request_handler_1.default)(res, response[0], data);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async getProductsById(req, res) {
        try {
            const product_id = req.params.product_id;
            let response = await products_service_1.default.getProductByIdService(product_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
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
    async getProductsByCategory(req, res) {
        try {
            const onSort = (value) => {
                const values = {
                    'A - Z': { 'product_name': 'asc' },
                    'Z - A': { 'product_name': 'desc' },
                    'Precio mayor a menor': { 'product_price': 'desc' },
                    'Precio menor a mayor': { 'product_price': 'asc' },
                };
                return values[value];
            };
            const page = Number(req.query.page);
            const page_size = Number(req.query.limit);
            const pagination = {
                skip: (page - 1) * page_size,
                limit: page_size
            };
            let findParams = {
                product_category_id: req.params.category_id
            };
            if (req.query.subcategory !== '') {
                const product_subcategory_id = req.query.subcategory.toString();
                findParams = {
                    ...findParams,
                    product_subcategory_id
                };
            }
            ;
            let sort = { 'created_At': 'asc' };
            if (req.query.sort !== '')
                sort = onSort(req.query.sort);
            if (req.query.search !== '') {
                const querySearch = String(req.query.search);
                const regex = new RegExp(querySearch, 'i');
                const search = [
                    { 'product_id': { '$regex': regex } },
                    { 'product_name': { '$regex': regex } },
                ];
                findParams = {
                    ...findParams,
                    search
                };
            }
            if (req.query.min !== '' || req.query.max !== '') {
                let limits = {};
                if (Number(req.query.min))
                    limits["$gte"] = Number(req.query.min);
                if (Number(req.query.max))
                    limits["$lte"] = Number(req.query.max);
                findParams = {
                    ...findParams,
                    product_price: limits,
                };
            }
            if (req.body.brands[0] && req.body.brands.length > 0) {
                // se puede mejorar cambiando el modelo agregando nombre ademas de id
                let brandIds = [];
                await Promise.all(req.body.brands.map(async (brand_name) => {
                    const brand = await brands_model_1.brandsModel.findOne({ brand_name });
                    if (brand)
                        brandIds.push(brand.brand_id);
                }));
                findParams = {
                    ...findParams,
                    product_brand_id: brandIds
                };
            }
            if (req.body.labs[0] && req.body.labs.length > 0) {
                let labsIds = [];
                await Promise.all(req.body.labs.map(async (laboratory_name) => {
                    const lab = await laboratories_model_1.laboratoriesModel.findOne({ brand_name: laboratory_name });
                    if (lab)
                        labsIds.push(lab.laboratory_id);
                }));
                findParams = {
                    ...findParams,
                    labs: labsIds
                };
            }
            if (req.body.suffers[0] && req.body.suffers.length > 0) {
                findParams = {
                    ...findParams,
                    product_technical_info: {
                        $elemMatch: { value: req.body.suffers }
                    }
                };
            }
            if (req.body.uses[0] && req.body.uses.length > 0) {
                findParams = {
                    ...findParams,
                    product_technical_info: {
                        $elemMatch: { value: req.body.uses }
                    }
                };
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
                };
            }
            let response = await products_service_1.default.getProductByCategoryService(findParams, sort, pagination);
            const totalItems = response[2];
            const filter_brands = response[3];
            const filter_unique_brands = response[4];
            const filter_labs = response[5];
            const filter_unique_labs = response[6];
            const filter_unique_uses = response[7];
            const filter_unique_sufferings = response[8];
            const data = {
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
            };
            (0, request_handler_1.default)(res, response[0], data);
        }
        catch (error) {
            console.log(error);
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async createProducts(req, res) {
        try {
            const body = req.body;
            body.product_id = new uuid_v4_validator_1.UUIDv4().id.substring(0, 8);
            body.product_family_friend_url = body["product_name"].replace(/[^a-z0-9_-]/gi, '-').replace(/_{1,}/g, '-').replace(/-{2,}/g, '-').toLowerCase();
            const response = await products_service_1.default.createProduct(body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async updateProducts(req, res) {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const product_id = req.query.product_id;
            const body = req.body;
            const response = await products_service_1.default.updateProduct(product_id, body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async deleteProducts(req, res) {
        try {
            const product_id = req.query.product_id;
            const body = req.body;
            let data = {
                ...body,
            };
            const response = await products_service_1.default.deleteProduct(data, product_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async addProductImage(req, res) {
        try {
            const product_id = req.query.product_id;
            const image = req.file;
            const response = await products_service_1.default.addProductImage(image, product_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async setInfoUpload(req, res, next) {
        try {
            const allowedTypes = ["principal_product"];
            const product_id = req.query.product_id;
            const type = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                (0, request_handler_1.default)(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Products' + "/" + type + "/" + product_id + "/";
            req.params.type_upload_s3 = type;
            next();
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
}
exports.default = new ProductsCtrl;
