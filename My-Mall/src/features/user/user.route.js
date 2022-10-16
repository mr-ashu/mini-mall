const express=require("express");
const User = require("./user.model");

const app=express.Router();

app.post("/signup",async(req,res)=>{
    const {email,password,name,age}=req.body;
    let exist=await User.findOne({email});
    try {
        if(exist){
            res.status(404).send("user already exist")
        }

        let user= await User.create({
            email,
            password,
            name,
            age

        })
        res.send({token:`${user.email}_#_${user.password}`})
    } catch (error) {
        res.send(404).send(e.message)
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    let user=await User.findOne({email});
    try {
        
        if(user){
            if(password==user.password){
               res.send({
                token:`${email}_#_${password}`
               })

            }
            else{
                res.status(404).send(`Auth Failed,incorrect password`)
            }
        }
        else{
            res.send(404).send(`user with email:${email} not found`)
        }

      
        res.send({token:`${email}_#_${password}`})
    } catch (error) {
        res.send(404).send(e.message)
    }
})




module.exports=app;