import React, { useState } from 'react'
import axios from 'axios'
const Signup =()=>{
    const [signup,setSignup] = useState({uname:'',email:'',pass:'',cpass:''})
    const handleInput = (e) =>{
     setSignup({...signup,[e.target.name]:e.target.value})
    }

    const handleSignup = async() =>{
    try{
    console.log('signup',signup)
    const res = await axios.post('https://ebook-orcin-alpha.vercel.app
/api/signup',signup)
    console.log('signup res',res)
    }
    catch(e){
        console.log('error in signup',e)
    }
    }

    return(
        <>

       <div className='border border-black posSnL w-[300px]
        h-180 p-[30px] items-center justify-center flex flex-col rounded-lg'>
        <h1>Signup Here</h1>
        <div>
            <label>Username:</label><br/>
            <input type='text' placeholder='Enter username' onChange={handleInput}
            name='uname' value={signup.uname}/>
        </div><br/>
        <div>
            <label>Email:</label><br/>
            <input type='email' placeholder='Enter email' onChange={handleInput}
            name='email' value={signup.email}/>
        </div><br/>
        <div>
            <label>Password:</label><br/>
            <input type='text' placeholder='Enter password' onChange={handleInput}
            name='pass' value={signup.pass}/>
        </div><br/>
        <div>
            <label>Confirm Password:</label><br/>
            <input type='text' placeholder='Enter confirm password' onChange={handleInput}
            name='cpass' value={signup.cpass}/>
        </div><br/>
        <button onClick={handleSignup}>Signup</button>
       </div>
        </>
    )
}

export default Signup