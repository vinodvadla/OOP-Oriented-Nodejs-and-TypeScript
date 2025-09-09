import { Router } from "express";
import { AuthController } from "../controllers/AuthController";


export class AuthRoutes{
    public router:Router
    private authController:AuthController

    constructor(){
        this.router=Router()
        this.authController=new AuthController()
        this.initializeRoutes()
    }

    private initializeRoutes=()=>{
        this.router.post("/register",this.authController.register)
    }
}
