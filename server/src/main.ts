import { FastifyInstance } from "fastify";
import createServer from "./utils/createServer";
import logger from "./utils/logger";
import { connectionToDb, disconnectfromDB } from "./utils/db";

// console.log("Hello from main");

function gracefulShutdown(signal: string, app: FastifyInstance){
    process.on(signal, async () =>{
        logger.info(`Goodbye, got signal ${signal}`);
        app.close();
        await disconnectfromDB();
        logger.info('My work is done');
        process.exit(0);
    });
}

async function main(){
    const app = createServer();
    try{
        const url = await app.listen({port: 4000, host: "0.0.0.0"});        
        logger.info(`Server is ready at ${url}`);
        await connectionToDb();
    }    
    catch(e){
        logger.error(e);
        process.exit(1);
    }

    //Listen to signals
    const signals = ["SIGTERM", "SIGINT"];
    for(let i=0; i< signals.length; i++){
        gracefulShutdown(signals[i], app);
    }
}

main();