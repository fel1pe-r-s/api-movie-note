// Import the framework and instantiate it
import Fastify from 'fastify'
import {routeUser} from './routes/route.user.js'
import {routeNote} from './routes/route.note.js'

const fastify = Fastify({
  logger: true
})


// Declare a route
fastify.get('/', async () =>{
  return { hello: 'world' }
})
fastify.register(routeUser)
fastify.register(routeNote)

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}