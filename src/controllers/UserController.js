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
      prismaClient.$disconnect();
      throw new AppError("User not found");
    }
    if (!password) {
      prismaClient.$disconnect();
      throw new AppError("Password was not entered");
    } 
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      prismaClient.$disconnect();
      throw new AppError("Invalid password, could not update");
    } 
    const userWithUpdateEmail  = await prismaClient.user.findFirst({
      where: { email }
    });
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      prismaClient.$disconnect();
      throw new AppError(`Email ${email} already exists`);      
    }  
    if (name || email) {      
      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.password = user.password
    }    
    if (password && new_password) {     
      user.password = await bcryptjs.hash(new_password, 8);
    }

    const result = await prismaClient.user.update({
      where: { id: user.id},
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: new Date()
      }
    })
    prismaClient.$disconnect();
    reply.send(result)
  }
}
