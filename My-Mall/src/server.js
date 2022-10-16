require("dotenv").config();
const express=require("express");
const cors =require("cors");
const connect=require("./config/db")
const userRoute=require("./features/user/user.route");
const productRoute=require("./features/product/product.route");
const cartRoute=require("./features/cart/cart.route");
let PORT =process.env.PORT;

const app=express();
app.use(express.json());
app.use(cors());

app.use("/user",userRoute)
app.use("/products",productRoute)
app.use("/cart",cartRoute)

app.listen(PORT,async()=>{
   await connect()
    console.log(`Running on http://localhost:${PORT}`)
})