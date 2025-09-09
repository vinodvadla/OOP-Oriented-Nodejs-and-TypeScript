import { Router } from "express";
import { AuthRoutes } from "./auth.router";
import { UserRoutes } from "./user.router";


export class RootRouter {
    public router: Router
    private authRoutes
    private userRoutes
    constructor() {
        this.router = Router()
        this.userRoutes = new UserRoutes().router
        this.authRoutes = new AuthRoutes().router
        this.initializeRoutes()
    }
    private initializeRoutes = () => {
        this.router.use("/users", this.userRoutes)
        this.router.use("/auth", this.authRoutes)
    }
}