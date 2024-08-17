import { Hono } from "hono";
import { authMiddleware } from "../middlware/authmiddleware";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import z from 'zod'

const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables : {
		user: string
	}
}>();
blogRouter.get('/hello',async (c)=>{
    
    return c.json({
        id:"hello"
    })

});
const bloginput = z.object({
    title: z.string(),
    content: z.string(),
});


blogRouter.post('/create',authMiddleware,async (c)=>{
    console.log("hello");
    const body=await c.req.json();
    const { success } = bloginput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    const userid=c.get('user');
    console.log(userid);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
    const post=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userid
        }
    });
    return c.json({
        id:post.id,
        title:body.title
    })

});

blogRouter.put('/update',authMiddleware,async (c)=>{
    const body=await c.req.json();
    const userid=c.get('user');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
    const update=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
            authorId:userid
        }
    });

    return c.json({msg:"updated"});
    
})

blogRouter.get('/getpost/:id', async (c) => {
    console.log("post");
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		},select:{
            content:true,
            title:true,
            author:{
                select:{
                    name:true
                }
            }
        }
	});

	return c.json(post);
});

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

	return c.json(posts);
})
export default blogRouter;
 