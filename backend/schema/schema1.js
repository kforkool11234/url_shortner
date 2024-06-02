import mongoose from "mongoose"
import shortid from "shortid"
const surlSchema= new mongoose.Schema({
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
    scam:{
        type: Number,
        default: 0
    },
    DateTime:{
        type: Date,
        default: Date.now
    }
})
surlSchema.index({ DateTime: 1 }, { expireAfterSeconds: 86400 });
export default mongoose.model("surl1",surlSchema)