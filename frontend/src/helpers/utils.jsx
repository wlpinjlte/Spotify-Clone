import { Route,Navigate } from "react-router-dom";

export const URL='http://127.0.0.1:8000'

export class Iterator{
    index=0
    constructor(songList,index=0){
        this.songList=songList
        this.index=index
    }
    next(){
        console.log(this.index)
        if(this.index===this.songList.length-1){
            return null;
        }else{
            this.index+=1
        }
        return this.songList[this.index];
    }
    previous(){
        console.log(this.index)
        if(this.index===0){
            return null;
        }else{
            this.index-=1
        }
        return this.songList[this.index]
    }
}

export const ProtectedRoute=(props)=>{
    return(
        localStorage.getItem('authToken')?props.children:<Navigate to="/"/>
    )
}