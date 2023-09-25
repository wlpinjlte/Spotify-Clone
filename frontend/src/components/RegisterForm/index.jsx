import { useState } from 'react';
import {Link,Input,Label} from '../FormComponents'
function RegisterForm(props){
    const {closeHandler}=props
    const [isLogin,isLoginSet]=useState(true)
    return(<div className="absolute z-10 h-full w-full backdrop-blur-md bg-neutral-800/50 flex justify-center items-center" onClick={()=>{closeHandler(false)}}>
        <div className="flex flex-col justify-center text-white bg-neutral-800 p-5 rounded-lg border border-neutral-700 w-full h-full sm:w-auto sm:h-auto relative" onClick={(event)=>{event.stopPropagation()}}>
            <i className="absolute right-1 top-0 fa-solid fa-xmark text-neutral-500 text-xl" onClick={()=>{closeHandler(false)}}></i>
            <h1 className="text-4xl font-bold mb-5 text-center">Welcome back</h1>
            <h1 className="text-center mb-3">Login to your account</h1>
            <Label>Email address</Label>
            <Input placeholder='Your email address'/>
            {isLogin&&<Label>Create a Password</Label>}
            {!isLogin&&<Label>Your Password</Label>}
            <Input placeholder='Your password'/>
            <button className="my-6 p-3 bg-green-500 rounded-md hover:bg-green-600 font-bold">
                Sign{isLogin?" in":" up"}
            </button>
            {isLogin&&<Link onClick={()=>isLoginSet(false)}>Don't have an account? Sign up</Link>}
            {!isLogin&&<Link onClick={()=>isLoginSet(true)}>Already have an account? Sign in</Link>}
        </div>
    </div>)
    
}

export default RegisterForm;