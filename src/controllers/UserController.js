import { AppError } from "../utils/AppErros.js";
import { prismaClient } from "../utils/prismaClient.js";
import bcryptjs from "bcryptjs";

export class UserController {
  async create(request, reply) {
    const { name, email, password } = request.body;
    if (!name || !password) {
      throw new AppError("Invalid username or password");
    }
    if (!email) {
      throw new AppError("Invalid email");
    }
    const checkUserExists = await prismaClient.user.findUnique({
      where: { email },
    });
    if (checkUserExists) {
      throw new AppError("email already exists");
    }
    const hashedPassword = await bcryptjs.hash(password, 8);
    try {
      await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      prismaClient.$disconnect();
    } catch (error) {
      reply.code({ error });
    }
    reply.code(201);
  }
}
