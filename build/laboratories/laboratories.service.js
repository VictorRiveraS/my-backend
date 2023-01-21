"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const laboratories_model_1 = require("./laboratories.model");
class LaboratoriesService {
    async createLaboratories(body) {
        try {
            const create_laboratory = await laboratories_model_1.laboratoriesModel.create(body);
            return [201, { message: 'Laboratory added', create_laboratory }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async laboratoryExist(laboratory_id) {
        try {
            const brand = await laboratories_model_1.laboratoriesModel.find({ laboratory_id: laboratory_id });
            if (brand.length > 0) {
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
    async updateLaboratories(laboratory_id, body) {
        try {
            const brandExist = await this.laboratoryExist(laboratory_id);
            if (!brandExist) {
                return [404, { message: "Laboratory not found." }];
            }
            const edit_brand = await laboratories_model_1.laboratoriesModel.findOneAndUpdate({ laboratory_id: laboratory_id }, body).setOptions({ new: true });
            if (!edit_brand) {
                return [401, {
                        message: 'Laboratory not update'
                    }];
            }
            return [200, {
                    edit_brand: edit_brand
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async deleteLaboratory(body, laboratory_id) {
        try {
            const laboratoryExist = await this.laboratoryExist(laboratory_id);
            if (!laboratoryExist) {
                return [404, { message: "Laboratory not found." }];
            }
            const delete_laboratory_remove = await laboratories_model_1.laboratoriesModel.findOneAndDelete({ laboratory_id: laboratory_id }, body);
            if (!delete_laboratory_remove) {
                return [400, {
                        message: 'Laboratory not delete'
                    }];
            }
            return [200, {
                    message: 'Laboratory deleted', delete_laboratory_remove: delete_laboratory_remove
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async getLaboratoriesCount(body) {
        try {
            let segmentCount = await laboratories_model_1.laboratoriesModel.find(body).count();
            return segmentCount;
        }
        catch (error) {
            throw error;
        }
    }
    async getLaboratoriesService(body, page, limit, skip) {
        try {
            let listSegment;
            if (page == 0) {
                listSegment = await laboratories_model_1.laboratoriesModel.find(body);
            }
            else {
                listSegment = await laboratories_model_1.laboratoriesModel.find(body).setOptions({ skip: skip, limit: limit });
            }
            if (!listSegment) {
                return [400, {
                        message: 'There are no laboratories.'
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
    async addLaboratoriesImage(file, laboratory_id) {
        try {
            const existLaboratory = await laboratories_model_1.laboratoriesModel.findOne({ laboratory_id: laboratory_id });
            if (!existLaboratory) {
                return [404, { message: "The Laboratory not found." }];
            }
            if (file === undefined) {
                return [500, {
                        message: "Archivo subido sin exito"
                    }];
            }
            let response = file.location + "?t=" + Date.now();
            ;
            const picture = await laboratories_model_1.laboratoriesModel.findOneAndUpdate({ laboratory_id: laboratory_id }, { category_image: response }, { upsert: true, new: true });
            return [201, {
                    message: "Laboratory image updated.", picture
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
}
exports.default = new LaboratoriesService;
