import { useState } from "react"
import SmallSongSquare from "../SmallSongSquare"

function Sidebar(props){
    const {highlighted,highlightedHandler}=props
    const[isHover,isHoverSet]=useState({library:false,add:false})
    const hoverHandel=(action,name)=>{
        if(action==='Enter'){
            isHoverSet(prev=>({...prev,[name]:true}))
        }else{
            isHoverSet(prev=>({...prev,[name]:false}))
        }
    }
    return(<div className="Navbar p-5 flex flex-col text-white backgroundColorClass rounded-xl text-2xl self-stretch w-full h-full overflow-y-auto overflow-x-hidden hidden sm:block">
        <div className="w-fit cursor-pointer flex" 
        onClick={()=>{highlightedHandler("library")}} 
        style={{color:(highlighted==='library'||isHover.library)?"white":"grey"}}
        onMouseEnter={(event)=>{hoverHandel("Enter",'library')}}
        onMouseLeave={(event)=>{hoverHandel("Leave",'library')}}>
            <i className="fa-solid fa-align-justify fa-rotate-90"></i>
            <span>&nbsp;Library</span>
            <span className="w-24 h-1 block"></span>
            <i class="fa-solid fa-plus" 
            style={{lineHeight:"2.1rem",color:isHover.add?"white":"grey"}}
            onMouseEnter={(event)=>{hoverHandel("Enter",'add')}}
            onMouseLeave={(event)=>{hoverHandel("Leave",'add')}}></i>
        </div>
        {new Array(20).fill(0).map(()=>(<SmallSongSquare/>))}
    </div>)
}

export default Sidebar;