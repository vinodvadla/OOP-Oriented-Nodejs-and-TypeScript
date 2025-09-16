import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { BaseController } from "./BaseController";

export class UserController extends BaseController {
    private userService: UserService;
    constructor() {
        super();
        this.userService = new UserService();
    }

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const search = req.query.search as string | undefined;

            let where: any = {};

            if (search) {
                where = {
                    OR: [
                        {
                            name: {
                                contains: search,
                                mode: "insensitive", // case-insensitive search
                            },
                        },
                        {
                            email: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            mobile: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                };
            }

            const users = await this.userService.getUsers({
                where,
            });

            this.sendResponse(res, users, 200, "Users Fetched Successfully");
        } catch (error: any) {
            
            this.sendError(res, 500, error.message);
        }
    };
}
