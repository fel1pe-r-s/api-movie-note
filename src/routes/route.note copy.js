import { TagController } from '../controllers/TagController.js'

const tagController = new TagController()

export async function routeTag(fastify) {
   fastify.get('/tags/:user_id', tagController.index)
}