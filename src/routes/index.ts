import { Router } from "express";
import { AuthRoutes } from "./auth.router";
import { UserRoutes } from "./user.router";
import { BaseRouter } from "./BaseRouter";

export class RootRouter extends BaseRouter {
    private authRoutes;
    private userRoutes;
    constructor() {
        super();
        this.userRoutes = new UserRoutes().router;
        this.authRoutes = new AuthRoutes().router;
        this.initializeRoutes();
    }
     initializeRoutes = () => {
        this.router.use("/users", this.userRoutes);
        this.router.use("/auth", this.authRoutes);
    };
}
