import { useContext, useEffect, useState } from "react";
import { URL } from "../../helpers/utils";
import UserContext from "../../context/UserContext";
import SongsContext from "../../context/SongContext";
function SongRectangle(props){
    const {setSong,unLikeSongHandler,likeSongHandler,setSongFromLikedSongsPage}=useContext(SongsContext)
    const {likedSongsList,authToken}=useContext(UserContext)
    const {title,author,image,id,isFormLikedSongsPage}=props
    const [isLiked,isLikedSet]=useState(false)
    const [isHover,isHoverSet]=useState(false)

    useEffect(()=>{
        if(likedSongsList){
            isLikedSet(likedSongsList.some(song=>song.id===props.id)?true:false)
        }
    },[likedSongsList])

    const hoverHandler=(action)=>{
        if(action==="Enter"){
            isHoverSet(true)
        }else{
            isHoverSet(false)
        }
    }
    return(<div className={`flex w-full text-white justify-between mt-3 p-2 rounded`.concat(isHover? " lightGreyBackground":"")} 
        onMouseEnter={()=>{hoverHandler("Enter")}} 
        onMouseLeave={()=>{hoverHandler("leave")}}
        onClick={()=>{isFormLikedSongsPage?setSongFromLikedSongsPage(id):setSong(id)}}
    >
        <div className="flex cursor-pointer">
            <img className="w-14 h-14 rounded-md" src={`${URL}${image}`}></img>
            <span className="w-4 h-1 block"></span>
            <div className="flex flex-col">
                <h1 className="text-xl">{title}</h1>
                <span className="text-base authorColor">by {author}</span>
            </div>
        </div>
        {authToken&&<i className={`fa-heart text-2xl cursor-pointer `.concat(isLiked?"fa-solid":"fa-regular")} 
            style={{lineHeight:"3.5rem"}} 
            onClick={isLiked?(e)=>{e.stopPropagation();unLikeSongHandler(id)}:(e)=>{e.stopPropagation();likeSongHandler(id)}}>
        </i>}
    </div>)
}

export default SongRectangle;