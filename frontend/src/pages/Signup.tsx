import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";

import axios from "axios";

function Signup(){
    interface user{
        username:string;
        email:string;
        password:string;
    }
    const [input,setInput]=useState<user>({
        username:"",
        email:"",
        password:""
    });
    const [error,setError]=useState("");
    const navigate=useNavigate();

    async function sendreq() {
        try {
            const response = await axios.post('https://backend.ashanksethi.workers.dev/api/v1/user/signup', input); // Removed extra object wrapping `input`
            const token = response.data.jwt;
            localStorage.setItem("token", token);
            navigate('/Home');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setError(e.response?.data.error || "An unexpected error occurred");
            } else {
                setError("An unexpected error occurred");
            }
        }
    }
    return(
    <div className="flex items-center justify-around align-center w-full h-screen">
        <div className="w-[90%] px-6 py-12 h-[60%] flex-column justify-around items-center sm:w-[60%] lg:w-[35%] h-[70%]">
            <div className="flex justify-around font-semibold text-3xl py-2">Create an Account</div>
            <div className="flex items-center justify-around font-light"><div>Already have an Account? <Link to="signin">Signin</Link></div></div>
            <Input label="Username" fn={(e)=>{setInput({...input,username:e.target.value})}}/>
            <Input label="E-Mail" fn={(e)=>{setInput({...input,email:e.target.value})}}/>
            <Input label="Password" fn={(e)=>{setInput({...input,password:e.target.value})}}/>
            <div className="flex items-center justify-around px-2 py-4">
               <button type="button" className="w-[100%] text-white bg-black hover:bg-black focus:outline-none focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-12" onClick={sendreq}>Signup</button> 
            </div>
            {error?<div>{error}</div>:null}
        </div>
    </div>
)
}

export default Signup;