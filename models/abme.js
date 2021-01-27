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
formSchema.statics.clearAbme=async function(user)
{
    var edu=new Array();
    edu=await meForm.find({id:user});
    // console.log(edu);
    var arr=new Array();
    edu.forEach((obj)=>{
        arr.push(obj.id);
    })
    arr.forEach((id)=>
    {
        meForm.remove({id:id},(err)=>
        {
            if(err)
            {
                console.log(err,'error at line 52***');
            }
        })
    })


    
    
}
const meForm= mongoose.model('meForm', formSchema);

module.exports = meForm;