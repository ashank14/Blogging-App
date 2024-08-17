

function Loader(){
    return(
        <><div className="my-6 w-[90%] flex-column cursor-pointer custom-950:w-[50%]" >
            <div className="flex flex-row items-center">
                <div className="flex items-center">
                    <div className="rounded-full  w-8 h-8 flex items-center justify-around mr-2 font-bold bg-gray-200 text-white"><div className="h-2.5 bg-gray-200 rounded-full "></div></div>
                    <div className="font-semibold"><div className="h-2 bg-gray-200 rounded-full "></div></div>
                </div>
                <div className="ml-6 font-light"><div className="h-2 bg-gray-200 rounded-full"></div></div>
            </div>
            <div className="font-bold text-2xl py-2">    <div className="h-2 bg-gray-200 rounded-full "></div>
</div>
            <div className="font-normal">    <div className="h-2 bg-gray-200 rounded-full "></div><div role="status" className="max-w-sm animate-pulse">
    
    
    
    <div className="h-2 bg-gray-200 rounded-full"></div>
    <span className="sr-only">Loading...</span>
</div></div>
</div>
        </>)



}

export default Loader;