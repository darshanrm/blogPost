const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const checkJWT = require('../middlewares/auth');

//Bringing in the Models
const User = require('../models/users');

//POST request
//ROUTE: /login
//INPUT: {string: email},{string: password}
//Public Access
router.post('/login', (req, res) => {
  let loginFiels = {};
 if(req.body.email) loginFiels.email = req.body.email;
 if(req.body.password) loginFiels.password = req.body.password;
 User.findOne({ email: loginFiels.email })
  .then(user => {
    if(!user){
      return res.json({ success: false, msg:'User not found'});
    }
    User.comparePasswords(loginFiels.password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        User.findOneAndUpdate({ email: loginFiels.email }, { isOnline: true }, {new: true})
          .then(updatedUser => {
            const token = jwt.sign({ data: updatedUser }, config.secretKey, { expiresIn: '7d'});
            res.json({
              success: true,
              token: token,
              user: updatedUser
            });
          });
      }
    });
  });
});

//POSt request
//ROUTE: /signup
//INPUT: {string:name},{string: email},{string: password}
//Public Access
router.post('/signup', async (req, res) => {
  let signupFiels = {};
  if(req.body.name) signupFiels.name = req.body.name;
  if(req.body.email) signupFiels.email = req.body.email;
  if(req.body.password) signupFiels.password = req.body.password;
  User.findOne({ email: signupFiels.email })
    .then(user => {
      if(user){
        res.json({ success: false, msg: 'Email already exists'});
      }else{
        User.addUser(signupFiels, (newUser) => {
            User(newUser).save().then(userCreated => {
              res.json({ success: true, msg: 'User registered successfully', user: userCreated});
            })
            
        });
      }
    });
});

//DELETE request
//ROUTE: /logout
//INPUT: token
//PRivate access
router.delete('/logout', checkJWT, (req, res) => {
  User.findOneAndUpdate({ email: req.decoded.data.email }, {isOnline: false}, {new:true})
    .then(user => {
      res.send(user);
    });
});

module.exports = router;

