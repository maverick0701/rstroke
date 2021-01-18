const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    profile: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const proForm= mongoose.model('proForm', formSchema);

module.exports = proForm;