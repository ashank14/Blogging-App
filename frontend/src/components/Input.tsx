import { ChangeEvent } from "react";


interface labelType{
    label:string;
    fn:(e:ChangeEvent<HTMLInputElement>)=>void
}
function Input({label,fn}:labelType){
    return(
        <div className="py-2 px-2 flex-column">
            <div className="py-2 font-semibold">{label}</div>
            <div>
                <input className="w-[100%] h-12 bg-transparent border border-gray-500 rounded-lg" onChange={fn}/>
            </div>
        </div>
    )
}

export default Input;