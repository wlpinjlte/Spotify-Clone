import { useState } from "react";

function SongNavbar(){
    const [isLiked,isLikedSet]=useState(false)
    const [volume,volumeSet]=useState(50)
    const [isPlaying,isPlayingSet]=useState(true)
    const inputHandler=(event)=>{
        volumeSet(prev=>(event.target.value))
        // console.log(volume)
    }
    const isPlayingHandler=()=>{
        isPlayingSet(prev=>(!prev))
    }
    return(<div className="w-full flex pb-1 p-3 text-white justify-between">
        <div className="flex w-1/3">
            <img className="w-14 h-14 rounded-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh_rKHjeMf86ZiodZ0OuVNFFVSn1Av9kGvw&usqp=CAU"></img>
            <span className="w-4 h-1 block"></span>
            <div className="flex flex-col">
                <h1 className="text-xl">Name</h1>
                <span className="text-base authorColor">by author</span>
            </div>
            <span className="w-4 h-1 block"></span>
            <i className={`fa-heart text-2xl `.concat(isLiked?"fa-solid":"fa-regular")} style={{lineHeight:"3.5rem"}} onClick={()=>{isLikedSet(prev=>(!prev))}}></i>
        </div>
        <div className="flex w-1/3 justify-center text-4xl items-center" >
            <i className="fa-solid fa-backward-step" ></i>
            {isPlaying?<i className={`fa-solid fa-circle-pause mx-5 `.concat(isPlaying?"clickAnimIn":"")} onClick={isPlayingHandler}></i>:<i className={`fa-solid fa-circle-play mx-5 `.concat(isPlaying?"":"clickAnimOut")} onClick={isPlayingHandler}></i>}
            <i className="fa-solid fa-forward-step" ></i>
        </div>
        <div className="flex w-1/3 justify-end items-center text-2xl">
            {volume==0?<i className="fa-solid fa-volume-xmark mr-3"></i>:<i className="fa-solid fa-volume-high mr-3" onClick={()=>{volumeSet(0)}}></i>}
            <input type="range" style={{margin:"0"}} max="100" min="0" value={volume} onChange={(event)=>{inputHandler(event)}}/>
        </div>
    </div>)
}

export default SongNavbar;