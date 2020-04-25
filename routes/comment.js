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
router.post('/show', checkJwt, async (req,res) =>{
    let commentFields = {};
    commentFields.user = req.decoded.data._id;
    if(req.body.post) commentFields.post = req.body.post;
    let comments = await Comment.find({user : commentFields.user, post : commentFields.post});
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
router.post('/delete', checkJwt, (req, res) => {
    Comment.findOneAndRemove({_id : req.body.comment})
    .then(deletedComment => res.send(deletedComment+ " deleted successfully"))
    .catch(err => res.json(err));
});






module.exports = router;
