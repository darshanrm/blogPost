const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Verifying the token is vaid or not
module.exports = function(req, res, next){
  let token = req.headers["authorization"];

  if(token){
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if(err){
        res.json({
          success: false,
          msg: 'Failed to Authenticate token'
        });
      }else{
        req.decoded = decoded;
        next();
      }
    });
  }else{
    res.status(403).json({
      success: false,
      msg: 'No token provided'
    });
  }
}