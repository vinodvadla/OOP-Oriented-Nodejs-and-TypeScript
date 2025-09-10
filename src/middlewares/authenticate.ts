import { NextFunction, Request, Response } from "express";
import { BaseController } from "../controllers/BaseController";
import { UserService } from "../services/UserService";
import jwt from 'jsonwebtoken'
import { ENV } from "../config";
import { AuthRequest } from "../types/Requesttypes";


export class AuthMiddleware extends BaseController {
    private userService: UserService
    constructor() {
        super()
        this.userService = new UserService()
    }
    public authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { token } = req.cookies
            const isValidToken: any = jwt.verify(token, ENV.jwtSecret)
            if (!isValidToken) {
                this.sendError(res, 401, "Invalid Token Provided")
            }
            let user = await this.userService.getUserById(isValidToken.id)
            if (!user) {
                return this.sendError(res, 401, "Unauthorized")
            }
            req.user = user
            next()
        } catch (error: any) {
            this.sendError(res, 500, error.message)
        }
    }
}