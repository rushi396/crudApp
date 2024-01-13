//default route response function
const DefaultResponse=(request,response)=>{
    return response.send({
        "message":"success, you have connected to backend"
    })
}

//export default response
module.exports={
    DefaultResponse
}