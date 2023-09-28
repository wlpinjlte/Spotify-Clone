import { useState,useContext } from 'react';
import {Link,Input,Label} from '../FormComponents'
import UserContext from '../../context/UserContext';
function RegisterForm(props){
    const {LoginUser,RegisterUser}=useContext(UserContext)
    const {closeHandler}=props
    const [isLogin,isLoginSet]=useState(true)
    const [formValue,formValueSet]=useState({username:"",password:""})
    const [error,errorSet]=useState("")
    const LoginFunction=async()=>{
        const {message}=await LoginUser(formValue)
        if(message==='success'){
            closeHandler(false)
        }else{
            errorSet(message)
        }
    }
    const RegisterFunction=async()=>{
        const {message}=await RegisterUser(formValue)
        if(message==='success'){
            closeHandler(false)
        }else{
            errorSet(message)
        }
    }
    return(<div className="absolute z-10 h-full w-full backdrop-blur-md bg-neutral-800/50 flex justify-center items-center" onClick={()=>{closeHandler(false)}}>
        <div className="flex flex-col justify-center text-white bg-neutral-800 p-5 rounded-lg border border-neutral-700 w-full h-full sm:w-auto sm:h-auto relative" onClick={(event)=>{event.stopPropagation()}}>
            <i className="absolute right-1 top-0 fa-solid fa-xmark text-neutral-500 text-xl" onClick={()=>{closeHandler(false)}}></i>
            <h1 className="text-4xl font-bold mb-5 text-center">Welcome back</h1>
            <h1 className="text-center mb-3">Login to your account</h1>
            <Label>Email address</Label>
            <Input 
                placeholder='Your email address' 
                type='email'
                name='username' 
                onChange={(e)=>{formValueSet(prev=>({...prev,[e.target.name]:e.target.value}))}}
            />
            {!isLogin&&<Label>Create a Password</Label>}
            {isLogin&&<Label>Your Password</Label>}
            <Input 
                placeholder='Your password' 
                type='password'
                name='password' 
                onChange={(e)=>{formValueSet(prev=>({...prev,[e.target.name]:e.target.value}))}}
            />
            <button className="my-6 p-3 bg-green-500 rounded-md hover:bg-green-600 font-bold" onClick={isLogin?LoginFunction:RegisterFunction}>
                Sign{isLogin?" in":" up"}
            </button>
            {isLogin&&<Link onClick={()=>isLoginSet(false)}>Don't have an account? Sign up</Link>}
            {!isLogin&&<Link onClick={()=>isLoginSet(true)}>Already have an account? Sign in</Link>}
            {error&&<p className='text-red-600 text-center mt-cd'>{error}</p>}
        </div>
    </div>)
    
}

export default RegisterForm;