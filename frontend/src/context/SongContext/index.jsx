import { createContext, useEffect, useState, useContext } from "react";
import { getAll, getOne,likeSong,unLikeSong } from "../../helpers/SongApi";
import { URL } from "../../helpers/utils";
import { Iterator } from "../../helpers/utils";
import UserContext from "../UserContext";
import LoadingPage from "../../components/LoadingPage";
const SongsContext=createContext()
export default SongsContext;


export function SongsProviader(props){
    const {authToken,likedSongsListSet,refreshToken,likedSongsList}=useContext(UserContext)
    const [songList,songListSet]=useState([])
    const [currentSongDetails,currentSongDetailsSet]=useState(null)
    const [currentSong,currentSongSet]=useState(null)
    const [queue,queueSet]=useState(null)
    const [isLoading,isLoadingSet]=useState(true)
    useEffect(()=>{
        const getSongs=async()=>{
            let response=await getAll()
            songListSet(response.data)
        }
        getSongs().then(res=>isLoadingSet(false))
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

    const likeSongHandler=(id)=>{
        refreshToken().then(async()=>{
            try{
                let response=await likeSong(id,authToken)      
                if(response.status===200){
                    likedSongsListSet(prev=>([...prev,...songList.filter(song=>song.id===id)]))
                }
            }catch(err){
                console.log(err)
            }
        })
    }

    const unLikeSongHandler=(id)=>{
        refreshToken().then(async()=>{
            try{
                let response=await unLikeSong(id,authToken)
                console.log(response)
                if(response.status===200){
                    likedSongsListSet(prev=>(prev.filter(song=>song.id!==id)))
                }
            }catch(err){
                console.log(err)
            }
        })
    }

    const setSongFromLikedSongsPage=(id)=>{
        let index=likedSongsList.indexOf(likedSongsList.filter(song=>song.id===id)[0])
        setSong(id,true)
        queueSet(new Iterator(likedSongsList,index))
    }
    
    const addSongToDatabase=(data)=>{
        
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
            nextSong:nextSong,
            unLikeSongHandler:unLikeSongHandler,
            likeSongHandler:likeSongHandler,
            setSongFromLikedSongsPage:setSongFromLikedSongsPage,
            songListSet:songListSet}}>
        {isLoading?<LoadingPage/>:props.children}
    </SongsContext.Provider>)
}