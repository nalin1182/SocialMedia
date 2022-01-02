const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const IMAGE_PATH = path.join('/uploads/users/images');

const postSchema = new mongoose.Schema({
    postImg:{
        type:String
    },
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
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]

});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', IMAGE_PATH));
    },
    filename: function(req, file, cb) {   
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

postSchema.statics.upload = multer({storage,fileFilter}).single('postImg');

const Posts = mongoose.model('Posts',postSchema);
module.exports = Posts;