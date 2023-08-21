import { prismaClient } from "../utils/prismaClient.js";

export class TagController {
  async index(request, reply) {
    let { user_id } = request.params;
    const {name, title} = request.query
    user_id = Number(user_id);
    const tags = await prismaClient.tags.findMany({
      where: {
        user_id,        
        name,
        note:{
          title:{
            contains: title
          }
        }
      },
      select: {
        name: true,
        note: {
          select: {
            title: true,
            rating: true,
            description: true,
          }
        }
      }      
    });
    prismaClient.$disconnect();

    reply.send({ tags });
  }
}
