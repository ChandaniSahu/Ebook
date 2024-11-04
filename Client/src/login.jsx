import React, { useContext, useState } from 'react'
import axios from 'axios'
import {context} from './App'

const Login = ()=>{
const [login,setLogin] = useState({email:'',pass:''})
const{setUDetail} = useContext(context)

const handleInput =(e) =>{
setLogin({...login,[e.target.name]:e.target.value})
}

const handleLogin = async() =>{
    try{ 
     console.log('login',login)   
     const res = await axios.post('https://ebook-orcin-alpha.vercel.app
/api/login',login) 
     console.log('login res',res)
     if(res.data.uname!=''||undefined){
        alert('logined sucessfully')
        setUDetail((prev)=>({...prev,userId:res.data._id,uname:res.data.uname}))
     }
     else alert('wrong in login')
    }
    catch(e){
        console.log('error in login',e)
    }
}

 return(
    <>
    <div className='border border-black posSnL w-[300px]
        h-180 p-[30px] items-center justify-center flex flex-col rounded-lg'>
        <h1>Login Your Account</h1>
        <div>
            <label>Email:</label><br/>
            <input type='email' placeholder='Enter email' onChange={handleInput}
            name='email' value={login.email}/>
        </div><br/>
        <div>
            <label>Password:</label><br/>
            <input type='text' placeholder='Enter password' onChange={handleInput}
            name='pass' value={login.pass}/>
        </div><br/>
        <button onClick={handleLogin}>Login</button>
    </div>
    </>
)
}

export default Login