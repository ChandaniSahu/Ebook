import React ,{useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import EbookLogo from './photos/booklogoF.png'
import {context} from './App'
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Navbar = () =>{
    const {click,setClick} = useContext(context)
    const [showT,setShowT] = useState(false)
    return(
        <>
        <div className='flex h-[60px] items-center w-full  justify-between px-[20px] bg-[#5d4889] 
        fixed top-0  left-0 z-10 '>
            <img src={EbookLogo} width='80px' height='80px' className='rounded-[50%] hover:scale-105'/>
            <div className='text-white w-[450px] flex justify-between text-[20px] navRes:hidden'>
            <Link className={click === 'h' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('h')} to='/' >Home</Link>
            <Link className={click === 'u' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('u')} to='/pdfupload'>PdfUpload</Link>
            <Link className={click === 'l' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('l')} to='/pdfrender'>Library</Link>
            </div>
            {showT==false?
            <FaBars color='white' size='30px' onClick={()=>{setShowT(true)}} className='hidden cursor-pointer navRes:block'/> :
            <div className='flex justify-between p-[10px]  bg-[#5d4889] text-white absolute top-0 right-0'>
                <div className='relative text-[20px] flex flex-col gap-[10px]  ' > 
            <Link className={click === 'h' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('h')} to='/' >Home</Link>
            <Link className={click === 'u' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('u')} to='/pdfupload'>PdfUpload</Link>
            <Link className={click === 'l' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('l')} to='/pdfrender'>Library</Link>
                </div>
           
            
           <ImCross size='12px' color='white' onClick={()=>{setShowT(false)}} className='cursor-pointer'/>
            </div>
            }
            
      </div>
            
        </>
    )
}

export default Navbar