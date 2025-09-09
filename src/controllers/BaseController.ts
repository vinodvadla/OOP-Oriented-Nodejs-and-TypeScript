import { Response } from "express";

export abstract class BaseController {
  protected sendResponse(
    res: Response,
    data: any,
    status: number = 200,
    message: string = "Success"
  ) {
    res.status(status).json({
      success: true,
      message: message,
      data,
    });
  }

  protected sendError(
    res: Response,
    status: number = 500,
    message: string = "Internal Server Error"
  ) {
    res.status(status).json({
      success: false,
      message: message,
    });
  }
}
