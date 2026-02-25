import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js"
import cors from "cors"



//connect to mongodb database mongodb+srv://admin:<db_password>@cluster0.lzlrdvj.mongodb.net/?appName=Cluster0
const mongodbUrl = "mongodb+srv://admin:1234@cluster0.lzlrdvj.mongodb.net/?appName=Cluster0";

mongoose.connect(mongodbUrl).then(
    ()=>{
        console.log("connected to mongodb");
    }
).catch(err => console.log("mongo err",err));


const app = express()
const port = 3000

app.use(cors()) //to avoid blocking api calls 

app.use(express.json())




//middlewear that use to send user request to relevent routers
//catch the request, then read the token that come with request and include token details inside the request and pass the request
app.use((req,res,next)=>{
    const authorizationHeader = req.header("Authorization")//take the authorization header from the headers in request 
    //authorization header contain the token
    
    //if there is token, remove the Bearer part
    if (authorizationHeader!=null){
        const token = authorizationHeader.replace("Bearer ","")   
        jwt.verify(token,"secretKey96$2025",(error,content)=>{  //verify the token and get the content in the token
            
            if (content==null){
                console.log("invalid access")
                res.json({
                    message: "invalid token"
                })
                return  //if token is invalid, return...otherwise else part and next() will execute
            }
            else{
                console.log(content)
                req.user = content //if there is content in the token, include that content in req.user
                next()  //pass the request now, which contain the details in the token
            }
            
        })
    }
    else{
        next()// if there is no token, pass the request because it's a new sign up request 
    }
})






app.use("/api/users",userRouter)
app.use("/api/products",productRouter)




app.listen(port,()=>{
    console.log("server is running");
});
