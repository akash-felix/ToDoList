const mongoose=require('mongoose');

const ListSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'    
    },
    name:{
        type:String
    },
    item: {
            type: String,
            open:{type:Boolean, default:true}
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('list',ListSchema);