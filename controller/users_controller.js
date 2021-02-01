const User = require('../models/user');
const edu=require('../models/edu');
const exp=require('../models/exp');
const proj=require('../models/project');
const Achievement=require('../models/acheivement');
const Profile=require('../models/profile');
const abbbMe=require('../models/abMe');
const skill=require('../models/skill');
const lang=require('../models/lan');
const Form=require('../models/pdfForm');
const fs = require('fs');
const Path = require('path');
const puppeteer = require("puppeteer");
const { compile, localsName } = require('ejs');
const { resolve } = require('path');
const todays_date = new Date();
require('dotenv').config({ path:Path.join(__dirname,'..','env','one.env')});
updateData=async function(dbList,req,res)
{
  let Promise1,Promise2,Promise3,Promise4,Promise5,Promise6,Promise7,Promise8;
  if(req.body.project)
  {
    await proj.clear(req.user.id);
    Promise8=new Promise((resolve,reject)=>
    {
      
      for(let i=0;i<req.body.project.length;i++)
      {
        proj.create({
          id:req.user.id,
          title:req.body.project[i],
          project:req.body.projectContent[i]
        },(err,proj)=>
        {
          User.findById(req.user.id,(err,user)=>
          {
            user.project.push(proj._id);
            user.save()
            .then(()=>{
            if(i==req.body.project.length-1)
              {
                console.log('here  here')
                resolve();
              }
          })})
        })
      }
    })
  }
  if(req.body.language)
  {
    await lang.clear(req.user.id);
    Promise7=new Promise((resolve,reject)=>
    {
     
     
      for(let i=0;i<req.body.language.length;i++)
      {
        // console.log(i);
        lang.create({
          id:req.user.id,
          language:req.body.language[i]
        },(err,lang)=>
        {
          // console.log(lang);
          User.findById(req.user.id,(err,user)=>
          {
            // console.log(user);
            user.language.push(lang._id);
            user.save()
            .then(()=>{
              // console.log(i);
              if(i==req.body.language.length-1)
              {
                console.log('here  here')
                resolve();
              }
            })
          })
        })
      }
    })
  }
  if(req.body.skill1)
  {
    Promise6=new Promise((resolve,reject)=>
    {
      skill.create({
        id:req.user.id,
        skill1:req.body.skill1,
        skill2:req.body.skill2,
        skill3:req.body.skill3,
        skill4:req.body.skill4,
        skill5:req.body.skill5,
        skill6:req.body.skill6,
        skill7:req.body.skill7
      },(error,skill)=>
      {
        User.findById(req.user.id,(err,user)=>
        {
          user.skill=skill._id;
          user.save()
          .then(resolve());
        })
      })

    })
  }
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
        job:req.body.job,
        location:req.body.location,
        link:req.body.link
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
  if(req.body.achievement)
  {
    await Achievement.clear(req.user._id);
    Promise4=new Promise((resolve,reject)=>
    {
      Achievement.create({
        id:req.user.id,
        achievement:req.body.achievement
      },(err,proj)=>
      {
        User.findById(req.user.id,(err,user)=>
        {
          user.achievement=proj._id;
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
    await edu.clearEdu(req.user.id);
    Promise3=new Promise((resolve,reject)=>
    {
      for(let i=0;i<req.body.school.length;i++)
      {
      edu.create({
        id:req.user._id,
        School:req.body.school[i],
        LocationOfSchool:req.body.LOCschool[i],
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
 Promise.all([
   Promise1,
  Promise2,
  Promise3,
  Promise4,
  Promise5,
  Promise6,
  Promise7,
  Promise8
])
 .then(async ()=>
  {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(process.env.pdfUrl+req.user.id, {
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

