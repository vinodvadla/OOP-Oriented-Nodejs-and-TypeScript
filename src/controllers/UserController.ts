import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { BaseController } from "./BaseController";

export class UserController extends BaseController {
    private userService: UserService;
    constructor() {
        super();
        this.userService = new UserService();
    }

    public getAllUSers = async (req: Request, res: Response) => {
        try {
            let users = await this.userService.getUsers();

            this.sendResponse(res, users, 200, "Users Fetched Successfully");
        } catch (error) {
            this.sendError(res, 500);
        }
    };
}
