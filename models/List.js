const mongoose=require('mongoose');

const ListSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'    
    },
    name:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    listname:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('list',ListSchema);