const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        
    },
    image:{
        type:String,
       
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
});

const Product=mongoose.model("product",productSchema);

module.exports=Product;