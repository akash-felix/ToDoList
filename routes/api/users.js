const express=require('express');
const router=express.Router();
const {check,validationResult} =require('express-validator');
const bcrypt=require('bcryptjs');
const User=require('../../models/User');
const jwt=require('jsonwebtoken');
const config=require('config');
//get user
router.post('/',[
    check('firstname','first name is required').notEmpty(),
    check('lastname','last name is required').notEmpty(),
    check('email','email is required').notEmpty(),
    check('mobilenumber','phone number is required').notEmpty(),
    check('password','password is required').notEmpty(),
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res
        .status(400)
        .json({errors:errors.array()})  
    }
    //user exists
    const {firstname,lastname,email,mobilenumber,password}=req.body;
    try {
        let user =await User.findOne({email});
        if(user){
            res
            .status(400)
            .json([{msg:'User already exists'}]);
        }
        //create new user
        user=new User({
            firstname,
            lastname,
            email,
            mobilenumber,
            password
        })
        //encrypt password
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        //sending jwttoken
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),
        {expiresIn:3600},(err,token)=>{
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

module.exports=router;