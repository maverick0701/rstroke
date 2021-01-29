const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    skill1: {
        type: String
    },
    skill2:{
        type:String
    },
    skill3:
    {
        type:String
    },
    skill4:
    {
        type:String
    },
    skill5:
    {
        type:String
    },
    skill6:
    {
        type:String
    },
    Skill7:
    {
        type:String
    }
}, {
    timestamps: true
});

const skillForm= mongoose.model('skillForm', formSchema);

module.exports = skillForm;