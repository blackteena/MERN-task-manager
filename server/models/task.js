import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title: {
        required:true,
        type:String
    },
    completed:{
        type:Boolean,
        default: false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

export default mongoose.model('Task', taskSchema)

