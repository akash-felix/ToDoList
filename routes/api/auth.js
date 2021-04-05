const express=require('express');
const nodemailer = require("nodemailer");
const crypto=require('crypto');
const router=express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const config=require('config');
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
const {check,validationResult}=require('express-validator');
//getauth showing user once logged in 
router.get('/',auth,
async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password');
        res
        .json(user);
    } catch (err) {
        console.error(err.message);
        res
        .status(500)
        .send('Server Error');
    }
});
//log in user 
//post
router.post('/',
[
    check('email','Please include a valid email').isEmail(),
    check('password','Enter a password').exists()
],async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
      return res
      .status(400)
      .json({errors:errors.array()});
  } 
  const {email,password}=req.body; 
    try {
        let user=await User.findOne({email});
        if(!user){
            return res
            .status(400)
            .json({ errors:[{msg:'Invalid Credentials'}]});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res
            .status(400)
            .json({errors:[{msg:'Invalid Credentials'}]}); 
        }
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),
        {expiresIn:3600000},
        (err,token)=>{
            if(err) throw err;
            res.json({token});
        });
    } catch (err) {
        console.error(err.message);
        res
        .status(500)
        .send('Server Error')
    }
});
router.post('/forget_password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err);
        }
        const token=buffer.toString('hex');
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res .status(422).json({error:'USer does not exists'})
            }
            user.resetToken=token
            user.expireToken=Date.now()+36000000
            user.save().then((result=>{
                let transporter = nodemailer.createTransport({
                    service:'gmail',
                    auth: {
                      user: 'industriesak23@gmail.com',
                      pass: 'indus33321', // generated ethereal password
                    }
                  });
                transporter.sendMail({
                    to:user.email,
                    from:'industriesak23@gmail.com',
                    subject: "Password Reset", 
                    text: "Hello world?",
                    html: `<p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/api/auth/${token}">link</a> to reset password</h5>`,
                })
                res.json({message:'Check your email'})
            }))
        })
    })    
});
router.post('/new_password',(req,res)=>{
    const newPassword=req.body.password;
    const sentToken=req.body.token;
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res
            .status(422)
            .json({error:'Try again session expired'})
        }
        bcrypt.hash(newPassword,10).then(hashedpassword=>{
            user.password=hashedpassword
            user.resetToken=undefined
            user.expireToken=undefined
            user.save().then((saveduser)=>{
                res.json({message:'password updated success'})
            })
        })
    })
})
// create reusable transporter object using the default SMTP transport
  
module.exports=router;