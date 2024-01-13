//Load env file
const dotenv=require('dotenv')
dotenv.config()

const ServerPORT=process.env.PORT
const ServerHOST=process.env.HOST

console.log("Server Port:",ServerPORT);
console.log("Server Host:",ServerHOST);

//export port and host
module.exports= {
    ServerPORT,
    ServerHOST
}