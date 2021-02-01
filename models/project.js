const mongoose=require('mongoose');
const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:
    {
        type:String
    },
    project: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

formSchema.statics.clear=async function(user)
{
    var edu=new Array();
    edu=await projForm.find({id:user});
    if(!edu)
    {
        return;
    }
    var arr=new Array();
    edu.forEach((obj)=>{
        arr.push(obj.id);
    })
    arr.forEach((id)=>
    {
        projForm.remove({id:id},(err)=>
        {
            if(err)
            {
                console.log(err,'error at line 37***');
            }
        })
    })
    return true;

    
    
}
const projForm= mongoose.model('projForm', formSchema);

module.exports = projForm;