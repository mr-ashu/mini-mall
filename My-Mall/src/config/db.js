const mongoose =require("mongoose")
const connect =async()=>{
    return mongoose.connect(process.env.URL)
}

module.exports=connect