import React ,{useContext} from 'react'
 import { useNavigate } from 'react-router-dom'
 import './index.css'
 import { ImCross } from "react-icons/im";
 import {context} from './App'

const ShowUpload =()=>{
    const navigate = useNavigate()
    const{showUpload,setShowUpload} = useContext(context)
    return(
        <>
        <div className={showUpload===true?'relative w-[400px] h-[130px]  text-center text-white bg-[#5d4889] rounded-[10px] max-w-full':'hidden'} style={{boxShadow:'1px 1px 10px 4px gray'}}>
        
        <div className=' w-[375px] p-[10px] '>
             <h1>Sorry! You have to upload one Pdf after that you can download any one pdf</h1><br/>
             <button className=' bg-[#fb4a8b] rounded-xl w-[120px]  py-[5px]'
             onClick={()=>{navigate('/pdfupload');setShowUpload(false)}}>Upload Now</button>
        </div>
        
    
       <ImCross size='12px' className='absolute top-2 right-2 cursor-pointer' onClick={()=>{setShowUpload(false)}}/>
        </div>
        
        
        </>
    )
}

export default ShowUpload