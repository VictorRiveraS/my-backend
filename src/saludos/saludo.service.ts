import Saludo, { SALUDO_I } from "./saludos.model";
class saludoService {
    public async fecthSaludos(): Promise<any> {
        try {
            const saludo = await Saludo.find();
            return [201, {
                saludo,
                message: 'Saludos fetched.'
            }];
        } catch (error) {
            return [500, error];
        }
    }

    public async postSaludo(newSaludo: SALUDO_I): Promise<any> {
        try {
            const maxIdSaludo: SALUDO_I[] = await Saludo.find()?.sort({ internalId: -1 })?.limit(1);
            let maxId: number = 1;
            if (maxIdSaludo.length > 0) maxId = maxIdSaludo[0].internalId + 1;
            newSaludo.internalId = maxId;
            const newSaludoRes = await Saludo.create(newSaludo);
            return [201, {
                newSaludoRes,
                message: 'Saludo created.'
            }];
        } catch (error) {
            return [500, error];
        }
    }
}

export default new saludoService