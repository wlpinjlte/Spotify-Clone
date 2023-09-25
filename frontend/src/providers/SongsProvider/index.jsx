import { createContext, useEffect, useState } from "react";
import { getAll, getOne } from "../../helpers/SongApi";
import { URL } from "../../helpers/SongApi";
export const SongsContext=createContext()

class Iterator{
    index=0
    constructor(songList){
        this.songList=songList
    }
    next(){
        console.log(this.index)
        if(this.index===this.songList.length-1){
            return null;
        }else{
            this.index+=1
        }
        return this.songList[this.index];
    }
    previous(){
        console.log(this.index)
        if(this.index===0){
            return null;
        }else{
            this.index-=1
        }
        return this.songList[this.index]
    }
}

function SongsProviader(props){
    const [songList,songListSet]=useState([])
    const [currentSongDetails,currentSongDetailsSet]=useState(null)
    const [currentSong,currentSongSet]=useState(null)
    const [queue,queueSet]=useState(null)
    useEffect(()=>{
        const getSongs=async()=>{
            let response=await getAll()
            songListSet(response.data)
        }
        getSongs()
    },[])
    useEffect(()=>{
        if(currentSong){
            currentSong.volume=0.5
            currentSong.play()
            currentSong.addEventListener("ended",()=>{
                nextSong()
            })
        }
    },[currentSong])
    const setSong=async(id,end=false)=>{
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
            if(!end){
                queueSet(prev=>new Iterator([songList.filter(song=>song.id===id)[0],...songList.filter(song=>song.id!==id)]))
            }
            // console.log(queue)
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
    const nextSong=()=>{
        let song=queue.next()
        // console.log(song)
        if(song){
            setSong(song.id,true)
        }
    }
    const previousSong=()=>{
        // console.log(queue.previous())
        let song=queue.previous()
        if(song){
            setSong(song.id,true)
        }
    }
    return(<SongsContext.Provider value={{
        songList:songList,
        currentSong:currentSong,
        currentSongDetails:currentSongDetails,
        changeVolume:changeVolume,
        pauseMusic:pauseMusic,
        playMusic:playMusic,
        setSong:setSong,
        previousSong:previousSong,
        nextSong:nextSong}}>
        {props.children}
    </SongsContext.Provider>)
}

export default SongsProviader;