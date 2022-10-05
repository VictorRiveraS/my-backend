/* router.get('/', async (request, response) => {
    try {
        const saludo = await Saludo.find()
        response.json(saludo)
    } catch (error) {
        console.log(error)
    }

}) */


/*router.get('/:id', async (request, response) => {
    try {
        const id = Number(request.params.id);
        const ids = saludos.map(saludo => saludo.id)
        const maxId = Math.max(...ids)
        if (id < 0 || id > maxId) {
            const err = new Error('Id Not Found');
            err.message = 'Id Not Found';
            err.status = 404;
            response.status(404).json(err).end()
        }
        //const saludo = saludos.find((res) => res.id == id)
        const saludo = await Saludo.findOne({ id: id })
        
        if (saludo) {
            response.json(saludo)
        } else {
            response.status(404).end()
        }
    } catch (err) {
        console.log(err)
    }
}) */

/* router.post('/', (request, response) => {
    const saludo = request.body
    if (!saludo || !saludo.saludo) {
        response.status(400).json({ error: 'saludo is missing' }).end()
    }
    // const ids = saludos.map(saludo => saludo.id)
    // const maxId = Math.max(...ids)
    const newSaludo = {
        id: maxId + 1,
        saludo: saludo.saludo
    }
    Saludo.create(newSaludo)
    // saludos = [...saludos, newSaludo]
    response.json(newSaludo)
    response.status(201).end()
}) */

/* router.delete('/:id', async (request, response) => {
    const id = Number(request.params.id)
    // const saludo = saludos.filter((res) => res.id !== id)
    // const saludo = await Saludo.findOne({ id: id })
    const saludo = await Saludo.deleteOne({ id: id })
    response.json(saludo)
    response.status(204).end()
}) */

import service from "./saludo.service";
import { Request, Response } from "express";
import Handler from "../helpers/request.handler";

class saludoCtrl {
    public async getAllSaludos(req: Request, res: Response): Promise<any> {
        try {
            const saludos = await service.fecthSaludos();
            Handler(res, saludos[0], saludos[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async addSaludo(req: Request, res: Response): Promise<any> {
        try {
            const newSaludo = await service.postSaludo(req.body);
            Handler(res, newSaludo[0], newSaludo[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }
}

export default new saludoCtrl