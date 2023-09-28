import { useContext, useEffect, useState } from "react";
import SongRectangle from "../SongRectangle";
import { getLikedSongs } from "../../helpers/SongApi";
import UserContext from "../../context/UserContext";
function BigImagePage(){
    const {authToken,likedSongsList}=useContext(UserContext)
    return(<div className="flex flex-col overflow-auto">
        <div className="flex mt-16 items-center">
            <i className="fa-solid fa-heart p-12 md:p-14 md:text-3xl xl:p-16 gradientLikeButton text-2xl xl:text-6xl leading-none"></i>
            <div className="flex flex-col h-fit ml-5 font-medium">
                <h1 className="m-0">
                    Playlist
                </h1>
                <h1 className="m-0 text-3xl md:text-4xl xl:text-7xl">
                    Liked Songs
                </h1>
            </div>
        </div>
        <div className="flex w-full mt-10 flex-col">
            {likedSongsList.map((song)=>(<SongRectangle {...song} isFormLikedSongsPage={true} key={song.id}/>))}
        </div>
    </div>)
}

export default BigImagePage;