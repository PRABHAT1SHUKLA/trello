import { Router } from 'express';
import jwt from 'jsonwebtoken';
import zod from 'zod'
import { PrismaClient } from '@prisma/client';


const JWT_SECRET = "12345"
const router = Router();
const prisma = new PrismaClient();

const signinbody = zod.object({
    email  :    zod.string(),
    password :   zod.string().min(8).max(32)
})

router.post("/signin", async(req, res) => {
  const { email,password } = req.body;

  const {success} = await signinbody.safeParse(req.body) 

  if(success){
    
    const  registered = await prisma.user.findFirst({
        where:{
            email: email
        }
    })

    if(registered){
        const userId = registered.id;

        const token = await jwt.sign(
            {userId}, JWT_SECRET
        )

        return res.status(200).json({
            message:`welcome ${registered.name}` ,
            token : token
        })
    }

    else {
        return res.status(401).json({
          message:"user doesn't exists . Kindly log in."

         })
    }}


    else{

        return res.status(411).json({message:"Invalid inputs"})

    }
    
  }
);

export default router;
