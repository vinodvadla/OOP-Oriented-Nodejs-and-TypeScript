import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { BaseController } from "./BaseController";

export class UserController extends BaseController {
    private userService: UserService;
    constructor() {
        super();
        this.userService = new UserService();
    }

    public create = (req: Request, res: Response) => {
        try {
            // let user = this.userService.createUser(req.body);
            // this.sendResponse(res, user, 201, "User Created Successfully ");
        } catch (error: any) {
            this.sendError(res, 500, error.message)
        }
    }

    public getAllUSers = (req: Request, res: Response) => {
        try {
            // let users= this.userService.getAllUsers()
            // this.sendResponse(res,users,200,"Users Fetched Successfully")
        } catch (error) {
            this.sendError(res, 500,)
        }
    }
}
