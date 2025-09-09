import { Router } from "express";
import { UserController } from "../controllers/UserController";

export class UserRoutes {
  public router: Router;
  private userController: UserController;
  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get("/", this.userController.getAllUSers);
    this.router.post("/", this.userController.getAllUSers);
  };
}
