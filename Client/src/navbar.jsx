import React ,{useContext} from 'react'
import { Link } from 'react-router-dom'
import EbookLogo from './photos/booklogoF.png'
import {context} from './App'

const Navbar = () =>{
    const {click,setClick} = useContext(context)
    return(
        <>
        <div className='flex items-center w-full  justify-between px-[20px] bg-[#5d4889] 
        fixed top-0 left-0 z-10 '>
            <img src={EbookLogo} width='80px' height='80px' className='rounded-[50%] hover:scale-105'/>
            <div className='text-white w-[450px] flex justify-between text-[20px]'>
            <Link className={click === 'h' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('h')} to='/' >Home</Link>
            <Link className={click === 'u' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('u')} to='/pdfupload'>PdfUpload</Link>
            <Link className={click === 'l' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('l')} to='/pdfrender'>Library</Link>
            </div>
            
            </div>
            
        </>
    )
}

export default Navbar