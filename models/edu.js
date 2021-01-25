const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Scool: {
        type: String,
        required: true
    },
    LocationOfSchool:{
        type:String,
        required:true
    },
    yearOfStart:
    {
        type:Date,
        required:true
    },
    endYear:
    {
        type:Date,
        required:true
    },
    fieldOfStudy:
    {
        type:String,
        required:true
    },
    AddLink:
    {
        type:String
    }
}, {
    timestamps: true
});

const eduForm= mongoose.model('eduForm', formSchema);

module.exports = eduForm;