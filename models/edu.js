const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    education: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const eduForm= mongoose.model('eduForm', formSchema);

module.exports = eduForm;