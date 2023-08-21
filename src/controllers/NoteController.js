import { AppError } from "../utils/AppErros.js";
import { prismaClient } from "../utils/prismaClient.js";

export class NoteController {
  async create(request, reply) {
    const { title, description, rating, gender } = request.body;
    let { user_id } = request.params;
    user_id = Number(user_id);
    if(rating > 0 || rating < 5){
      throw new AppError(`Invalid rating, only allowed between 0 and 5`)
    }
    const name = await prismaClient.tags.findFirst({
      where: {
       name: gender
      },
    });
    if (!name) {
      const note = await prismaClient.note.create({
        data: {
          title,
          description,
          rating,
          user_id,
        },
      });
      const tag = await prismaClient.tags.create({
        data: {
          name: gender,
          user_id,
        },
      });

      const noteToTags = await prismaClient.noteToTags.create({
        data: {
          note_id: note.id,
          tag_id: tag.id,
        },
      });
      prismaClient.$disconnect();
      reply.send({ note, noteToTags });
    } else {
      const note = await prismaClient.noteToTags.create({
        data: {
          note: {
            create: {
              title,
              description,
              rating,
              user_id,
            },
          },
          tag: {
            connect: {
              id: name.id,
            },
          },
        },
      });
      reply.send({ note });
    }
  }

  async index(request, reply) {
    let { user_id } = request.params;
    const { title } = request.query;
    user_id = Number(user_id);
    const note = await prismaClient.note.findMany({
      where: {
        user_id,
        title: {
          contains: title,
        },
      },
      include: {
        noteToTags: {
          include: {
            tag: true,
          },
        },
      },
    });
    prismaClient.$disconnect();

    reply.send({ note });
  }
  async show(request, reply){
    const { name } = request.query;
    const tags = await prismaClient.tags.findMany({
      where:{
        name:{
          contains: name
        }
      }
    })    
    reply.send({ tags });
  }

  async delete(request, reply) {
    let { id } = request.params;
    id = Number(id);
    await prismaClient.note.delete({
      where: {
        id,
      },
    });
    prismaClient.$disconnect();
    reply.code(200);
  }
}
