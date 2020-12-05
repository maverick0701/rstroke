const User = require('../models/user');
const fs = require('fs');
const Path = require('path');
const puppeteer = require("puppeteer");

module.exports.print=async function(req,res)
{
    
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("http://localhost:8030/users/profile/"+req.params.id, {
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

module.exports.profile=function(req,res)
{
  User.findById(req.params.id,function(err,user)
  {
    res.render('_secondPage.ejs',{
      user:user
    });
  })
  
}