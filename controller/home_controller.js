const User = require('../models/user');
const Form=require('../models/pdfForm');
const puppeteer = require("puppeteer");
const path = require('path');
const { format } = require('path');
const todays_date = new Date();
module.exports.home=function(req,res){
    // console.log('*******',__dirname);
    // path1= `${path.join(__dirname,'..' ,'fileStorage')}`;
    // console.log(path1);
    // Form.findOne({id:1},function(err,form)
    // {
    //     console.log(form.numTrue);
    // })
    return res.render('_homePage.ejs');
}

module.exports.display=function(req,res)
{
    return res.redirect('/'); 
}


module.exports.create = function(req, res){
    console.log(req.body,"**********************");
   
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            }, function(err, user){
                if(err){
                    console.log(error,"at line 26");
                    return;
                }

                return res.redirect('/');
            })
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.destroySession = function(req, res){
    req.logout();
    // req.flash('success', 'You have logged out!');


    return res.redirect('/');
} 

module.exports.second=function(req,res)
{
    return res.render('_secondPage.ejs')
}

keyOperation=(keys,form)=>{
    let id1=keys.indexOf("_id");
    keys.splice(id1,1);
    let id2=keys.indexOf("id");
    keys.splice(id2,1);
    let id3= keys.indexOf("numTrue");
    keys.splice(id3,1);
    keys.forEach((key,index)=>
    {
        if(form[key]==false)
        {
            keys.splice(index,1);
        }
    })
   return keys;
}

module.exports.third= async function(req,res)
{
    let form=await Form.findOne({id:1});
    let keys = Object.keys(form._doc);
    let allKeys = Object.keys(form._doc);
    let numTrue=form.numTrue;
    keys=await keyOperation(keys,form);
    return res.render('_thirdPage.ejs',{
        form:form,
        keys:keys,
        allKeys:allKeys,
        numTrue:numTrue
    })
}