import {useNavigate} from 'react-router-dom'
function Header(props){
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
            <span 
            className="text-black bg-white p-2 mr-5 rounded-2xl font-bold px-4 cursor-pointer" 
            style={{fontSize:"1rem"}}
            onClick={()=>openHandler(true)}>
                login
            </span>
            <i 
            className="fa-solid fa-circle-user bg-black flex h-fit cursor-pointer" 
            style={{borderRadius:"50%"}}
            onClick={()=>openHandler(true)}></i>
        </div>
    </div>)
}

export default Header;