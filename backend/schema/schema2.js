import mongoose from "mongoose"
import shortid from "shortid"
const surlSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    full:{
        type: String,
        required:true
    },
    short:{
        type: String,
        required: true,
        default: shortid.generate
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    },
    DateTime:{
        type: Date,
        default: Date.now
    },
    scam:{
        type: Number,
        default: 0
    } ,
    report:{
        type: Boolean,
        default:false
    }
})
export default mongoose.model("surl2",surlSchema)