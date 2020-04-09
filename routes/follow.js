const express = require('express');
const router = express.Router();
const checkJWT = require('../middlewares/auth');

//Bringing ion the models
const Follw = require('../models/follow');
const User = require('../models/users');

//POST request
//ROUTE: /follow
//INPUT: token, {string: followed}
//DESC: Follow or Unfollow any User
//Private Access
router.post('/', checkJWT, async (req, res) => {
  let followFields = {};
  followFields.user = req.decoded.data._id;
  if(req.body.followed) followFields.followed = req.body.followed;
  let checkFollow = await Follow.findOne({ user: followFields.user, followed: followFields.followed });
  if(checkFollow){
    //Unfollow
    let unfollow = await Follow.findOneAndRemove({ _id: checkFollow.id });
    let removeUser = await User.findOneAndUpdate({ _id: followFields.user }, { $pull: { following: followFields.followed }}, {new:true});
    let removeFollowing = await User.findOneAndUpdate({ _id: followFields.followed }, { $pull: { followers: followFields.user }}, {new: true});
    res.send(removeUser.name+ ' just unfollowed '+removeFollowing.name);
  }else{
    //Follow
    let follow = await new Follow(followFields).save();
    let updateUser = await User.findOneAndUpdate({ _id: followFields.user }, { $push: { following: followFields.followed }}, { new: true});
    let updateFollowing = await User.findOneAndUpdate({ _id: followFields.followed }, { $push: { followers: followFields.user }}, { new: true});
    res.send(updateUser.name+' just followed '+ updateFollowing.name);
  }
});

module.exports = router;