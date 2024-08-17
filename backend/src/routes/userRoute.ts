import { Hono } from "hono";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/utils/jwt/jwt";
import  z  from "zod";
import { authMiddleware } from "../middlware/authmiddleware";
const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables : {
		user: string
	}
}>();

const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    username: z.string(),
});

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
userRouter.get('/getprofile',authMiddleware,async(c)=>{  
    const userid=c.get('user');
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    const user=await prisma.user.findUnique({
        where:{
            id:userid
        }
    });
    //@ts-ignore
    console.log(user.name);
    return c.json(user);

});
userRouter.post('/signup',async (c)=>{   
    const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body=await c.req.json();
    const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    const user=await prisma.user.findUnique({
        where:{
            email:body.email
        }
    });
    if(user){
        c.status(411);
        return c.json({error:"user already signed up"});
    }
    const newuser=await prisma.user.create({
        data:{
            email:body.email,
            password:body.password,
            name:body.username
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
