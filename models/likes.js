const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikesSchema = new Schema(
    {
        post:{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }         
    },
{
    timestamps:true
}
);

module.exports = Likes = mongoose.model('Likes', LikesSchema);