import { useState,useEffect,createContext } from "react";
import { Login,Register,RefreshToken } from "../../helpers/UserApi";
import { getLikedSongs } from "../../helpers/SongApi";
import jwt_decode from 'jwt-decode'
import LoadingPage from "../../components/LoadingPage";
const UserContext=createContext();
export default UserContext;

export const UserProvider=(props)=>{
    const {children}=props
    const [username,usernameSet]=useState("")
    const [authToken,authTokenSet]=useState(JSON.parse(localStorage.getItem("authToken")))
    const [likedSongsList,likedSongsListSet]=useState([])
    const [isLoading,isLoadingSet]=useState(true)
    const [isStaff,isStaffSet]=useState(false)
    useEffect(()=>{
        if(authToken){
            refreshToken().then(()=>isLoadingSet(false))
        }else{
            isLoadingSet(false)
        }
    },[])

    useEffect(()=>{
        if(!isLoading){
            const likeSongRequest=async()=>{
                try{
                    let response=await getLikedSongs(authToken)
                    let data=await response.data
                    likedSongsListSet(data)
                }catch(err){
                    Logout()
                }
            }
            if(authToken){
                likeSongRequest()
            }
            let interval=setInterval(()=>{
                if(authToken){
                    refreshToken()
                }
            },4*1000*60)
            return ()=>clearInterval(interval)
        }
    },[authToken])

    const decodeToken=(token)=>{
        isStaffSet(jwt_decode(token.access).is_staff)
        usernameSet(jwt_decode(token.access).username)
    }

    const LoginUser=async(formData)=>{
        console.log(formData)
        let response=null
        try{
            response=await Login(formData)
        }catch(err){
            response=err.response
        }
        if(response.status===200){
            let data=await response.data
            localStorage.setItem("authToken",JSON.stringify(data))
            authTokenSet(data)
            decodeToken(data)
            return {message:"success"}
        }else{
            return{message:response.data.detail}
        }
    }

    const RegisterUser=async(formData)=>{
        console.log(formData)
        let response=null
        try{
            response=await Register(formData)
        }catch(err){
            response=err.response
        }
        
        if(response?.status===201){
            let data=await response.data
            console.log(data)
            return {message:"success"}
        }else{
            console.log(response.data)
            return {message:response.data.username}
        }
    }

    const Logout=()=>{
        localStorage.removeItem("authToken")
        authTokenSet(null)
        usernameSet("")
        isStaffSet(false)
    }

    const refreshToken=async()=>{
        console.log("refresh")
        if(authToken){
            try{
                let response=await RefreshToken(authToken?.refresh)
                if(response.status===200){
                    let data=await response.data
                    authTokenSet(data)
                    localStorage.setItem("authToken",JSON.stringify(data))
                    decodeToken(data)
                }
            }catch(err){
                Logout()
                console.error(err)
            }
        }
    }

    return(<UserContext.Provider value={{
            LoginUser:LoginUser,
            RegisterUser:RegisterUser,
            Logout:Logout,
            authToken:authToken,
            likedSongsList:likedSongsList,
            likedSongsListSet:likedSongsListSet,
            refreshToken:refreshToken,
            isStaff:isStaff}}
        >
        {isLoading?<LoadingPage/>:children}
    </UserContext.Provider>)
}