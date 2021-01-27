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
formSchema.statics.clearEdu=async function(cb)
{
    var exp=new Array();
    exp=await expForm.find({});
    var arr=new Array();
    exp.forEach((obj)=>{
        arr.push(obj.id);
    })
    arr.forEach((id)=>
    {
        expForm.remove({id:id},(err)=>
        {
            if(err)
            {
                console.log(err,'error at line 52***');
            }
        })
    })


    
    
}

const expForm= mongoose.model('expForm', formSchema);

module.exports = expForm;