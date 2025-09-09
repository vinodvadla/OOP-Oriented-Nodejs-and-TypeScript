import { send } from "process";
import client from "../client/prismaClient";
import { UserService } from "../services/UserService";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ENV } from "../config";

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
            let data = req.body;
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
            let { email, password } = req.body
            const user = await this.User.findUnique({
                where: {
                    email
                }
            })
            if (!user) {
                return this.sendResponse(res, {}, 404, "Invalid Email Or Password")
            }
            let isSame=await bcrypt.compare(password,user.password)
            if(isSame){
                let token=jwt.sign({id:user.id},ENV.jwtSecret)
            }
        } catch (error) {

        }
    }

}
