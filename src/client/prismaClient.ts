import { PrismaClient } from "../generated/prisma";

let client: PrismaClient = new PrismaClient({
    log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
      ],
});

export default client;
