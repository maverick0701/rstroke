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
const { compile, localsName } = require('ejs');
const { resolve } = require('path');
const todays_date = new Date();
function lzw_encode(s) {
  var dict = {};
  var data = (s + "").split("");
  var out = [];
  var currChar;
  var phrase = data[0];
  var code = 256;
  for (var i=1; i<data.length; i++) {
      currChar=data[i];
      if (dict[phrase + currChar] != null) {
          phrase += currChar;
      }
      else {
          out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
          dict[phrase + currChar] = code;
          code++;
          phrase=currChar;
      }
  }
  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  for (var i=0; i<out.length; i++) {
      out[i] = String.fromCharCode(out[i]);
  }
  return out.join("");
}

require('dotenv').config({ path:Path.join(__dirname,'..','env','one.env')});
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
  let Promise1,Promise2,Promise3,Promise4,Promise5;
  if(req.body.name)
  {
    await exp.clearExp(req.user._id);
    Promise5=new Promise((resolve,reject)=>
    {
      exp.create({
        id:req.user.id,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        location:req.body.location
      },(err,exp1)=>
      {
        if(err)
        {
          console.log(err,'error in exp')
        }
        User.findById(req.user.id,(err,user)=>
        {
          user.experience=exp1._id;
          user.save()
          .then(resolve());
        })
      })
    })
  }
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
        aboutMe:req.body.aboutme.trim()
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
    //console.log(req.body.school);
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
        fieldOfStudy:req.body.foe[i],
        grade:req.body.grade[i]
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
            if(i==req.body.school.length-1)
            {
              resolve();
            }
          });
        })

      });
      
    }

    })
  }
 Promise.all([Promise1,Promise2,Promise3,Promise4,Promise5])
 .then(async ()=>
  {
    user2=await User.findById(req.user.id)
    .populate({
      path:'profile',
      select:'profile'
    })
    .populate('abMe','aboutMe')
    .populate({
      path:'education'
    })
    .populate({
      path:'project',
      select:'project'
    })
    .populate({
      path:'experience'
    })
    console.log(user2);
    user2=JSON.stringify(user2);
    user2=lzw_encode(user2)
      
      const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(process.env.pdfUrl+user2, {
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

