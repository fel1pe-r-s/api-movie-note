import { UserController } from '../controllers/UserController.js'

const userController = new UserController()

export async function routeUser(fastify) {
   fastify.post('/user', userController.create)
   fastify.put('/user/:user_id', userController.update)
}