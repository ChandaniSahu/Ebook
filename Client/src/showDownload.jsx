import React, { useContext, useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { ImCross } from "react-icons/im";
import  {context}  from './App';
const ShowDownload =()=>{
    const navigate = useNavigate()
    
    const{setClick,uDetail,setShowDownload,showDownload} = useContext(context)

    
    return(
        <>
            <div className={showDownload === false && uDetail.uploadUrl?' relative w-auto h-auto setPos text-center text-white bg-[#5d4889] rounded-[10px] max-w-full ':'hidden' }style={{boxShadow:'1px 1px 10px 4px gray'}}>
            {/* <div className=' hidden'style={{boxShadow:'1px 1px 10px 4px gray'}}> */}
            <div className='w-auto p-[5px] '> 
            <h1>Pdf uploaded successfully ! , now you can download pdf</h1><br/>
           <button className=' bg-green-500 rounded-xl w-[120px]  py-[5px]'
           onClick={()=>{navigate('/pdfrender');setShowDownload(true);setClick('l')}}>Download Now</button>
          </div>
          <ImCross size='12px' className='absolute top-2 right-2' onClick={()=>{setShowDownload(true)}}/>
        </div>
        
        
        </>
    )
}

export default ShowDownload