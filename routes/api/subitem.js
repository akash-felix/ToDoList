const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const List =require('../../models/List');
const {check,validationResult}=require('express-validator');
const User = require('../../models/User');
const Subitem=require('../../models/Subitem');
//create a subitem
router.post('/',auth,[
    check('text','text is required').notEmpty()
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res
            .status(400)
            .json({errors:errors.array()});
    }
    try {
        const user=await User.findById(req.user.id).select('-password');
        const list=await List.findById(req.params.id);
        if(list){
        const newsubitem=new Subitem({
            text:req.body.text,
            name:user.name,
            user:req.user.id,
            item:req.params.id            
        })
        const subitem=await newsubitem.save();
        res.json(subitem);
    }
    res.send('error'); 
    } catch (err) {
        console.error(err.message);
        res
        .status(500)
        .send('Server Error')
    }
});
//edit subitems
/*router.put('/edit/:id',
[
    check('text','Provide a content').notEmpty()
],auth,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res
        .status(400)
        .json(({errors:errors.array()}));
    }
    try {
        const subitem=await Subitem.findByIdAndUpdate(req.params.id,{$set:req.body},
            function(err,subitem){
                if(err){
                    return res
                    .status(404)
                    .json({msg:'subitem not found'});
                }
            });
        await subitem.save();
        res.json(subitem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});*/
module.exports=router