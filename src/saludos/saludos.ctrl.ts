import service from "./saludo.service";
import { Request, Response } from "express";
import Handler from "../helpers/request.handler";

class saludoCtrl {
    public async getAllSaludos(req: Request, res: Response): Promise<void> {
        try {
            const saludos = await service.fecthSaludos();
            Handler(res, saludos[0], saludos[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async addSaludo(req: Request, res: Response): Promise<void> {
        try {
            const newSaludo = await service.postSaludo(req.body);
            Handler(res, newSaludo[0], newSaludo[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }
}

export default new saludoCtrl
