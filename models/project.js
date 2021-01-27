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
formSchema.statics.spalshArray=async function(user)
  {
    var array=new Array();
    array=await projForm.find({id:user});
    var array2=new Array;
    array.forEach((obj1)=>
    {
        array2.push(obj1.id);
    })
    console.log(array2);
        await array2.forEach((idi)=>
        {
            
            projForm.remove({id:idi},(err)=>
                {
                    if(err)
                    {
                        console.log(err);
                    }
                })
        })
    
  }
const projForm= mongoose.model('projForm', formSchema);

module.exports = projForm;