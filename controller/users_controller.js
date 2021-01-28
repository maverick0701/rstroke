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

// module.exports.print=async function(req,res)
// {
    
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto("http://localhost:8030/users/update/", {
//           waitUntil: "networkidle2"
//         });
//         await page.setViewport({ width: 1680, height: 1050 });
//         const pdfUrl=`${Path.join(__dirname,'..' ,'fileStorage', todays_date.getTime() + '.pdf')}`;
//         const Pdf=await page.pdf({
//           path: pdfUrl,
//           format: "A4",
//           printBackground: true
//         });
      
//         await browser.close();
      
//       await res.set({
//         "Content-Type": "application/pdf",
//         "Content-Length":Pdf.length
//        });
//       await res.sendFile(pdfUrl);
// }

updateData=async function(dbList,req,res)
{
  let Promise1,Promise2,Promise3,Promise4;
  if(req.body.project)
  {
    await Project.clear(req.user._id);
    Promise4=new Promise((resolve,reject)=>
    {
      Project.create({
        id:req.user,
        project:req.body.project
      },(err,proj)=>
      {
        User.findById(req.user.id,(err,user)=>
        {
          user.project=proj._id;
          user.save()
          .then(resolve())
        })
      });
    })
  }
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
    await Profile.clear(req.user._id);
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
  if(req.body.school[0]!='')
  {
    console.log(req.body.school);
    await edu.clearEdu(req.user.id);
    Promise3=new Promise((resolve,reject)=>
    {
      for(let i=0;i<req.body.school.length;i++)
      {
      edu.create({
        id:req.user._id,
        School:req.body.school[i],
        LocationOfSchool:req.body.LOCschool[i],
        yearOfStart:req.body.Sdate[i],
        endYear:req.body.Edate[i],
        fieldOfStudy:req.body.foe[i]
      },(err,edd)=>
      {
        User.findById(req.user.id,(err,user)=>
        {
          user.education.push(edd._id);
          if(err)
          {
            reject();
          }
          user.save()
          .then(()=>
          {
            // console.log(user.education);
            if(i==req.body.school.length-1)
            {
              // console.log(i,user,'hello inside edu');
              resolve();
            }
          });
        })

      });
      
    }

    })
  }
 Promise.all([Promise1,Promise2,Promise3,Promise4])
 .then(async ()=>
  {
    user2=await User.findById(req.user.id)
    .populate({
      path:'profile' 
    })
    .populate({
      path:'abMe'
    })
    .populate({
      path:'education'
    })
    .populate({
      path:'project'
    })

    user2.password=undefined;
    user2.email=undefined;
      console.log(user2.password);
      const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://localhost:8030/res/${user2}`, {
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
      // return res.render('_fourth.ejs',
      // {
      //   user1:user
      // })
    
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
  await updateData(dbList,req,res)
  

  // return res.redirect('back')
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

