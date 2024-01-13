//import fs-extra module for json file operations
const fs =require('fs-extra');

//fucntion gets the all posts
const GetPostData = async ()=> {
    const postData= await fs.readJson("./Data/Posts.json")
    return postData
}

//fucntion saves the post
async function SavePostData(json) {
    const status=await fs.writeJson("./Data/Posts.json",json)
    return status   
}

//fucntion gets the post by id
async function GetDatabyID(id) {
    const data=await GetPostData()
    for (let index = 0; index < data.length; index++) {
        if (data[index].post_id===id) return { data:data[index],index:index}
    }
    return false
}

//fucntion deletes the post by id
async function DeletePostByID(id) {
    let data=await GetPostData()
    let delete_index=-1;
    for (let index = 0; index < data.length; index++) {
        if (data[index].post_id===id) delete_index=index
    }
    if(delete_index!==-1){
        data.splice(delete_index,1)
    }else{
        return false
    }
    const status =await SavePostData(data)
    return true
}

//function for validating the post 
function PostContentValidator(response,post_title,post_content,post_author) {
    if(
        post_title.length<5 ||
        post_title.length>100
    ){
        response.send({
            "response":"title must be contain minimum 5 characters and max 100 characters"
        })
        return false
    }
    if(
        post_content.length<5
    ){
        response.send({
            "response":"post content must be contain minimum 5 characters"
        })
        return false
    }
    if(
        post_author.length<2 ||
        post_author.length>20
    ){
        response.send({
            "response":"post author must be minimum 2 characters and maxmimum 20 characters"
        })
        return false
    }
    return true
}


//export all necessary functions
module.exports={
    SavePostData,
    GetPostData,
    GetDatabyID,
    DeletePostByID,
    PostContentValidator
}