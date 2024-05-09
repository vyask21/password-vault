import cors from "@fastify/cors";
import fs from 'fs';
import fastify, { FastifyReply, FastifyRequest } from "fastify"
import { CORS_ORIGIN } from "../constants";
import jwt from "@fastify/jwt";
import path from "path";
import cookie from "@fastify/cookie";
import userRoutes from "../modules/user/user.routes";
import vaultRoutes from "../modules/vault/vault.route";

declare module "fastify"{
    export interface FastifyInstance{
        authenticate: any;
    }
}
function createServer(){

    const app = fastify()

    app.register(cors, {
        origin: CORS_ORIGIN,
        credentials: true,
    }); 

    app.register(jwt, {
        secret: {
            private: fs.readFileSync(`${path.join(process.cwd()), "certs"}/private.key`),
            public: fs.readFileSync(`${path.join(process.cwd()), "certs"}/public.key`)
        },
        sign: {algorithm: 'RS256'},
        cookie: {
            cookieName: 'token',
            signed: false,
        },
    });

    app.register(cookie, {
        parseOptions: {},
    });

    //setup auth
    app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try{
            //verify payload file
            const user = await request.jwtVerify<{
                _id: string;
            }>(); 
            request.user = user;
        }
        catch(e){
            return reply.send(e);
        }
    })

    app.register(userRoutes, {prefix: 'api/users'});
    app.register(vaultRoutes, {prefix: 'api/users'});

    return app;

}

export default createServer;