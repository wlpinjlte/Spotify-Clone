import { useState,useContext } from "react";
import { SongsContext } from "../../providers/SongsProvider";
import { URL } from "../../helpers/SongApi";
function SongNavbar(){
    const {currentSong,changeVolume,pauseMusic,playMusic,currentSongDetails}=useContext(SongsContext)
    const [isLiked,isLikedSet]=useState(false)
    const [volume,volumeSet]=useState(50)
    const [isPlaying,isPlayingSet]=useState(true)
    const [lastVolume,lastVolumeSet]=useState(50)
    const inputHandler=(event)=>{
        volumeSet(prev=>(event.target.value))
        changeVolume(volume)
    }
    const isPlayingHandler=()=>{
        if(isPlaying){
            pauseMusic()
        }else{
            playMusic()
        }
        isPlayingSet(prev=>(!prev))
    }
    const muteHandle=()=>{
        if(volume!==0){
            lastVolumeSet(volume);
            volumeSet(0)
            changeVolume(0)
        }else{
            volumeSet(lastVolume)
            changeVolume(lastVolume)
        }
        
    }
    return(<>{currentSongDetails&&<div className="w-full flex pb-1 p-3 text-white justify-between">
        <div className="flex sm:w-1/3">
            <img className="w-14 h-14 rounded-md object-cover" src={`${URL}${currentSongDetails.image}`}></img>
            <span className="w-4 h-1 block"></span>
            <div className="flex flex-col">
                <h1 className="text-xl">{currentSongDetails.title}</h1>
                <span className="text-base authorColor">by {currentSongDetails.author}</span>
            </div>
            <span className="w-4 h-1 block"></span>
            <i className={`fa-heart text-2xl `.concat(isLiked?"fa-solid":"fa-regular")} style={{lineHeight:"3.5rem"}} onClick={()=>{isLikedSet(prev=>(!prev))}}></i>
        </div>
        <div className="flex w-1/3 justify-center text-4xl items-center" >
            <i className="fa-solid fa-backward-step hover:text-neutral-400" ></i>
            {isPlaying?<i className={`fa-solid fa-circle-pause mx-5 `.concat(isPlaying?"clickAnimIn":"")} onClick={isPlayingHandler}></i>:<i className={`fa-solid fa-circle-play mx-5 `.concat(isPlaying?"":"clickAnimOut")} onClick={isPlayingHandler}></i>}
            <i className="fa-solid fa-forward-step hover:text-neutral-400" ></i>
        </div>
        <div className="flex w-1/3 justify-end items-center text-2xl hidden sm:flex">
            {volume==0?<i className="fa-solid fa-volume-xmark mr-3" onClick={muteHandle}></i>:<i className="fa-solid fa-volume-high mr-3" onClick={muteHandle}></i>}
            <input type="range" style={{margin:"0"}} max="100" min="0" value={volume} onChange={(event)=>{inputHandler(event)}}/>
        </div>
    </div>}</>)
}

export default SongNavbar;