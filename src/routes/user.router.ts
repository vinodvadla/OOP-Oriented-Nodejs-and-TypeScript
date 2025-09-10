import { UserController } from "../controllers/UserController";
import { BaseRouter } from "./BaseRouter";

export class UserRoutes extends BaseRouter {
  private userController: UserController;
  constructor() {
    super();
    this.userController = new UserController();
    this.initializeRoutes();
  }
   initializeRoutes = () => {
    this.router.get("/", this.userController.getAllUSers);
  };
}
