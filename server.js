const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config/config');
const morgan = require('morgan');

//Application variable
const PORT = process.env.PORT;
const app = express();
const server = app.listen(PORT, (err) => {
  if(err) console.log(err);
  console.log(`Server started at ${PORT}`);
});

//MongoDb COnnection
mongoose.connect(config.database, { useNewUrlParser: true , useUnifiedTopology: true });
//Checking the connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database');
});
mongoose.connection.on('error', (err) => {
  console.log('Database Error:' +err);
});


//Bring the services
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//Bringing in the Routes
const mainRoutes = require('./routes/mainRoute');
const postRoutes = require('./routes/post');
const followRoutes = require('./routes/follow');
const likesRoutes = require('./routes/likes');
const commentRoutes = require('./routes/comment');

//Using the routes
app.use('/', mainRoutes);
app.use('/post', postRoutes);
app.use('/follow', followRoutes);
app.use('/like', likesRoutes);
app.use('/comment', commentRoutes);