import { AppError } from "../utils/AppErros.js";
import { prismaClient } from "../utils/prismaClient.js";
import bcryptjs from "bcryptjs";

export class UserController{
  async create(request, reply) {
    const { name, email, password } = request.body;

    if (!name || !password) {
      throw new AppError("Invalid username or password");
 
    }
    if (!email) {
      throw new AppError("Invalid email");
    }

    // const checkUserExists = await database.get(
    //   `SELECT email FROM users WHERE email = '${email}'`
    // );
    // if (checkUserExists) {
    //   throw new AppError("Email already exists");
    // }
    const hashedPassword = await bcryptjs.hash(password, 8);
    
    await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    reply.code(201)
  }
}