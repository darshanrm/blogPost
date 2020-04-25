const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const checkJWT = require('../middlewares/auth');

//Bringing in the models
const Post = require('../models/posts');
const Follow = require('../models/follow');
const Likes = require('../models/likes');

//Multer Components
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/posts/');
  },
  filename: function(req, file, cb){
    cb(null, req.decoded.data._id + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  //Reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype  === 'image/jpg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024* 10
  },
  fileFilter: fileFilter
});

//POST request
//ROUTE: /post/createArticle
//INPUT: token, {string: text}, {file: image}
//Private Access
router.post('/createArticle', checkJWT, upload.single('image'), async (req, res) => {
  let postFields = {};
  postFields.author = req.decoded.data._id;
  if(req.body.text) postFields.text = req.body.text;
  if(req.body.title) postFields.title = req.body.title;
  var str = 'http://localhost:3002/';
  if(req.file) postFields.image = str + req.file.path.replace(/\\/g,"/");
  let newPost = await new Post(postFields).save();
  res.send(newPost);
});

//GET request
//ROUTE: /post/getPosts
//INPUT: token
//DESC: Getting all the posts of the followed users 
//Private Access
router.get('/getPost', checkJWT, async (req, res) => {
  let Posts = {};
  let followings = await Follow.find({ user: req.decoded.data._id }, { followed:1, _id:0});
  var j = 0;
  for(var i=0;i<followings.length;i++){
    let checkPost = {};
    checkPost = await Post.find({ author: followings[i].followed });
    if(checkPost != ''){
      Posts[j] = checkPost;
      j++;
    }
  }
  res.send(Posts);
});

//GET request
//ROUTE: /post/myPost
//INPUT: token
//DESC: Getting all the post of the loged in user
//Private Access
router.get('/myPost', checkJWT, async (req, res) => {
  let authId = req.decoded.data._id;
  let myposts = await Post.find({ author: authId });
  res.send(myposts);
    
});



//POST request
//ROUTE: /post/editPost
//INPUT: token, postId, {string: text}, {file: image}
//DESC: Editing the post of the logged in user
//Private Access
router.post('/editPost', checkJWT, upload.single('image'), async(req,res) => {
  let editFields = {};
  editFields.author = req.decoded.data._id;
  if(req.body.text) editFields.text = req.body.text;
  if(req.body.title) editFields.title = req.body.title;
  var str = 'http://localhost:3002/';
  if(req.file) editFields.image = str + req.file.path.replace(/\\/g,"/");
  Post.findOneAndUpdate({ _id: req.body.postId }, { $set: editFields})
          .then(updatedPost => res.send(updatedPost))
          .catch(err => res.json(err));
  
});


//POST request
//ROUTE: /post/deletePost
//INPUT: token, postId
//DESC: Editing the post of the logged in user
//Private Access
router.post('/deletePost', checkJWT, (req,res) => {
  id = req.body.postId;
  Post.findOneAndRemove({_id: id})
  .then(deletedPost => res.send(deletedPost))
  .catch(err => res.json(err));
});

module.exports = router;
