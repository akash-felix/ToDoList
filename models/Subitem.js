const mongoose=require('mongoose');
const SubitemSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'list'
    },
    name:{
        type:String
    },
    text:{
        type:String,
        open:{type:Boolean, default:true}
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('subitem',SubitemSchema);