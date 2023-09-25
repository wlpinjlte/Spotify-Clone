import axios from "axios"

export const URL='http://127.0.0.1:8000'

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