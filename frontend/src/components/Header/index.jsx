function Header(props){
    return(<div className="Header sticky flex justify-between w-full">
        <button className="text-black flex hidden sm:block" style={{fontSize:"2.4rem"}}>
            <i class="fa-solid fa-circle-chevron-left bg-white" style={{borderRadius:"50%"}}></i>
        </button>
        <div className="sm:hidden flex" style={{fontSize:"1.5rem"}}>
            <i class="fa-solid fa-house text-black mr-2 bg-white rounded-full p-2"></i>
            <i className="fa-solid fa-magnifying-glass  text-black bg-white rounded-full p-2"></i>
        </div>
        <div className="flex h-fit" style={{fontSize:"2.4rem"}}>
            <span className="text-black bg-white p-2 mr-5 rounded-2xl font-bold px-4 cursor-pointer" style={{fontSize:"1rem"}}>login</span>
            <i class="fa-solid fa-circle-user bg-black flex h-fit cursor-pointer" style={{borderRadius:"50%"}}></i>
        </div>
    </div>)
}

export default Header;