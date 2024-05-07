import createServer from "./utils/createServer";

console.log("Hello from main");

async function main(){

    const app = createServer();

    try{
        const url = await app.listen({port: 4000, host: '0.0.0.0'});
    }
    
    catch(e){
        console.error(e);
        process.exit(1);
    }
}

main();