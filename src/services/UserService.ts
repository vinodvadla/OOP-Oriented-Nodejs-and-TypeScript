import client from "../client/prismaClient";
import bcrypt from "bcrypt";

interface IUser {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export class UserService {
  private User;
  constructor() {
    this.User = client.user;
  }

  public createUniqueUser = async (user: IUser) => {
    try {
      let exists = await this.User.findUnique({
        where: {
          email: user.email,
        },
      });
      if (exists) {
        return false;
      }
      let hashedPass = await bcrypt.hash(user.password, 10);
      user.password = hashedPass;
      let newUser = await this.User.create({
        data: user,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  public getUsers = async () => {
    try {
      const users = await this.User.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  };

  public getUserById = async (id: number) => {
    try {
      let user = await this.User.findUnique({
        where: {
          id,
        },
      });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  };

  public updateUser = async (updatedFields: IUser) => {
    try {
    } catch (error) {}
  };
}
