import { Input } from "../FormComponents";

function AddContentForm(props){
    const {closeHandler}=props
    return(<div className="absolute z-10 h-full w-full backdrop-blur-md bg-neutral-800/50 flex justify-center items-center" onClick={()=>{closeHandler(false)}}>
        <div className="flex flex-col justify-center text-white bg-neutral-800 p-5 rounded-lg border border-neutral-700 w-full h-full sm:w-auto sm:h-auto relative" onClick={(event)=>{event.stopPropagation()}}>
            <i class="absolute right-1 top-0 fa-solid fa-xmark text-neutral-500 text-xl" onClick={()=>{closeHandler(false)}}></i>
            <h1 className="text-4xl font-bold mb-5 text-center">Add a song</h1>
            <h1 className="text-center mb-5">Upload an mp3 file</h1>
            <Input placeholder='Song title'/>
            <span className="my-2"/>
            <Input placeholder='Song author'/>
            <h1 className="text-xl mt-5 mb-3">Select a song file</h1>
            <Input type='file'/>
            <h1 className="text-xl my-3">Select an image</h1>
            <Input type='file'/>
            <button className="my-6 p-3 bg-green-500 rounded-full hover:bg-green-600 font-bold">
                Create
            </button>
        </div>
    </div>)
}

export default AddContentForm;