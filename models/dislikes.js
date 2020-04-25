const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DislikesSchema = new Schema({
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

module.exports = Dislikes = mongoose.model('Dislikes', DislikesSchema);