import { createContext, useEffect, useState } from "react";
import { getAll } from "../../helpers/SongApi";
export const SongsContext=createContext()

function SongsProviader(props){
    const [songList,songListSet]=useState([])
    // const [currentSong,currentSongSet]=useState(null)
    let currentSong=null
    useEffect(()=>{
        const getSongs=async()=>{
            let response=await getAll()
            // console.log(response.data)
            songListSet(response.data)
            console.log(songList[0])
            currentSong=new Audio(`http://127.0.0.1:8000${songList[0].audioFile}`)
            currentSong.volume=0.1;
            setTimeout(()=>{currentSong.volume=1},10000)
            setTimeout(()=>{currentSong.play()},5000)
            
        }
        getSongs()
    },[])
    return(<SongsContext.Provider value={{songList:songList,currentSong:currentSong}}>
        {props.children}
    </SongsContext.Provider>)
}

export default SongsProviader;