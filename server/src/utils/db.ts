//Server Setup
import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../constants";
import logger from "./logger";

export async function connectionToDb() {
    try{
        await mongoose.connect(DB_CONNECTION_STRING)
    }
    catch(e){
        logger.error(e, 'Error connecting to database');
        process.exit(1);
    }
}

export async function disconnectfromDB(){
    await mongoose.connection.close()
    logger.info('Disconnect from database');
    return;
}