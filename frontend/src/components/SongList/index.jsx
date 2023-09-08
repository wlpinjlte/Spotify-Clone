import Header from "../Header";
import LikedSongsButton from "../LikedSongsButton";
import SingleSongSquare from "../SingleSongSquare";
function SongList(){
    return(<div className='text-white p-5 flex backgroundColorClass rounded-xl gradientBackgroundClass flex-col w-full'>
        <Header/>
        <h1 className="mt-2 text-3xl font-medium">Welcome Back</h1>
        <LikedSongsButton/>
        <h1 className="text-xl mt-10 mb-2">Newest songs</h1>
        <div className="flex flex-wrap overflow-auto">
            {new Array(20).fill(0).map(a=>(<SingleSongSquare/>))}
        </div>
    </div>)
}

export default SongList;