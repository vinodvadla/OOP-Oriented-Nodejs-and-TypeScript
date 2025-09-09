import express, { Application, Request, Response } from "express";
import { UserRoutes } from "../routes";

 class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
  }

  private routes() {
    this.app.use("/users", new UserRoutes().router);
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: "Server Running",
      });
    });
  }
}




export const app= new App().app