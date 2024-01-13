//import uuid package for generating random v4 id
const uuid = require("uuid");

//import all necessary functions from operation.js
const {
  SavePostData,
  GetPostData,
  GetDatabyID,
  DeletePostByID,
  PostContentValidator,
} = require("./Operation");

//get post by id
const GetPost = async (request, response) => {
  try {
    const { id } = request.body;
    const post = await GetDatabyID(id);
    if (post === false) {
      return response.send({
        response: "post not found",
      });
    } else {
      return response.send(post.data);
    }
  } catch (error) {
    return response.send(error);
  }
};

//get all posts
const GetPosts = async (request, response) => {
  try {
    const post = await GetPostData();
    return response.send(post);
  } catch (error) {
    console.log(error);
    return response.send(error);
  }
};

//create post 
const CreatePOST = async (request, response) => {
  //console.log(request.body);
  try {
    const { post_title, post_content, post_author } = request.body;
    const validation = PostContentValidator(
      response,
      post_title,
      post_content,
      post_author
    );
    if (validation === false) {
      return;
    }
    const data = await GetPostData();
    const created_post = {
      post_id: uuid.v4(),
      post_title: post_title,
      post_author: post_author,
      created_at: new Date().toString(),
      modified_at: new Date().toString(),
      content: post_content,
    };
    await SavePostData([...data, created_post]);
    return response.send(created_post);
  } catch (error) {
    return response.send({
      response: "Post Title, Post Content and Post Author are mandatory",
    });
  }
};

//modify post
const ModifyPOST = async (request, response) => {
  try {
    const { id } = request.body;
    if(!!id===false){
      throw "id not provided"
    }
    const post = await GetDatabyID(id);
    if (post === false) {
      throw "post not found"
    } 
    else {
      const post_content = !!request.body.post_content
        ? request.body.post_content
        : post.data.content;
      const post_title = !!request.body.post_title
        ? request.body.post_title
        : post.data.post_title;
      const post_author = !!request.body.post_author
        ? request.body.post_author
        : post.data.post_author;
      let data = await GetPostData();
      data[post.index] = {
        post_id: post.data.post_id,
        post_title: post_title,
        post_author: post_author,
        created_at: post.data.created_at,
        modified_at: new Date().toString(),
        content: post_content,
      };
      await SavePostData(data);
      return response.send(data[post.index]);
    }
  } catch (error) {
    return response.send({
      response: error,
    });
  }
};

//delete post by id
const DeletePOST = async (request, response) => {
  try {
    const { id } = request.body;
    if(!!id===false){
      throw "id not provided"
    }
    const status = await DeletePostByID(id);
    if (status === false) {
      throw "post not found"
    } 
    else {
      return response.send({
        response: "Deleted Successfully",
      });
    }
  } catch (error) {
    return response.send({
      response: error,
    });
  }
};

//export all necessary functions
module.exports = {
  GetPost,
  DeletePOST,
  CreatePOST,
  ModifyPOST,
  GetPosts,
};
