import { IUser } from "../types/User";

export class UserService {
  private users: IUser[] = [];

  public createUser(user:IUser){
    this.users.push(user)
    return user
  }


  public getAllUsers():IUser[]{
    return this.users
  }
}
