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
formSchema.statics.clear=async function(user)
{
    var edu=new Array();
    edu=await proForm.find({id:user});
    if(!edu)
    {
        return;
    }
    // console.log(edu,'hello1');
    var arr=new Array();
    edu.forEach((obj)=>{
        arr.push(obj.id);
    })
    arr.forEach((id)=>
    {
        proForm.remove({id:id},(err)=>
        {
            if(err)
            {
                console.log(err,'error at line 52***');
            }
        })
    })
    return true;

    
    
}
const proForm= mongoose.model('proForm', formSchema);

module.exports = proForm;