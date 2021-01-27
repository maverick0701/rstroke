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


module.exports.update=async function(req,res)
{
  
  var dbList=new Array();
  dbList=Object.keys(req.body);
  user=await User.find({_id:req.user._id});
  User.splashUser(user);
  dbList.forEach(async (key)=>
  {
    
    if(key=='school')
    {
      await edu.clearEdu(req.user.id);
      for(let i=0;i<req.body.school.length;i++)
      {
      var edd=await edu.create({
        id:req.user._id,
        School:req.body.school[i],
        LocationOfSchool:req.body.LOCschool[i],
        yearOfStart:req.body.Sdate[i],
        endYear:req.body.Edate[i],
        fieldOfStudy:req.body.foe[i]
      });
      let user=await User.findById(req.user.id);
      user.education.push(edd.id);
      user.save();
    }
      
      
    }
    else if(key=='Past_Experience')
    {
      await exp.clearExp(req.user.id);
      var exx=await exp.create({
        id:req.user,
        experience:req.body.Past_Experience
      });
      let user=await User.findById(req.user.id);
      user.experience.push(exx.id);
      user.save();
    }
    else if(key=='project')
    {
      await Project.spalshArray(req.user.id);
      var proj=await Project.create({
        id:req.user,
        project:req.body.project
      });
      let user=await User.findById(req.user.id);
      user.project.push(proj.id);
      user.save();
    }
    else if(key=='aboutme')
    {
      await abbbMe.clearAbme(req.user.id);
      var abbMe=await abbbMe.create({
        id:req.user,
        aboutMe:req.body.aboutme
      });
      let user=await User.findById(req.user.id);
      user.abMe=abbMe.id;
      user.save();
    }
    else if(key=='profile')
    {
      var prof=await Profile.create({
        id:req.user.id,
        profile:req.body.profile
      })
      let user=await User.findById(req.user.id);
      user.profile=prof.id;
      user.save();
    }
   })
  res.redirect('back');
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
