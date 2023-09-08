import { useState } from "react";

function SmallSongSquare(props){
    const [isHover,isHoverSet]=useState(false)
    const hoverHandler=(action)=>{
        // console.log(isHover)
        if(action==="Enter"){
            isHoverSet(prev=>true)
        }else{
            isHoverSet(prev=>false)
        }
    }
    return(<div className={`w-full mt-2 flex p-2 rounded-md cursor-pointer `.concat(isHover?"lightGreyBackground":"")} onMouseEnter={()=>hoverHandler("Enter")} onMouseLeave={()=>hoverHandler("Leave")}>
        <img className="w-14 h-14 rounded-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh_rKHjeMf86ZiodZ0OuVNFFVSn1Av9kGvw&usqp=CAU"></img>
        <span className="w-4 h-1 block"></span>
        <div className="flex flex-col">
            <h1 className="text-xl">Name</h1>
            <span className="text-base authorColor">by author</span>
        </div>
    </div>)
}

export default SmallSongSquare;