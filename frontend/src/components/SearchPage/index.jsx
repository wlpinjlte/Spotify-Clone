import { useEffect, useState } from "react";
import SongRectangle from "../SongRectangle";
import { getByTitle } from "../../helpers/SongApi";
import {useDebounce} from "use-debounce";
function SearchPage(){
    const [title,titleSet]=useState('')
    const [songList,songListSet]=useState([])
    const [debounceTitle]=useDebounce(title,500)
    useEffect(()=>{
        const getResults=async()=>{
            const response=await getByTitle(title)
            songListSet(response.data)
        }
        getResults()
    },[debounceTitle])
    return(<div className="flex flex-col overflow-auto">
        <h1 className="text-3xl">Search</h1>
        <input className="my-5 p-3 rounded-md bg-neutral-700 focus:outline-none" 
            placeholder="what do you want to listen to?" 
            value={title}
            onChange={(event)=>titleSet(event.target.value)}
        />
        <div className="flex flex-col">
            {songList.map((song)=>(<SongRectangle key={song.id} {...song}/>))}
        </div>
    </div>)
}

export default SearchPage;