import client from "../client/prismaClient";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";

export class AuthController extends BaseController {
    private User
    constructor(){
        super()
        this.User=client.user
    }

    public register=async(req:Request,res:Response)=>{
        try {
           
        } catch (error:any) {
            this.sendError(res,500,error.message)
        }
    }

}