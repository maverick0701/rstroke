const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    education: {
        type: Boolean,
        required: true
    },
    aboutme: {
        type: Boolean,
        required: true
    },
    profile:{
        type:Boolean,
        required:true
    },
    project:{
        type:Boolean,
        required:true
    },
    Past_Experience:{
        type:Boolean,
        required:true
    },
    numTrue:{
        type:Number,
        required:true
    }
}, {
    timestamps: true
});

const Form= mongoose.model('Form', formSchema);

module.exports = Form;