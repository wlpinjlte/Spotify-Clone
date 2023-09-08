import { useState } from "react";

function Navbar(props){
    const {highlighted,highlightedHandler}=props
    const[isHover,isHoverSet]=useState({home:false,search:false})
    const hoverHandel=(event,action,name)=>{
        if(action==='Enter'){
            isHoverSet(prev=>({...prev,[name]:true}))
        }else{
            isHoverSet(prev=>({...prev,[name]:false}))
        }
    }
    return(<div className="Navbar p-5 flex flex-col text-white backgroundColorClass rounded-xl text-2xl mb-2 w-full">
        <div className="flex cursor-pointer" 
            style={{color:(highlighted==='home'||isHover.home)? "white":"grey"}} 
            onMouseEnter={(event)=>{hoverHandel(event,"Enter","home")}} 
            onMouseLeave={(event)=>{hoverHandel(event,"Leave","home")}}
            onClick={()=>{highlightedHandler("home")}}>
            <i class="fa-solid fa-house"></i>
            <span className="text-center leading-6">&nbsp;Home</span> 
        </div>
        <div className="flex mt-3 cursor-pointer" 
            style={{color:(highlighted==='search'||isHover.search)? "white":"grey"}} 
            onMouseEnter={(event)=>{hoverHandel(event,"Enter","search")}} 
            onMouseLeave={(event)=>{hoverHandel(event,"Leave","search")}}
            onClick={()=>{highlightedHandler("search")}}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <span className="text-center leading-6">&nbsp;Search</span>
        </div>
    </div>)
}

export default Navbar;