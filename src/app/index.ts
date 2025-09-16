import express, { Application, Request, Response } from "express";
import { RootRouter } from "../routes";
import csurf from "csurf";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from 'cookie-parser'

class App {
  public app: Application;
  private rootRouter;

  constructor() {
    this.app = express();
    this.config();
    this.rootRouter = new RootRouter().router;
    this.routes();
  }

  private config() {
    // this.app.use(
    //   rateLimit({
    //     windowMs: 15 * 60 * 1000,
    //     max: 20,
    //     message: "Too many requests",
    //   })
    // );

    this.app.use(
      cors({
        // origin: ["https://your-frontend.com"],
        credentials: true,
      })
    );


    // this.app.use(csurf({ cookie: true }));

    this.app.use(cookieParser())
    // this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
  }

  private routes() {
    this.app.use("/v1", this.rootRouter);
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: "Server Running",
      });
    });
  }
}

export const app = new App().app;
