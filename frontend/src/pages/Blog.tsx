import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";

interface BlogInterface {
    author: {
        name:string
    };
    title: string;
    content: string;
}

function Blog() {
    const { id } = useParams(); 
    const [blog, setBlog] = useState<BlogInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend.ashanksethi.workers.dev/api/v1/blog/getpost/${id}`);
                console.log(response.data);
                setBlog(response.data); 
                setLoading(false);
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    setError(e.response?.data.error || "An unexpected error occurred");
                } else {
                    setError("An unexpected error occurred");
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header />
            {blog && (
                <div className="flex justify-around items-center mt-6">
                    <div className="flex flex-col w-[94%] gap-4 lg:w-[60%]">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center">
                                <div className="flex items-center justify-around rounded-full bg-black w-8 h-8 text-white">{blog.author.name[0]}</div>
                                <div className="ml-2 font-normal">{blog.author.name}</div>
                            </div>
                            <div className="text-3xl font-semibold flex flex-col gap-1">
                                <div>{blog.title}</div>
                                <div className="text-base font-normal text-gray-500">Posted on 16 Aug, 2024</div>
                            </div>
                        </div>
                        <div className="text-xl font-normal">
                            {blog.content}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Blog;
