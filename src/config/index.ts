import { config } from "dotenv";

config()



interface EnvInterface{
    jwtSecret:string
}

export const ENV:EnvInterface = {
    jwtSecret: process.env.JWT_PASS||""
}