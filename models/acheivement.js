const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    achievement: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
formSchema.statics.clear=async function(user)
{
    var edu=new Array();
    edu=await achForm.find({id:user});
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
        achForm.remove({id:id},(err)=>
        {
            if(err)
            {
                console.log(err,'error at line 52***');
            }
        })
    })
    return true;

    
    
}
const achForm= mongoose.model('achForm', formSchema);

module.exports = achForm;