import client from "../client/prismaClient";
import { UserService } from "../services/UserService";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config";
import { AuthRequest } from "../types/Requesttypes";

export class AuthController extends BaseController {
    private User;
    private userService: UserService;
    constructor() {
        super();
        this.User = client.user;
        this.userService = new UserService();
    }

    public register = async (req: Request, res: Response) => {
        try {
            let user = await this.userService.createUniqueUser(req.body);
            if (!user) {
                return this.sendResponse(
                    res,
                    {},
                    400,
                    "User already exists with this email"
                );
            }
            return this.sendResponse(res, user, 201, "User Registered Successfully");
        } catch (error: any) {
            this.sendError(res, 500, error.message);
        }
    };

    public login = async (req: Request, res: Response) => {
        try {
            let { email, password } = req.body;
            const user = await this.User.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                return this.sendResponse(res, {}, 404, "Invalid email or Password");
            }
            let isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                let token = jwt.sign({ id: user.id }, ENV.jwtSecret, {
                    expiresIn: "2d",
                });

                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: 'none',
                })
                return this.sendResponse(
                    res,
                    { token },
                    200,
                    "Login Successfull"
                );
            }
        } catch (error: any) {
            this.sendError(res, 500, error.message);
        }
    };

    public getUser = async (req: AuthRequest, res: Response) => {
        try {
            let reqUser = req?.user;
            if (!reqUser) {
                return this.sendError(res, 400, "User Not exists");
            }
            let user = await this.userService.getUserById(reqUser?.id);
            if (user) {
                return this.sendResponse(
                    res,
                    user,
                    200,
                    "User Details Fetched Successfully"
                );
            } else {
                return this.sendError(res, 401, "Unautorized");
            }
        } catch (error: any) {
            this.sendError(res, 500, error.message);
        }
    };
}
