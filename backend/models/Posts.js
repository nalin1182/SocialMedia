const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    creator_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:String
    }

});

const Posts = mongoose.model('Posts',postSchema);
module.exports = Posts;