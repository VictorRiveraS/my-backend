


/* router.get('/', async (request, response) => {
    try {
        const saludo = await Saludo.find()
        response.json(saludo)
    } catch (error) {
        console.log(error)
    }

})

router.get('/:id', async (request, response) => {
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
})

router.post('/', (request, response) => {
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
})

router.delete('/:id', async (request, response) => {
    const id = Number(request.params.id)
    // const saludo = saludos.filter((res) => res.id !== id)
    // const saludo = await Saludo.findOne({ id: id })
    const saludo = await Saludo.deleteOne({ id: id })
    response.json(saludo)
    response.status(204).end()
}) */

// import { Saludo } from "../models/saludo";
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