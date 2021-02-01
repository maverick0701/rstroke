const mongoose=require('mongoose');
const User = require('./user');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    language: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

formSchema.statics.clear=async (user)=>
{
    var lan=new Array();
    lan=await lanForm.find({id:user});
    if(lan.length==0)
    {
        return;
    }
    var arr=new Array();
    lan.forEach((obj)=>{
        arr.push(obj.id);
    })
    arr.forEach((id)=>
    {
        lanForm.remove({id:id},(err)=>
        {
            if(err)
            {
                console.log(err,'error at line 52***');
            }
        })
    })

}
const lanForm= mongoose.model('lanForm', formSchema);

module.exports = lanForm;