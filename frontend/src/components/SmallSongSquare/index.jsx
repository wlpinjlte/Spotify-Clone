import { useContext, useState } from "react";
// import { URL } from "../../helpers/SongApi";
import { URL } from "../../helpers/utils";
import SongsContext from "../../context/SongContext";
function SmallSongSquare(props){
    const {setSong}=useContext(SongsContext)
    const {title,id,author,image}=props
    const [isHover,isHoverSet]=useState(false)
    const hoverHandler=(action)=>{
        // console.log(isHover)
        if(action==="Enter"){
            isHoverSet(prev=>true)
        }else{
            isHoverSet(prev=>false)
        }
    }
    return(<div className={`w-full mt-2 flex p-2 rounded-md cursor-pointer `.concat(isHover?"lightGreyBackground":"")} 
    onMouseEnter={()=>hoverHandler("Enter")} 
    onMouseLeave={()=>hoverHandler("Leave")}
    onClick={()=>{setSong(id)}}>
        <img className="w-14 h-14 rounded-md" src={`${URL}${image}`}></img>
        <span className="w-4 h-1 block"></span>
        <div className="flex flex-col">
            <h1 className="text-xl">{title}</h1>
            <span className="text-base authorColor">by {author}</span>
        </div>
    </div>)
}

export default SmallSongSquare;