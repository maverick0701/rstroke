const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    experience: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const expForm= mongoose.model('expForm', formSchema);

module.exports = expForm;