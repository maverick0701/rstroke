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
    experience:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'expForm'
    },
    profile:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'proForm'
    },
    achievement:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'achForm'
    },
    skill:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'skillForm'
    },
    project:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'projForm'
    }],
    language:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'lanForm'
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
  userSchema.statics.splashUser=(user)=>
  {
    var i=0;
   
    while(i<user[0].education.length)
    {
        user[0].education.pop();
       
    }
    var i=0;
    while(i<user[0].language.length)
    {
        user[0].language.pop();
        
    }
    var i=0;
    while(i<user[0].project.length)
    {
        user[0].project.pop();
        
    }
    user[0].save();
  }

const User = mongoose.model('User', userSchema);

module.exports = User;