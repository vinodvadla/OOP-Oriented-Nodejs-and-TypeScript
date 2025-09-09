import express, { Application, Request, Response } from "express";
import { RootRouter } from "../routes";

class App {
  public app: Application;
  private rootRouter;

  constructor() {
    this.app = express();
    this.rootRouter = new RootRouter().router;
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
    this.app.use("/", this.rootRouter);
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: "Server Running",
      });
    });
  }
}

export const app = new App().app;
