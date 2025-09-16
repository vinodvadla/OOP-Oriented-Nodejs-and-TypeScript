import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/authenticate";
import { BaseRouter } from "./BaseRouter";

export class UserRoutes extends BaseRouter {
  private userController: UserController;
  private authMiddleware: AuthMiddleware;
  constructor() {
    super();
    this.userController = new UserController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router.get(
      "/",
      this.authMiddleware.authenticate,
      this.userController.getAllUsers
    );
  };
}
