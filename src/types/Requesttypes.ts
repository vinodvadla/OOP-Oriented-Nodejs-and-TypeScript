import { Request } from "express"

export interface AuthRequest extends Request {
    user?:{
        name:string,
        id:number
    }
}