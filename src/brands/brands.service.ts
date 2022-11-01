import { brandsModel } from './brands.model';

class BrandsService {
    public async createBrands(body: any): Promise<any> {
        try {
            const create_brand: any = await brandsModel.create(body);
            return [201, { message: 'brand added', create_brand }];
        } catch (error) {
            return [500, error];
        }
    }

    public async brandExist(brand_id: string): Promise<any> {
        try {
            const brand = await brandsModel.find({ brand_id: brand_id });
            if (brand.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return [500, error];
        }
    }

    public async updateBrands(brand_id: string, body: any): Promise<any> {
        try {
            const brandExist: boolean = await this.brandExist(brand_id);
            if (!brandExist) {
                return [404, { message: "Brand not found." }]
            }
            const edit_brand = await brandsModel.findOneAndUpdate({ brand_id: brand_id }, body).setOptions({ new: true });
            if (!edit_brand) {
                return [401, {
                    message: 'Brand not update'
                }];
            }
            return [200, {
                edit_brand: edit_brand
            }]
        } catch (error) {
            return [500, error];
        }
    }

    public async deleteBrands(body: object, brand_id: string): Promise<any> {
        try {
            const brandExist: boolean = await this.brandExist(brand_id);
            if (!brandExist) {
                return [404, { message: "Brand not found." }]
            }
            const delete_brand_remove = await brandsModel.findOneAndDelete({ brand_id: brand_id }, body)
            if (!delete_brand_remove) {
                return [400, {
                    message: 'Brand not delete'
                }];
            }
            return [200, {
                message: 'Brand deleted', delete_brand_remove: delete_brand_remove
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getBrandsCount(body: object): Promise<any> {
        try {
            let segmentCount: number = await brandsModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }

    public async getBrandsService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await brandsModel.find(body);
            } else {
                listSegment = await brandsModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                    message: 'There are no brands.'
                }];
            }
            return [200, {
                listSegment
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async addBrandsImage(file: any, brand_id: string): Promise<any> {
        try {
            const existCategory: any = await brandsModel.findOne({ brand_id: brand_id });
            if (!existCategory) {
                return [404, { message: "The Brand not found." }]
            }
            if (file === undefined) {
                return [500, {
                    message: "Archivo subido sin exito"
                }]
            }
            let response = file.location + "?t=" + Date.now();;
            const picture = await brandsModel.findOneAndUpdate({ brand_id: brand_id }, { category_image: response }, { upsert: true, new: true });
            return [201, {
                message: "Brand image updated.", picture
            }];
        } catch (error) {
            return [500, error];
        }
    }
}

export default new BrandsService;
