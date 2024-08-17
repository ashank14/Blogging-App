import { useNavigate } from "react-router-dom";

interface cardinput{
    id:string;
    authorname:string;
    title:string;
    content:string;
    published:string
}

function Blogcard({id,authorname,title,content,published}:cardinput){
    const navigate=useNavigate();
    return <div className="my-6 w-[90%] flex-column cursor-pointer custom-950:w-[50%]" onClick={()=>{
        navigate(`/Blog/${id}`)
    }}>
        <div className="flex flex-row items-center">
            <div className="flex items-center">
                <div className="rounded-full border border-black w-8 h-8 flex items-center justify-around mr-2 font-bold bg-black text-white">{authorname[0]}</div>
                <div className="font-semibold">{authorname}</div>
            </div>
            <div className="ml-6 font-light">{published}</div>
        </div>
        <div className="font-bold text-2xl py-2">{title}</div>
        <div className="font-normal">{content.slice(0,150)+"..."}</div>
    </div>
}

export default Blogcard;