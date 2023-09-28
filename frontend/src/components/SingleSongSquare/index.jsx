import { useState } from "react";
import { useContext } from "react";
import SongsContext from "../../context/SongContext";
import { URL } from "../../helpers/utils";
function SingleSongSquare(props){
    const {title,author,image,id}=props
    const [isHover,isHoverSet]=useState(false)
    const {setSong}=useContext(SongsContext)
    const hoverHandler=(action)=>{
        if(action==='enter'){
            isHoverSet(prev=>true)
        }else{
            isHoverSet(prev=>false)
        }
    }

    return(<div className={`p-4 mt-3 flex flex-col rounded relative box-border`.concat(isHover? " lightGreyBackground":" singleSongBackground")} onMouseEnter={()=>{hoverHandler('enter')}} onMouseLeave={()=>{hoverHandler('leave')}}>
        <img className="rounded relative object-cover" src={`${URL}${image}`}></img>
        <h4>{title}</h4>
        <span className="authorColor mb-4">By {author}</span>
        {isHover&&<i className={`fa-solid fa-sharp fa-caret-right absolute top-1/2 rounded-full text-black playButtonColor w-14 h-14 text-center text-4xl`.concat(isHover? " animationIn":"")} 
        style={{right:"10%"}} 
        onClick={()=>{setSong(id)}}></i>}
    </div>)
}

export default SingleSongSquare;