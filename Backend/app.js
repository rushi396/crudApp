const express = require('express');
const {router}= require("./Routes")

//create express app
const app=express()
//let app handle json data
app.use(express.json())
//let app handle routes
app.use(
    router
)

//export app
module.exports={
    app
}