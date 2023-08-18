import { prismaClient } from "../utils/prismaClient.js";


export class UserController{
  async create(request) {
    const { name, email, password } = request.body;
    
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password
      }
    })
    return user
  }
}