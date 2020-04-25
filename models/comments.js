const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        post:{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comment:{
            type: String
        }
    }
);

module.exports = Comment = mongoose.model('Coment', commentSchema);