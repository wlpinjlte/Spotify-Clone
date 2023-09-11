import { useState } from "react";

function SongRectangle(){
    const [isLiked,isLikedSet]=useState(false)
    const [isHover,isHoverSet]=useState(false)
    const hoverHandler=(action)=>{
        if(action==="Enter"){
            isHoverSet(true)
        }else{
            isHoverSet(false)
        }
    }
    return(<div className={`flex w-full text-white justify-between mt-3 p-2 rounded`.concat(isHover? " lightGreyBackground":"")} onMouseEnter={()=>{hoverHandler("Enter")}} onMouseLeave={()=>{hoverHandler("leave")}}>
        <div className="flex">
            <img className="w-14 h-14 rounded-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh_rKHjeMf86ZiodZ0OuVNFFVSn1Av9kGvw&usqp=CAU"></img>
            <span className="w-4 h-1 block"></span>
            <div className="flex flex-col">
                <h1 className="text-xl">Name</h1>
                <span className="text-base authorColor">by author</span>
            </div>
        </div>
        <i className={`fa-heart text-2xl `.concat(isLiked?"fa-solid":"fa-regular")} style={{lineHeight:"3.5rem"}} onClick={()=>{isLikedSet(prev=>(!prev))}}></i>
    </div>)
}

export default SongRectangle;