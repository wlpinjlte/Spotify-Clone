import SongRectangle from "../SongRectangle";
function SearchPage(){
    return(<div className="flex flex-col overflow-auto">
        <h1 className="text-3xl">Search</h1>
        <input className="my-5 p-3 rounded-md bg-neutral-700 focus:outline-none" placeholder="what do you want to listen to?"/>
        <div className="flex flex-col">
            {new Array(10).fill(0).map(()=>(<SongRectangle/>))}
        </div>
    </div>)
}

export default SearchPage;