//import app from app.js
const {app}=require('./app') 
//import credentials from config
const Credentials=require("./config")

//app listen on port 9000
app.listen(Credentials.ServerPORT,Credentials.ServerHOST,()=>{
    console.log(`Server is Started at http://${Credentials.ServerHOST}:${Credentials.ServerPORT}`);
})