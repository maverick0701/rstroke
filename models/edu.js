const mongoose=require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    School: {
        type: String,
        required: true
    },
    LocationOfSchool:{
        type:String,
        required:true
    },
    yearOfStart:
    {
        type:Date,
        required:true
    },
    endYear:
    {
        type:Date,
        required:true
    },
    fieldOfStudy:
    {
        type:String,
        required:true
    },
    grade:
    {
        type:Number,
        require:true
    },
    AddLink:
    {
        type:String
    }
}, {
    timestamps: true
});
formSchema.statics.clearEdu=async function(user)
{
    var edu=new Array();
    edu=await eduForm.find({id:user});
    var arr=new Array();
    edu.forEach((obj)=>{
        arr.push(obj.id);
    })
    arr.forEach((id)=>
    {
        eduForm.remove({id:id},(err)=>
        {
            if(err)
            {
                console.log(err,'error at line 52***');
            }
        })
    })


    
    
}
const eduForm= mongoose.model('eduForm', formSchema);

module.exports = eduForm;