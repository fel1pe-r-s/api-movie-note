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
  async update(request, reply){
    const { name, email, password, new_password } = request.body;
    const { user_id } = request.params;
     const id =  Number(user_id)
   
    const user = await prismaClient.user.findFirst({
      where: { id }
    });
    if (!user) {
      throw new AppError("User not found");
    }
    const userWithUpdateEmail  = await prismaClient.user.findFirst({
      where: { email }
    });
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError(`Email ${email} already exists`);
    }

    
    if (password && current_password) {
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        throw new AppError("Invalid current password, could not update password");
      }
      user.password = (await hash(new_password, 8)) || user.password;
    }
  
    reply.code(201)
  }
}
