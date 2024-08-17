import Blogcard from "../components/Blogcard";
import Header from "../components/Header";
import { useState,useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";


interface blog {
    id: string;              
    title: string;           
    content: string;        
    published: boolean;      
    author: {
        name: string;       
    };
}
function Home(){
    const [blogs,setBlogs]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://backend.ashanksethi.workers.dev/api/v1/blog/bulk');
                console.log(response.data);
                console.log(blogs);
                setBlogs(response.data);
                
                setLoading(false);
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    setError(e.response?.data.error || "An unexpected error occurred");
                } else {
                    setError("An unexpected error occurred");
                }
            }
        };

        fetchData();
    }, []);

    if (loading) {

        return <div>
                <Header/>
                <div className="flex flex-col justify-center w-[100%]">
                    <Loader/>
                    <Loader/>
                    <Loader/>
                    <Loader/>
                    <Loader/>
                    <Loader/>

                </div>
            </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return(
    <>
    <Header/>
    <div className="flex flex-col justify-center items-center">
    {blogs.map((blog:blog) => (
                <Blogcard 
                    id={blog.id}
                    authorname={String(blog.author.name)}
                    title={blog.title}
                    content={blog.content}
                    published={String(blog.published)}
                />
            ))}

    </div>
    </>);
}

export default Home;