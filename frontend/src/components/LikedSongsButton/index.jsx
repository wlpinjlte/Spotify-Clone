import { useNavigate } from "react-router-dom";

function LikedSongsButton(){
    const navigate=useNavigate()
    return(<div className="w-fit rounded-md lightGreyBackground w-1/3 flex mt-3 h-fit cursor-pointer" onClick={()=>{navigate("/likedSongs")}}>
            <i class="fa-solid fa-heart p-4 gradientLikeButton rounded-l-md"></i>
            <span className="p-3">Liked Songs</span>
    </div>)
}

export default LikedSongsButton;