import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/authenticate";
import { BaseRouter } from "./BaseRouter";


export class AuthRoutes extends BaseRouter {

    private authController: AuthController
    private authmiddleware: AuthMiddleware

    constructor() {
        super()
        this.authController = new AuthController()
        this.authmiddleware = new AuthMiddleware()
        this.initializeRoutes()
    }

    initializeRoutes = () => {
        this.router.post("/register", this.authController.register)
        this.router.post("/login", this.authController.login)
        this.router.get("/me", this.authmiddleware.authenticate, this.authController.getUser)
    }
}
