import { laboratoriesModel } from './laboratories.model';

class LaboratoriesService {
    public async createLaboratories(body: any): Promise<any> {
        try {
            const create_laboratory: any = await laboratoriesModel.create(body);
            return [201, { message: 'Laboratory added', create_laboratory }];
        } catch (error) {
            return [500, error];
        }
    }

    public async laboratoryExist(laboratory_id: string): Promise<any> {
        try {
            const brand = await laboratoriesModel.find({ laboratory_id: laboratory_id });
            if (brand.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return [500, error];
        }
    }

    public async updateLaboratories(laboratory_id: string, body: any): Promise<any> {
        try {
            const brandExist: boolean = await this.laboratoryExist(laboratory_id);
            if (!brandExist) {
                return [404, { message: "Laboratory not found." }]
            }
            const edit_brand = await laboratoriesModel.findOneAndUpdate({ laboratory_id: laboratory_id }, body).setOptions({ new: true });
            if (!edit_brand) {
                return [401, {
                    message: 'Laboratory not update'
                }];
            }
            return [200, {
                edit_brand: edit_brand
            }]
        } catch (error) {
            return [500, error];
        }
    }

    public async deleteLaboratory(body: object, laboratory_id: string): Promise<any> {
        try {
            const laboratoryExist: boolean = await this.laboratoryExist(laboratory_id);
            if (!laboratoryExist) {
                return [404, { message: "Laboratory not found." }]
            }
            const delete_laboratory_remove = await laboratoriesModel.findOneAndDelete({ laboratory_id: laboratory_id }, body)
            if (!delete_laboratory_remove) {
                return [400, {
                    message: 'Laboratory not delete'
                }];
            }
            return [200, {
                message: 'Laboratory deleted', delete_laboratory_remove: delete_laboratory_remove
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async getLaboratoriesCount(body: object): Promise<any> {
        try {
            let segmentCount: number = await laboratoriesModel.find(body).count();
            return segmentCount
        } catch (error) {
            throw error;
        }
    }

    public async getLaboratoriesService(body: object, page: number, limit: number, skip: number): Promise<any> {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await laboratoriesModel.find(body);
            } else {
                listSegment = await laboratoriesModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                    message: 'There are no laboratories.'
                }];
            }
            return [200, {
                listSegment
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async addLaboratoriesImage(file: any, laboratory_id: string): Promise<any> {
        try {
            const existLaboratory: any = await laboratoriesModel.findOne({ laboratory_id: laboratory_id });
            if (!existLaboratory) {
                return [404, { message: "The Laboratory not found." }]
            }
            if (file === undefined) {
                return [500, {
                    message: "Archivo subido sin exito"
                }]
            }
            let response = file.location + "?t=" + Date.now();;
            const picture = await laboratoriesModel.findOneAndUpdate({ laboratory_id: laboratory_id }, { category_image: response }, { upsert: true, new: true });
            return [201, {
                message: "Laboratory image updated.", picture
            }];
        } catch (error) {
            return [500, error];
        }
    }
}

export default new LaboratoriesService;
