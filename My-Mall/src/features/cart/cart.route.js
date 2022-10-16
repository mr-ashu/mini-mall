const express=require("express");
const Product = require("../product/product.model");
const User = require("../user/user.model");
const Cart = require("./cart.model");

const app=express.Router();

const authmiddleware=async (req,res,next)=>{
    let token=req.header.token;
    if(!token){
        return res.send("token not found")
    }
    const [email,password]=token.split("_#_");
    try {
        let user= await User.findOne({email});
        if(user){
            if(password===user.password){
                req.userId=user.id;
                next()
            }
            else{
                res.status(404).send(`Auth Failed,incorrect password`)
            }
        }
        else{
            res.send(404).send(`user with email:${email} not found`)
        }
    } catch (error) {
        res.status(404).send(e.message)
        
    }
}

app.use(authmiddleware)

app.post("/",async(req,res)=>{
    try {
        let product=await Product.findById(req.body.product);
        if(product.quantity>req.body.quantity){
            let cart=await Cart.create({
                ...req.body,
                user:req.userId
            });
            res.send(cart)

            await Product.findByIdAndUpdate(product.id,{
                quantity:product.quantity-cart.quantity
            })
        }
        else{
            res.send("fronted only:product.quantity ammount left")
        }
    } catch (error) {
        res.status(400).send(e.message)
    }
})



module.exports=app;