import { useContext, useState } from "react"
import SmallSongSquare from "../SmallSongSquare"
import { SongsContext } from "../../providers/SongsProvider"
function Sidebar(props){
    const {songList}=useContext(SongsContext)
    const {openHandler}=props
    const[isHover,isHoverSet]=useState(false)
    const hoverHandel=(action)=>{
        if(action==='Enter'){
            isHoverSet(true)
        }else{
            isHoverSet(false)
        }
    }
    return(<div className="Navbar p-5 flex flex-col text-white backgroundColorClass rounded-xl text-2xl self-stretch w-full h-full overflow-y-auto overflow-x-hidden hidden sm:block">
        <div className="w-fit flex" style={{"color":"grey"}}>
            <i className="fa-solid fa-align-justify fa-rotate-90"></i>
            <span>&nbsp;Library</span>
            <span className="w-24 h-1 block"></span>
            <i className="fa-solid fa-plus" 
            style={{lineHeight:"2.1rem",color:isHover?"white":"grey"}}
            onMouseEnter={(event)=>{hoverHandel("Enter")}}
            onMouseLeave={(event)=>{hoverHandel("Leave")}}
            onClick={()=>openHandler(true)}></i>
        </div>
        {songList.map((song)=>(<SmallSongSquare key={song.id} {...song}/>))}
    </div>)
}

export default Sidebar;