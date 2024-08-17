import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';

function Header() {
    const [user, setUser] = useState<string>("");
    const [mode, setMode] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://backend.ashanksethi.workers.dev/api/v1/user/getprofile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.name); 
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

    useEffect(() => {
        // Load mode from localStorage
        const storedMode = localStorage.getItem('mode');
        if (storedMode !== null) {
            const isDarkMode = storedMode === 'true'; 
            setMode(isDarkMode);
            document.body.classList.toggle('dark', isDarkMode);
        }
    }, []);

    const toggleMode = () => {
        const newMode = !mode;
        setMode(newMode);
        localStorage.setItem('mode', newMode.toString()); 
        document.body.classList.toggle('dark', newMode);
        console.log('Mode:', newMode); // Debugging
        console.log('Body classList:', document.body.classList); 
    };
    if(error){
        return(<>{error}</>)
    }

    return (
        <div className="flex items-center py-6 px-4 justify-between border border-b-gray-300 sm:px-11">
            <div className="flex font-semibold text-3xl items-center">
                <div className="hidden mr-2 sm:flex">
                    {mode?<div className="rounded-full w-6 h-6 bg-white"></div>:<div className="rounded-full w-6 h-6 bg-black"></div>}
                    {mode?<div className="rounded-full w-8 h-8 bg-white"></div>:<div className="rounded-full w-8 h-8 bg-black"></div>}
                </div>
                <Link to="/Home">
                    <div>Medium</div>
                </Link>
            </div>
            <div className="flex items-center">
                <div className="rounded-full w-12 h-12 border border-black flex items-center justify-around font-normal bg-black text-white mr-4 mb-2">{user[0]}</div>
                <div>
                    <Link to="/publish">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Publish
                        </button>
                    </Link>
                </div>
                <div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={mode}
                            onChange={toggleMode}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Header;
