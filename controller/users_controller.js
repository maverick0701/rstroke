const User = require('../models/user');
const edu=require('../models/edu');
const exp=require('../models/exp');
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
  // console.log(req.body,'of update');
  var dbList=new Array();
  dbList=Object.keys(req.body);
  dbList.forEach(async (key)=>
  {
    console.log(`${key}`);
    if(key=='education')
    {
      var edd=await edu.create({
        id:req.user,
        education:req.body.education
      });
      let user=await User.findById(req.user.id);
      user.education.push(edd.id);

      console.log(user.id);
      user.save();
    }
    else if(key=='experience')
    {
      var exx=await exp.create({
        id:req.user,
        Past_Experience:req.body.Past_Experience
      });
      let user=await User.findById(req.user.id);
      user.experience.push(exx.id);

      console.log(user.id);
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
