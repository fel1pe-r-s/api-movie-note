import { prismaClient } from "../utils/prismaClient.js";

export class NoteController {
  async create(request, reply) {
    const { title, description, rating, gender } = request.body;
    let { user_id } = request.params;
    user_id = Number(user_id);
    const note = await prismaClient.note.create({
      data: {
        title,
        description,
        rating,
        user_id,
      },
    });
    await prismaClient.tags.create({
      data: {
        name: gender,
        note_id: note.id,
        user_id,
      },
    });
    prismaClient.$disconnect();
    reply.code(201);
  }
}
