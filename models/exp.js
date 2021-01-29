const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name: {
        type: String,
        required: true
    },
    email:
    {
        type:String,
        required:true,
    },
    phone:
    {
        type:String
    },
    location:
    {
        type:String
    },
    link:{
        type:String
    }
}, {
    timestamps: true
});
formSchema.statics.clearExp=async function(user)
{
    var exp=new Array();
    exp=await expForm.find({id:user});
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