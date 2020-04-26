const express = require('express');
const router = express.Router();
const checkJwt = require('../middlewares/auth');


//bringing in the models
const Comment = require('../models/comments');

//commenting  on a post
//route: /comment
//private access
//input: token, {String: postId}, {String: comment}
router.post('/', checkJwt, async (req, res) => {
    let commentFields = {};
    commentFields.user = req.decoded.data._id;
    if(req.body.post) commentFields.post = req.body.post;
    if(req.body.comment) commentFields.comment = req.body.comment;
    let exists = await Comment.findOne({user : commentFields.user, post : commentFields.post, comment : commentFields.comment});
    if(exists){
        res.send("you have already posted the same comment");
    }else{
        let comment = await new Comment(commentFields).save();
        res.send("you have commented on the post"+comment);
    }
});

//get comments of a post 
//route: /comment/show
//input: token, {String: post}
//private access
router.get('/show/:postId', checkJwt, async (req,res) =>{
    let commentFields = {};
    commentFields.user = req.decoded.data._id;
    if(req.params.postId) commentFields.post = req.params.postId;
    let comments = await Comment.find({post : commentFields.post}).populate('user');
    if(comments){
        res.send(comments);
    }else{
        res.send("no comments found");
    }
});

//delete comments of post
//route: /comment/delete
//privat access
//input: token, {String: commentId}
router.delete('/delete/:comment_id', checkJwt, async (req, res) => {
    const loggedUser = req.decoded.data._id;
    const selectedComment = await Comment.findOne({ _id: req.params.comment_id });
    if(selectedComment){
      const author = selectedComment.user;
      if(author.equals(loggedUser) == true){
        const removedComment = await Comment.findOneAndRemove({ _id: selectedComment.id });
        res.send(removedComment);
      }else{
        res.send('You are not the author of this Comment');
      }
    }else{
      res.send('No Comments find at this URL');
    }
  });
  


module.exports = router;
