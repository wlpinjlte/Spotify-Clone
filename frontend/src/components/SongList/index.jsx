import Header from "../Header";
import LikedSongsButton from "../LikedSongsButton";
import SingleSongSquare from "../SingleSongSquare";
function SongList(){
    return(<>
        <h1 className="mt-2 text-3xl font-medium">Welcome Back</h1>
        <LikedSongsButton/>
        <h1 className="text-xl mt-10 mb-2">Newest songs</h1>
        <div className="grid overflow-auto grid-cols-2 gap-x-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
            {new Array(20).fill(0).map(a=>(<SingleSongSquare/>))}
        </div>
    </>)
}

export default SongList;