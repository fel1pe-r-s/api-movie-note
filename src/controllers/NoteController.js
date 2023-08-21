import { prismaClient } from "../utils/prismaClient.js";

export class NoteController {
   async create(request, reply) {
    const { title, description, rating, gender } = request.body;
    let { user_id } = request.params;
    user_id = Number(user_id);
    const name = await prismaClient.noteToTags.findFirst({
       where:{
        tag: { name: gender}
       }
     })
     if(!name){
      const note = await prismaClient.note.create({
        data: {
          title,
          description,
          rating,
          user_id,
        },
      });    
     const tags = await prismaClient.tags.create({
        data: {
         name: gender,
         user_id,
        },
      });
  
      const noteToTags = await prismaClient.noteToTags.create({
        data:{
          note_id: note.id,
          tag_id: tags.id,
        }
      })
      prismaClient.$disconnect();
      reply.send({note, tags, noteToTags});
     }else{
      const note = await prismaClient.noteToTags.create({
        data:{
          note:{
            create:{
              title,
              description,
              rating,
              user_id,
            }
          },
          tag:{
            connect:{
              id: name.id
            }
          }
        }
      })
      reply.send({note})
     }    
  }
 
  async index(request, reply) {
    let { user_id } = request.params;
    const {name, title} = request.query
    user_id = Number(user_id);
    const noteToTags = await prismaClient.noteToTags.findMany({
      where: {
        note:{
          user_id
        }  
      }
    })
    prismaClient.$disconnect();

    reply.send({ noteToTags });
  }

  async delete(request, reply){
    let {id} = request.params;
    id = Number(id);
    await prismaClient.note.delete(
      {
        where:{
          id
        }
      }
    )
    prismaClient.$disconnect();
    reply.code(200);
  }
}
