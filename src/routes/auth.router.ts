import { AuthController } from "../controllers/AuthController";
import { BaseRouter } from "./BaseRouter";


export class AuthRoutes extends BaseRouter{
    private authController:AuthController

    constructor(){
        super()
        this.authController=new AuthController()
        this.initializeRoutes()
    }

     initializeRoutes=()=>{
        this.router.post("/register",this.authController.register)
    }
}
