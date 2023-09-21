import { createContext, useEffect, useState } from "react";
import { getAll, getOne } from "../../helpers/SongApi";
import { URL } from "../../helpers/SongApi";
export const SongsContext=createContext()

function SongsProviader(props){
    const [songList,songListSet]=useState([])
    const [currentSongDetails,currentSongDetailsSet]=useState(null)
    const [currentSong,currentSongSet]=useState(null)
    const [queue,queueSet]=useState([])
    useEffect(()=>{
        const getSongs=async()=>{
            let response=await getAll()
            songListSet(response.data)
            queueSet(response.data)
        }
        getSongs()
    },[])
    useEffect(()=>{
        if(currentSong){
            currentSong.volume=0.5
            currentSong.play()
            currentSong.addEventListener("ended",()=>{
                let song=queue[0]
                if(song){
                    setSong(song.id)
                    queueSet(prev=>(queue.filter(song=>song.id!==currentSongDetails.id).slice(1)))
                }
            })
        }
    },[currentSong])
    const setSong=async(id)=>{
        console.log(currentSong)

        let response=await getOne(id)
        let data=response.data
        if(data){
            if(currentSong){
                currentSong.src=`${URL}${data.audioFile}`
                currentSong.load()
                currentSong.play()
            }else{
                currentSongSet(new Audio(`${URL}${data.audioFile}`))
            }
            currentSongDetailsSet(prev=>data)
        }
    }
    const changeVolume=(volume)=>{
        currentSong.volume=volume/100
    }
    const pauseMusic=()=>{
        currentSong.pause()
    }
    const playMusic=()=>{
        currentSong.play()
    }
    
    return(<SongsContext.Provider value={{
        songList:songList,
        currentSong:currentSong,
        currentSongDetails:currentSongDetails,
        changeVolume:changeVolume,
        pauseMusic:pauseMusic,
        playMusic:playMusic,
        setSong:setSong}}>
        {props.children}
    </SongsContext.Provider>)
}

export default SongsProviader;