import {useNavigate} from 'react-router-dom'
import UserContext from "../../context/UserContext";
import { useContext } from 'react';
function Header(props){
    const {Logout,authToken}=useContext(UserContext)
    const {openHandler}=props
    const navigate=useNavigate()
    return(<div className="Header sticky flex justify-between w-full">
        <button className="text-black flex hidden sm:block" style={{fontSize:"2.4rem"}} onClick={()=>navigate(-1)}>
            <i className="fa-solid fa-circle-chevron-left bg-white" style={{borderRadius:"50%"}}></i>
        </button>
        <div className="sm:hidden flex" style={{fontSize:"1.5rem"}}>
            <i className="fa-solid fa-house text-black mr-2 bg-white rounded-full p-2" onClick={()=>navigate("/")}></i>
            <i className="fa-solid fa-magnifying-glass  text-black bg-white rounded-full p-2"onClick={()=>navigate("/search")}></i>
        </div>
        <div className="flex h-fit" style={{fontSize:"2.4rem"}}>
            {!authToken&&<span className='p-2 mr-2 cursor-pointer hover:text-neutral-300' style={{fontSize:"1rem"}} onClick={()=>openHandler(true)}>
                sign up
            </span>}
            <span 
                className="text-black bg-white p-2 rounded-2xl font-bold px-4 cursor-pointer hover:bg-neutral-300" 
                style={{fontSize:"1rem"}}
                onClick={authToken?()=>{Logout()}:()=>openHandler(true)}>
                    {authToken?"logout":"login"}
            </span>
            {authToken&&<i 
                className="fa-solid fa-circle-user bg-black flex h-fit cursor-pointer ml-5" 
                style={{borderRadius:"50%"}}
            ></i>}
        </div>
    </div>)
}

export default Header;