const mongoose=require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    education:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'eduForm'
    }],
    abMe:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'meForm'
    },
    experience:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'expForm'
    }],
    profile:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'proForm'
    }],
    project:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'projForm'
    }]
}, {
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
//for statics
  userSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;
  userSchema.statics.spalshArray=function(cb)
  {
    User.find({},function(err,user)
    {
      console.log(user.id);
    })
  }

const User = mongoose.model('User', userSchema);

module.exports = User;