// import React ,{useContext, useState} from 'react'
// import { Link } from 'react-router-dom'
// import EbookLogo from './photos/booklogoF.png'
// import {context} from './App'
// import { FaBars } from "react-icons/fa";
// import { ImCross } from "react-icons/im";

// const Navbar = () =>{
//     const {click,setClick} = useContext(context)
//     const [showT,setShowT] = useState(false)
//     return(
//         <>
//         <div className='flex h-[60px] items-center w-full  justify-between px-[20px] bg-[#5d4889] 
//         fixed top-0  left-0 z-10 '>
//             <img src={EbookLogo} width='80px' height='80px' className='rounded-[50%] hover:scale-105'/>
//             <div className='text-white w-[450px] flex justify-between text-[20px] navRes:hidden'>
//             <Link className={click === 'h' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('h')} to='/' >Home</Link>
//             <Link className={click === 'u' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('u')} to='/pdfupload'>PdfUpload</Link>
//             <Link className={click === 'l' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('l')} to='/pdfrender'>Library</Link>
//             </div>
//             {showT==false?
//             <FaBars color='white' size='30px' onClick={()=>{setShowT(true)}} className='hidden cursor-pointer navRes:block'/> :
//             <div className='flex justify-between p-[10px]  bg-[#5d4889] text-white absolute top-0 right-0'>
//                 <div className='relative text-[20px] flex flex-col gap-[10px]  ' > 
//             <Link className={click === 'h' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('h')} to='/' >Home</Link>
//             <Link className={click === 'u' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('u')} to='/pdfupload'>PdfUpload</Link>
//             <Link className={click === 'l' ? 'text-[#f5a51c]' : 'hover:text-[#f5a51c]'} onClick={()=>setClick('l')} to='/pdfrender'>Library</Link>
//                 </div>
           
            
//            <ImCross size='12px' color='white' onClick={()=>{setShowT(false)}} className='cursor-pointer'/>
//             </div>
//             }
            
//       </div>
            
//         </>
//     )
// }

// export default Navbar

import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import EbookLogo from './photos/booklogoF.png'
import { context } from './App'
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Navbar = () => {
    const { click, setClick } = useContext(context)
    const [showT, setShowT] = useState(false)
    const [hoveredLink, setHoveredLink] = useState(null)
    const location = useLocation()

    const navLinks = [
        { to: '/', label: 'Home', key: 'h' },
        { to: '/pdfupload', label: 'PdfUpload', key: 'u' },
        { to: '/pdfrender', label: 'Library', key: 'l' }
    ]

    const getKeyFromPath = (path) => {
        switch (path) {
            case '/': return 'h';
            case '/pdfupload': return 'u';
            case '/pdfrender': return 'l';
            default: return 'h';
        }
    };

    const isActive = (key) => click === key || (key === 'h' && location.pathname === '/')

    useEffect(() => {
        setClick(getKeyFromPath(location.pathname));
    }, [location.pathname, setClick]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showT && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
                setShowT(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showT])

    return (
        <>
            <div className='flex h-[70px] items-center w-full justify-between px-[20px] lg:px-[40px] bg-gradient-to-r from-[#5d4889] via-[#6a54a1] to-[#5d4889] fixed top-0 left-0 z-50 shadow-xl'>
                
                {/* Logo */}
                <div className='flex items-center gap-3'>
                    <img 
                        src={EbookLogo} 
                        width='70px' 
                        height='70px' 
                        className='rounded-[50%] hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl cursor-pointer border-2 border-[#f5a51c]/30 hover:border-[#f5a51c]'
                        alt='Online Library Logo'
                    />
                    <span className='text-white font-bold text-xl hidden md:block tracking-wide'>
                        Online<span className='text-[#f5a51c]'>Library</span>
                    </span>
                </div>

                {/* Desktop Navigation - Show on medium screens and above */}
                <div className='hidden md:flex items-center'>
                    <div className='flex gap-8 lg:gap-12 relative'>
                        {navLinks.map((link) => (
                            <div 
                                key={link.key}
                                className='relative'
                                onMouseEnter={() => setHoveredLink(link.key)}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                <Link 
                                    className={`relative text-white text-[18px] font-medium tracking-wide transition-all duration-300 px-2 py-1 ${
                                        isActive(link.key) 
                                            ? 'text-[#f5a51c]' 
                                            : 'hover:text-[#f5a51c]'
                                          
                                    }`}
                                    onClick={() => setClick(link.key)}
                                    to={link.to}
                                >
                                    {link.label}
                                    
                                    {/* Active indicator line */}
                                    {isActive(link.key) && (
                                        <div className='absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#f5a51c] to-[#fb4a8b] rounded-full'></div>
                                    )}
                                    
                                    {/* Hover indicator line */}
                                    {/* {hoveredLink === link.key && !isActive(link.key) && (
                                        <div className='absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-white to-[#f5a51c]/70 rounded-full animate-pulse'></div>
                                    )} */}
                                </Link>
                                
                                {/* Hover glow effect */}
                                {hoveredLink === link.key && !isActive(link.key) && (
                                    <div className='absolute -inset-1 bg-gradient-to-r from-transparent via-[#f5a51c]/10 to-transparent rounded-lg blur-sm -z-10'></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Toggle - Show on small screens only */}
                <div className='md:hidden menu-toggle'>
                    {!showT && (
                        <button 
                            onClick={() => setShowT(true)}
                            className='w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#864ea5]/20 to-[#4e4cbd]/20 backdrop-blur-sm hover:from-[#864ea5]/40 hover:to-[#4e4cbd]/40 transition-all duration-300 border border-white/10 hover:border-white/20'
                        >
                            <FaBars color='white' size='22px' className='hover:scale-110 transition-transform' />
                        </button>)
                    // ) : (
                    //     <button 
                    //         onClick={() => setShowT(false)}
                    //         className='w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#fb4a8b]/20 to-[#f5a51c]/20 backdrop-blur-sm hover:from-[#fb4a8b]/40 hover:to-[#f5a51c]/40 transition-all duration-300 border border-white/10 hover:border-white/20'
                    //     >
                    //         <ImCross color='white' size='16px' className='hover:scale-110 transition-transform' />
                    //     </button>
                    // )
                    }
                </div>
            </div>

            {/* Mobile Menu - Right Side - Only for small screens */}
            {showT && (
                <>
                    {/* Overlay */}
                    <div 
                        className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden'
                        onClick={() => setShowT(false)}
                    />
                    
                    {/* Mobile Menu Content */}
                    <div className='mobile-menu fixed top-[20px] right-0 z-[150] w-[280px] h-[calc(100vh-150px)] md:hidden'>
                        <div className='h-full rounded-sm bg-gradient-to-b from-[#5d4889] to-[#6a54a1] backdrop-blur-lg border-l border-white/10 shadow-2xl'>
                            {/* Close button at top */}
                            <div className='flex justify-end p-4'>
                                <button 
                                    onClick={() => setShowT(false)}
                                    className='w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#fb4a8b]/20 to-[#f5a51c]/20 hover:from-[#fb4a8b]/40 hover:to-[#f5a51c]/40 transition-all duration-300 border border-white/10 hover:border-white/20'
                                >
                                    <ImCross color='white' size='12px' />
                                </button>
                            </div>
                            
                            {/* Menu Items */}
                            <div className='flex flex-col items-start gap-3 p-6'>
                                {navLinks.map((link) => (
                                    <div 
                                        key={link.key}
                                        className='relative w-full'
                                        onClick={() => {
                                            setClick(link.key)
                                            setShowT(false)
                                        }}
                                    >
                                        <Link 
                                            className={`block text-left text-white text-[18px] font-medium tracking-wide transition-all duration-300 px-6 py-3 rounded-xl w-full ${
                                                isActive(link.key) 
                                                    ? 'bg-gradient-to-r from-[#f5a51c]/20 to-[#fb4a8b]/20 text-[#f5a51c] border border-[#f5a51c]/30' 
                                                    : 'hover:bg-gradient-to-r hover:from-white/5 hover:to-white/10 hover:text-[#f5a51c]'
                                            }`}
                                            to={link.to}
                                        >
                                            <div className='flex items-center gap-3'>
                                                {link.label}
                                                
                                                {/* Active indicator line */}
                                                {isActive(link.key) && (
                                                    <div className='ml-auto w-2 h-2 rounded-full bg-[#f5a51c] animate-pulse'></div>
                                                )}
                                            </div>
                                            
                                            {/* Hover indicator line */}
                                            {!isActive(link.key) && (
                                                <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-transparent via-[#f5a51c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                            )}
                                        </Link>
                                        
                                        {/* Mobile hover effect */}
                                        {!isActive(link.key) && (
                                            <div className='absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0 group-hover:h-10 transition-all duration-300 -z-10'>
                                                <div className='absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-xl'></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className='absolute bottom-0 left-0 right-0 p-6'>
                                <div className='text-center text-white/50 text-sm'>
                                    <div className='h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4'></div>
                                    <p>Online Library</p>
                                    <p className='text-xs mt-1'>Your Digital Book Haven</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            
            {/* Decorative bottom border */}
            <div className='fixed top-[70px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f5a51c]/30 to-transparent z-50'></div>
        </>
    )
}

export default Navbar
