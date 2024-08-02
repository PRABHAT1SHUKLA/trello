import { Router } from "express";
import zod from "zod";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"


const JWT_SECRET = "12345"
const prisma = new PrismaClient();

const router= Router();
 
const signupbody = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8).max(32)
    
}) 


router.post("/signup",async(req,res) =>{
    const { name, email, password}= req.body;
  console.log(req.body)
  const {success} = signupbody.safeParse(req.body);
  console.log(success)
  if(!success){
    return res.status(400).json({
        message:"invalid request body/pirated email"
    })
  }

  const existingUser = await prisma.user.findFirst({
    where:{
        email: req.body.email
    }
  })
  if(existingUser){
    return res.status(400).json({
        message:"email already in use"
    })
  }
 else{
    try{
        const user = await prisma.user.create({
            data:{
                name: name,
                email: email,
                password:password,
                 }
        })
        
        const userId = user.id;
        const token = jwt.sign({userId},JWT_SECRET)
    
        return res.status(200).json({
            msg:"user was created successfully",
            jsontoken:token      
        })
       }
       catch(err){
        return res.status(411).json({
            msg:"there was an error creating user"
        })
       }
       
 }
   


})


export default router;