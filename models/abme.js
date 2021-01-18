const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    aboutMe: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const meForm= mongoose.model('meForm', formSchema);

module.exports = meForm;