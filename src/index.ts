import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ContentModel, UserModel } from './db';

import { JWT_Password } from './config';
import { userMiddleware } from './Middleware';

const app = express(); 
app.use(express.json());


app.post("/api/v1/signup",async (req,res)=>{

    try{const username = req.body.username; 
        const password = req.body.password;
    
        UserModel.create({
            username : username,
            password : password
        })
    
        res.json({
            message : "user signed up"
        })}
        catch(err){
            res.status(411).json({
                message : "user already exists"
            })
        }
})

app.post("/api/v1/signin",async(req,res)=>{
     const username = req.body.username;
     const password = req.body.password;

     const existingUser =await UserModel.findOne({
          username , 
         password
     });
    if (existingUser){
        const token = jwt.sign({ id: existingUser._id }, JWT_Password);
        res.json({
            token
           })  
    }
        
    else{
        res.status(411).json({
            message : "incorrect credentials"
        })
    }
    
})
 
app.post("/api/v1/content",userMiddleware,async(req,res)=>{
    ContentModel.create({
        title : req.body.title,
        link : req.body.link,
        tags : [],
        //@ts-ignore
        userId : req.userId
    })
     res.json({
        message : "content added"
    })
})

//asking for content 
app.get("/api/v1/content",userMiddleware, async (req,res)=>{
   //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find(
        {userId : userId}).populate("userId","username");
   
    res.json({
        content
    }) 

})

app.delete("/api/v1/content",userMiddleware,async(req,res)=>{
    const contentId = req.body.contentId; 
    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId : req.userId 
      })
      res.json({
        message : "content deleted"
      })
})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:shareLink",(req,res)=>{

})

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})