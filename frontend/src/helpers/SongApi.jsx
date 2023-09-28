import axios from "axios"

import { URL } from "./utils"

export const getAll=()=>{
    return axios.get(`${URL}/songs/`)
}

export const getOne=(id)=>{
    return axios.get(`${URL}/songs/${id}`)
}

export const getByTitle=(title)=>{
    return axios.post(`${URL}/songs/search`,{
        title:title
    })
}

export const getLikedSongs=(authToken)=>{
    return axios.get(`${URL}/api/likedSongs/`,{
        headers:{
            Authorization:'Bearer '+String(authToken.access)
        }
    })
}

export const likeSong=(id,authToken)=>{
    return axios.post(`${URL}/api/addToLikedSongs/`,{songId:id},{
        headers:{
            Authorization:'Bearer '+String(authToken.access)
        }
    })
}

export const unLikeSong=(id,authToken)=>{
    return axios.post(`${URL}/api/deleteFromLikedSongs/`,{songId:id},{
        headers:{
            Authorization:'Bearer '+String(authToken.access)
        }
    })
}

export const addSong=(data,authToken)=>{
    return axios.post(`${URL}/songs/addSong/`,data,{
        headers:{
            Authorization:'Bearer '+String(authToken.access),
            "Content-Type": "multipart/form-data"
        }
    })
}