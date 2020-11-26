const User = require('../models/user');

module.exports.home=function(req,res){
    return res.render('_homePage.ejs');
}

module.exports.display=function(req,res)
{
    User.findOne({email:req.body.email},function(err,user){
        if(!user)
        {
            return;
        }
        else
        {
            return res.render('_secondPage.ejs');
        }
    })
    
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