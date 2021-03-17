const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const List =require('../../models/List');
const {check,validationResult}=require('express-validator');
const User = require('../../models/User');
//create a list
router.post('/',[
    check('content','Provide a content').notEmpty(),
    check('listname','list name is required').notEmpty()
],auth,async(req,res)=>{
        const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res
        .status(500)
        .json({errors:errors.array()});
    }
    try {
        const user=await User.findById(req.user.id).select('-password');
        const list=new List({
        content:req.body.content,
        name:user.firstname,
        user:req.user.id,
        listname:req.body.listname
    }) ;
        await list.save();
        res.json({list});
        
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
})
//edit a list 
router.put('/:id',
[
    check('content','Provide a content').notEmpty(),
    check('listname','list name is required').notEmpty()
],auth,async(req,res)=>{
    const {
        content,
        listname
    }=req.body
    const newList={
        content,listname
    }
    try {
        const list=await List.findOneAndUpdate(req.params.id);
        if(!list){
            return res
            .status(404)
            .json({msg:'list not found'});
        }
        {newList.content=content
        newList.listname=listname}
        await list.save();
        res.json(list);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
module.exports=router;