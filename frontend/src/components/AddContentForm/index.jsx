import { Input } from "../FormComponents";
import {useForm} from 'react-hook-form'
import { addSong } from "../../helpers/SongApi";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import SongsContext from '../../context/SongContext'
function AddContentForm(props){
    const {authToken}=useContext(UserContext)
    const {songListSet}=useContext(SongsContext)
    const {closeHandler}=props
    const {handleSubmit,register,formState: { errors },reset}=useForm()
    const submit=async(value)=>{
        value={...value,image:value.image[0],audioFile:value.audioFile[0]}
        console.log(value)
        try{
            let response=await addSong(value,authToken)
            if(response.status===201){
                let data=await response.data
                songListSet(prev=>([...prev,data]))
            }
        }catch(err){
            console.error(err)
        }
    }
    return(<div className="absolute z-10 h-full w-full backdrop-blur-md bg-neutral-800/50 flex justify-center items-center" onClick={()=>{closeHandler(false)}}>
        <form className="flex flex-col justify-center text-white bg-neutral-800 p-5 rounded-lg border border-neutral-700 w-full h-full sm:w-auto sm:h-auto relative" 
            onClick={(event)=>{event.stopPropagation()}}
            onSubmit={handleSubmit(submit)}
        >
            <i className="absolute right-1 top-0 fa-solid fa-xmark text-neutral-500 text-xl" onClick={()=>{closeHandler(false)}}></i>
            <h1 className="text-4xl font-bold mb-5 text-center">Add a song</h1>
            <h1 className="text-center mb-5">Upload an mp3 file</h1>
            <Input placeholder='Song title'
                name='title'
                refValue={register("title",{
                    required:{
                    value:true,
                    message:"Pole wymagane"
                }})}
            />
            {errors.title&&<p className="text-red-600">{errors.title.message}</p>}
            <span className="my-2"/>
            <Input placeholder='Song author'
                name='author'
                refValue={register("author",{
                    required:{
                    value:true,
                    message:"Pole wymagane"
                }})}
            />
            {errors.author&&<p className="text-red-600">{errors.author.message}</p>}
            <h1 className="text-xl my-3">Select an image</h1>
            <Input type='file'
                name='image'
                accept="image/png, image/jpeg, image/jpg"
                refValue={register("image",{
                    required:{
                    value:true,
                    message:"Pole wymagane"
                }})}
            />
            {errors.image&&<p className="text-red-600">{errors.image.message}</p>}
            <h1 className="text-xl mt-5 mb-3">Select a song file</h1>
            <Input type='file'
                name='audioFile'
                accept=".mp3"
                refValue={register("audioFile",{
                    required:{
                    value:true,
                    message:"Pole wymagane"
                }})}
            />
            {errors.audioFile&&<p className="text-red-600">{errors.audioFile.message}</p>}
            <button className="my-6 p-3 bg-green-500 rounded-full hover:bg-green-600 font-bold" type='submit'>
                Create
            </button>
        </form>
    </div>)
}

export default AddContentForm;