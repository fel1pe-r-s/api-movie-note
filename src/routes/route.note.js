import { NoteController } from '../controllers/NoteController.js'

const noteController = new NoteController()

export async function routeNote(fastify) {
   fastify.post('/note/:user_id', noteController.create)
   fastify.delete('/note/:id', noteController.delete)
   fastify.get('/note/:user_id', noteController.index)
}