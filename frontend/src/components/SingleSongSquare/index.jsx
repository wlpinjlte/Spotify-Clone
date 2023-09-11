import { useState } from "react";

function SingleSongSquare(props){
    const [isHover,isHoverSet]=useState(false)

    const hoverHandler=(action)=>{
        if(action==='enter'){
            isHoverSet(prev=>true)
        }else{
            isHoverSet(prev=>false)
        }
    }

    return(<div className={`p-4 mt-3 flex flex-col rounded relative box-border`.concat(isHover? " lightGreyBackground":" singleSongBackground")} onMouseEnter={()=>{hoverHandler('enter')}} onMouseLeave={()=>{hoverHandler('leave')}}>
        <img className="rounded relative" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh_rKHjeMf86ZiodZ0OuVNFFVSn1Av9kGvw&usqp=CAU"></img>
        <h4>Name</h4>
        <span className="authorColor mb-4">By Author</span>
        {isHover&&<i className={`fa-solid fa-sharp fa-caret-right absolute top-1/2 rounded-full text-black playButtonColor w-14 h-14 text-center text-4xl`.concat(isHover? " animationIn":"")} style={{right:"10%"}}></i>}
    </div>)
}

export default SingleSongSquare;