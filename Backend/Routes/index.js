const express = require('express')
//import modules from API folder
const {DefaultResponse}=require("../APIs/Defaults")
const CRUD =require("../APIs/CRUD/CRUD")

//create router using express
const router=express.Router()

//default routes
router.get("/",DefaultResponse)
//other routes
router.get("/get-posts",CRUD.GetPosts)
router.post("/get-post-by-id",CRUD.GetPost)
router.delete("/delete-post-by-id",CRUD.DeletePOST)
router.post("/create-post",CRUD.CreatePOST)
router.put("/modify-post",CRUD.ModifyPOST)
//catch route
router.get("/*",DefaultResponse)

//export router
module.exports={
    router
}