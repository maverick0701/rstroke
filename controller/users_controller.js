const User = require('../models/user');
const edu=require('../models/edu');
const exp=require('../models/exp');
const Project=require('../models/project');
const Profile=require('../models/profile');
const abbbMe=require('../models/abMe');
const Form=require('../models/pdfForm');
const fs = require('fs');
const Path = require('path');
const puppeteer = require("puppeteer");
const { compile } = require('ejs');
const todays_date = new Date();

module.exports.print=async function(req,res)
{
    
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("http://localhost:8030/users/profile/", {
          waitUntil: "networkidle2"
        });
        await page.setViewport({ width: 1680, height: 1050 });
        const pdfUrl=`${Path.join(__dirname,'..' ,'fileStorage', todays_date.getTime() + '.pdf')}`;
        const Pdf=await page.pdf({
          path: pdfUrl,
          format: "A4",
          printBackground: true
        });
      
        await browser.close();
      
      await res.set({
        "Content-Type": "application/pdf",
        "Content-Length":Pdf.length
       });
      await res.sendFile(pdfUrl);
}
// callDblist=function(dbList,req,bool)
// {
//   newBOOl=false;
//   return new Promise((resolve,reject)=>{
 
//   console.log('hello my first promise ');
//   dbList.forEach(async (key)=>
//   {
    
//     if(key=='school')
//     {
//       await edu.clearEdu(req.user.id);
//       for(let i=0;i<req.body.school.length;i++)
//       {
//       var edd=await edu.create({
//         id:req.user._id,
//         School:req.body.school[i],
//         LocationOfSchool:req.body.LOCschool[i],
//         yearOfStart:req.body.Sdate[i],
//         endYear:req.body.Edate[i],
//         fieldOfStudy:req.body.foe[i]
//       });
//       let user=await User.findById(req.user.id);
//       user.education.push(edd.id);
//       user.save();
//     }
      
      
//     }
//     else if(key=='Past_Experience')
//     {
//       await exp.clearExp(req.user.id);
//       var exx=await exp.create({
//         id:req.user,
//         experience:req.body.Past_Experience
//       });
//       let user=await User.findById(req.user.id);
//       user.experience.push(exx.id);
//       user.save();
//     }
//     else if(key=='project')
//     {
//       await Project.spalshArray(req.user.id);
//       var proj=await Project.create({
//         id:req.user,
//         project:req.body.project
//       });
//       let user=await User.findById(req.user.id);
//       user.project.push(proj.id);
//       user.save();
//     }
    
//     if(key=='aboutme')
//     {
//       new Promise(async (resolve,reject)=>
//       {
        
//         bool1=await abbbMe.clearAbme(req.user._id);
//         console.log(bool1)
//         if(bool1==true)
//         {
//           resolve();
//         }
//         else
//         {
//           reject();
//         }
//       })
//       .then(async ()=>{
//         var abbMe=await abbbMe.create({
//           id:req.user,
//           aboutMe:req.body.aboutme
//         })
      
//         let user=await User.findById(req.user.id);
//         console.log(abbMe._id,'this is abMe');
//         user.abMe=abbMe._id;
        
//         user.save();
        
//       })
//     .then(async ()=>
//   {
//     var user2=await User.findById(req.user.id)
//   //  .populate({
//   //    path:'abMe'
//   //  })
//   //  .populate(
//   //    {
//   //      path:'profile'
//   //    }
//   //  )
//    console.log(user2.abMe,'this is user2');
   
//   })
//       .catch(()=>{console.log('eror*********')});
//       newBOOl=true;
//       // console.log('inside about me')
      

//     }
//     else if(key=='profile')
//     {
//       var prof=await Profile.create({
//         id:req.user.id,
//         profile:req.body.profile
//       })
//       let user=await User.findById(req.user.id);
//       user.profile=prof._id;
//       user.save();
//     }
    
//   });
//   if(newBOOl)
//   {
//   resolve();
//   }
// })

//}
updateData=async function(dbList,req)
{
  let Promise1,Promise2;
  if(req.body.aboutme)
  {
    await abbbMe.clearAbme(req.user._id);
    Promise1=new Promise((resolve,reject)=>
    {
      abbbMe.create({
        id:req.user.id,
        aboutMe:req.body.aboutme
      },(err,abbMe)=>{
        if(err)
        {
          reject();
        }
        User.findById(req.user.id,(err,user)=>
        {
          if(err)
          {
            reject();
          }
        user.abMe=abbMe._id;
        user.save()
        .then(()=>
        {
          resolve();
        })
      });

      });
      
    })
  }
  if(req.body.profile)
  {
    Promise2=new Promise((resolve,reject)=>
    {
      Profile.create({
          id:req.user.id,
          profile:req.body.profile
        },(err,prof)=>
        {
          User.findById(req.user.id,(err,user)=>
          {
            user.profile=prof._id;
            user.save()
            .then(()=>{
              resolve()
            });
          });

        })
        
        
        
    })
  }
 Promise.all([Promise1,Promise2])
 .then(async ()=>
  {
    user=await User.findById(req.user.id)
    .populate({
      path:'profile'
    })
    .populate({
      path:'abMe'
    })
    console.log(user);
  })
  .catch(()=>
  {
    console.log('reject');
  })


}
module.exports.update=async function(req,res)
{
  
  var dbList=new Array();
  dbList=Object.keys(req.body);
  var bool=false;
  user=await User.find({_id:req.user._id});
  
  User.splashUser(user);
  await updateData(dbList,req)
  

  return res.redirect('back')
  // console.log(user,'this is user *****')
}

module.exports.profile=function(req,res)
{
  User.findById(req.params.id,function(err,user)
  {
    res.render('_secondPage.ejs',{
      user:user
    });
  })
  
}

// 6011a833dd2b062697357b76