import { Router } from "express";
import zod from "zod";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import authMiddleware  from "../../middleware"

const prisma = new PrismaClient();
const router = Router();

const updateBody = zod.object({
    name: zod.string(),
    password : zod.string().min(8).max(32)
})

router.put("/update",authMiddleware,(req,res)=>{
  
     const account = prisma.user.findFirst({
        where:{
            id: req.id
        }
         }
       
     )

})
