const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const List =require('../../models/List');
const {check,validationResult}=require('express-validator');
const User = require('../../models/User');
//const Subitem=require('../../models/Subitem');
//create a list
router.post('/',auth,[
    check('item','item name is required').notEmpty()
    //check('subitem','Provide a item').notEmpty()
],async(req,res)=>{
        const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res
        .status(500)
        .json({errors:errors.array()});
    }
    try {
        const user=await User.findById(req.user.id).select('-password');
        const newList=new List({
            user:req.user.id,
            name:req.user.name,
            item:req.body.item,
        });
            const list=await newList.save()
        res.json(list);
        
    } catch (err) {
        console.error(err.message);
        res
        .status(500)
        .send('Server Error')
    }
});

//get all list of a user
router.get('/',auth,async(req,res)=>{
    try {
        const lists =await List.find().sort({date:-1});
        //const subitems=await Subitem.find().sort({date:-1});
        res
        .json({lists});
    } catch (err) {
        console.error(err.message);
        res
        .status(500)
        .send('Server Error')

    }
});
//get list by id
router.get('/:id',auth,async(req,res)=>{
    try {
        const list=await List.findById(req.params.id);
        if(!list){
            return res
            .status(404)
            .json({msg:'list does not exist'})
        }
        res.json(list);
    } catch (err) { 
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
//edit a list 

router.put('/:id',
[
    check('item','Provide a content').notEmpty()
],auth,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res
        .status(400)
        .json(({errors:errors.array()}));
    }
    try {
        const list=await List.findByIdAndUpdate(req.params.id,{$set:req.body},
            function(err,list){
                if(err){
                    return res
                    .status(404)
                    .json({msg:'list not found'});
                }
            });
        await list.save();
        res.json(list);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
router.delete('/:id',auth,async(req,res)=>{
    try{
    const list=await List.findById(req.params.id);
    if(list.user.toString()!==req.user.id){
        return res
        .status(401)
        .json({msg:'Not authorized'})
    }
    await List.remove(list);
    res.json('Post removed')
    }
    catch(err){
        console.error(err.message);
        if(err.kind==='ObjectId'){
            return res
            .status(404)
            .json({msg:'Post not found'});
        }
        res
        .status(500)
        .json('Server Error');
    }
    }
);
module.exports=router;