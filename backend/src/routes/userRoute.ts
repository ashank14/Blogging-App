import { Hono } from "hono";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/utils/jwt/jwt";
const userRouter=new Hono();


userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    const body=await c.req.json();
    const existingUser= await prisma.user.findUnique({
        where:{
            email:body.email
        }
    });
    if(!existingUser){
        return c.json({error:"user doesn't exist"});
    }
    //@ts-ignore
    const token=await sign(existingUser.id,c.env.JWT_SECRET);
    
    return c.json({
        jwt:token,
        userId:existingUser.id,
        message:"signed in"
    });

})

userRouter.post('/signup',async (c)=>{   
    const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body=await c.req.json();
    const user=await prisma.user.findUnique({
        where:{
            email:body.email
        }
    });
    if(user){
        return c.json({error:"user already signed up"});
    }
    const newuser=await prisma.user.create({
        data:{
            email:body.email,
            password:body.password,
        }
    });
    //@ts-ignore
    const token=await sign(newuser.id,c.env.JWT_SECRET);
    
    return c.json({
        jwt:token,
        userId:newuser.id,
    });
})

export default userRouter;
