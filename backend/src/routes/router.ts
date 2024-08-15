import { Hono } from "hono";
import userRouter from "./userRoute";
import blogRouter from "./blogRoute";

const mainrouter=new Hono();

mainrouter.get('/',(c)=>{
    return c.text("hello");
})

mainrouter.route('/user',userRouter);
mainrouter.route('/blog',blogRouter);

export default mainrouter;