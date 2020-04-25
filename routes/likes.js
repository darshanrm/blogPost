const express = require('express');
const router = express.Router();
const checkJWT = require('../middlewares/auth');

//bringing in the models
const Likes = require('../models/likes');
const Dislikes = require('../models/dislikes');


//Liking the post
//POST request
//ROUTE: /like
//INPUT: token, {string: postId}
//Private Access
router.post('/',checkJWT, async (req,res) => {
    let likeFields = {};
    likeFields.user = req.decoded.data._id;
    if(req.body.post) likeFields.post = req.body.post;
    let existing = await Likes.findOne({user : likeFields.user, post : likeFields.post});
    if(existing){
        res.send("DM mf...you have already liked this post");
    }else{
        let like = await new Likes(likeFields).save();
        res.send('you have liked the post');
    }
});

//Disliking the post
//POST request
//ROUTE: /like/dislike
//INPUT: token, {string: post}
//Private Access
router.post('/dislike',checkJWT,async (req, res) => {
    let dislikeFields = {};
    dislikeFields.user = req.decoded.data._id;
    if(req.body.post) dislikeFields.post = req.body.post;
    let like = await Likes.findOne({user : dislikeFields.user, post:dislikeFields.post});
    if(like){
        let remove = await Likes.findOneAndRemove({user : dislikeFields.user, post:dislikeFields.post});
        let dislike = await new Dislikes(dislikeFields).save();
        res.send("you are such a hypocrite...first like and now dislike huh");
    }else{
        let exists = await Dislikes.findOne({user : dislikeFields.user, post : dislikeFields.post});
        if(exists){
            res.send("So much hate dude...grow up");
        }else{
            let dislike = await new Dislikes(dislikeFields).save();
            res.send("you are mean...you disliked the post");
        }
    }
} 
);


module.exports = router;