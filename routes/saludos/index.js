import { Router } from 'express'
import { Saludo } from '../../models/saludo.js'

const router = Router();

router.get('/', async(request, response) => {
    try {
        const saludo = await Saludo.find()
        response.json(saludo)
    } catch (error) {
        console.log(error)
    }

})

router.get('/:id', async(request, response) => {
    try {
        const id = Number(request.params.id);
        const ids = saludos.map(saludo => saludo.id)
        const maxId = Math.max(...ids)
            /*  if (id < 0 || id > maxId) {
                 const err = new Error('Id Not Found');
                 err.message = 'Id Not Found';
                 err.status = 404;
                 response.status(404).json(err).end()
             } */
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

router.delete('/:id', async(request, response) => {
    const id = Number(request.params.id)
        // const saludo = saludos.filter((res) => res.id !== id)
        // const saludo = await Saludo.findOne({ id: id })
    const saludo = await Saludo.deleteOne({ id: id })
    response.json(saludo)
    response.status(204).end()
})

export default router