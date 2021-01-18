const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    project: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const projForm= mongoose.model('projForm', formSchema);

module.exports = projForm;