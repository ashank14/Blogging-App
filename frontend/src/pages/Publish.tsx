import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface publish{
    title:string;
    content:string;
}
function Publish() {
    const [input,setInput]=useState<publish>({
        title:"",
        content:"",
    });
    const [error,setError]=useState("");
    const navigate=useNavigate();

    async function sendreq() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User is not authenticated");
                return;
            }
    
            const response = await axios.post(
                'https://backend.ashanksethi.workers.dev/api/v1/blog/create',
                input,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setError(e.response?.data.error || "An unexpected error occurred");
            } else {
                setError("An unexpected error occurred");
            }
        }
    }
    
    return (
        <>
            <Header />
            <div className="flex flex-col py-6 px-4 font-bold text-4xl sm:px-14">
                <div>Publish a Blog...</div>
                <div className="mt-6">
                    <div className="text-xl font-semibold">Title</div>
                    <textarea
                        className="p-2 text-lg border border-gray-500 rounded-lg w-[80%] h-24 font-normal"
                        placeholder="Enter the title here..." onChange={(e)=>setInput({...input,title:e.target.value})}
                    />
                </div>
                <div className="mb-6">
                    <div>
                        <div className="text-xl font-semibold">Content</div>
                        <textarea
                            className="border border-gray-500 rounded-lg w-[80%] text-xl p-2 h-64 font-normal"
                            placeholder="Enter the content here..." onChange={(e)=>setInput({...input,content:e.target.value})}
                        />
                    </div>
                </div>
                <button type="button" className="w-[30%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={sendreq}>Post</button>
                <div className="font-light text-xl text-red-500">{error}</div>
            </div>
        </>
    );
}

export default Publish;
