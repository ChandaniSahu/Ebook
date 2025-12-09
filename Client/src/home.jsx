// import React ,{useContext} from 'react'
// import { useNavigate } from 'react-router-dom'
// import { context } from './App'
// const Home =()=>{
// const navigate = useNavigate()
// const {setClick} = useContext(context)
// return(
//     <>
   
//     <div  className='flex justify-start items-center bg-cover h-screen bg-center  bg-[url("./photos/bgImage.jpg")]'>
//     <div className='flex flex-col font-[Helvetica] ml-[30px]'>
//         <div className='text-[#864ea5] font-[700] text-[40px] mb-[-20px] '>Welcome In</div><br/>
//     <div className='text-[#4e4cbd] font-[700] text-[40px] mb-[-20px] '>ONLINE LIBRARY</div><br/>
    
//     <pre className=' text-wrap text-gray-400 font-[Helvetica]'>            
//              {
//             `Your one-stop destination for 
//  exploring a vast collection of books
//  across various genres. Easily search, 
//  read, and download books from the
//  comfort of your home.`
//              }
//    </pre><br/>
//     <button className='text-white bg-[#fb4a8b] rounded-xl w-[100px] px-[10px] py-[5px] ' onClick={()=>{navigate('/pdfrender');setClick('l')}}>Let's Start </button>
//     </div>
    
   
//     </div>
//     </>
// )
// }

// export default Home

// purple - #864ea5  grey-#d6d4d5
// lightpurple -#ed65ed
// pink- #fb4a8b
//darkblue-#5d4889
// blue-#4e4cbd
// yellow -#f5a51c
// grey-#d6d4d5

import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { context } from './App'

const Home = () => {
  const navigate = useNavigate()
  const { setClick } = useContext(context)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='pt-[90px] flex justify-between items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-[#f9f7ff] to-[#f0eaff] px-8'>
      
      {/* Left Content with proper padding */}
      <div className='flex flex-col font-[Helvetica] relative z-10 max-w-2xl'>
        {/* Welcome text with animation */}
        <div className='overflow-hidden mb-4'>
          <div 
            className='text-[#864ea5] font-[700] text-5xl md:text-6xl mb-2 transform transition-all duration-700 hover:translate-x-2 hover:scale-105 cursor-default'
            style={{ 
              textShadow: '2px 2px 8px rgba(134, 78, 165, 0.15)'
            }}
          >
            Welcome In
          </div>
        </div>
        
        {/* Main title with interactive underline */}
        <div className='relative group mb-8'>
          <div 
            className='text-[#4e4cbd] font-[700] text-5xl md:text-6xl mb-4 transform transition-all duration-500 group-hover:translate-x-2 cursor-default'
            style={{ 
              textShadow: '2px 2px 8px rgba(78, 76, 189, 0.15)'
            }}
          >
            ONLINE LIBRARY
          </div>
          <div className='absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#864ea5] to-[#fb4a8b] rounded-full w-0 group-hover:w-full transition-all duration-500'></div>
        </div>
        
        {/* Description with modern styling */}
        <div className='relative mb-10'>
          <pre className='text-wrap text-gray-700 font-[Helvetica] text-lg leading-relaxed tracking-wide bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-white/50'>            
            {`Your one-stop destination for 
exploring a vast collection of books
across various genres. Easily search, 
read, and download books from the
comfort of your home.`}
          </pre>
          
          {/* Decorative corner accent */}
          <div className='absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#fb4a8b] rounded-tl-lg'></div>
          <div className='absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#4e4cbd] rounded-br-lg'></div>
        </div>
        
        {/* Let's Start button */}
        <div className='flex items-center gap-6'>
          <div className='relative'>
            <button 
              className='text-white rounded-xl px-8 py-4 font-medium text-lg relative overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3'
              onClick={() => { navigate('/pdfrender'); setClick('l') }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                background: 'linear-gradient(135deg, #fb4a8b 0%, #ed65ed 50%, #864ea5 100%)',
                backgroundSize: '200% 100%',
                backgroundPosition: isHovered ? '100% 0' : '0 0',
                transition: 'all 0.5s ease'
              }}
            >
              {/* Button shine effect */}
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
              
              <span className='flex items-center justify-center gap-2 relative'>
                Let's Start
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            {/* Button glow effect */}
            <div className='absolute -inset-2 bg-gradient-to-r from-[#fb4a8b]/30 to-[#4e4cbd]/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>
          </div>
        </div>
      </div>

      {/* Right Side - Minimal SVG Background */}
      <div className='hidden lg:block relative w-1/2 h-screen'>
        <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" className="opacity-90">
          <defs>
            {/* Subtle gradients */}
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#864ea5" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#4e4cbd" stopOpacity="0.05" />
            </linearGradient>
            
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb4a8b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f5a51c" stopOpacity="0.05" />
            </linearGradient>
            
            {/* Glow effect */}
            <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur"/>
              <feOffset in="blur" dx="0" dy="0" result="offsetBlur"/>
              <feMerge>
                <feMergeNode in="offsetBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background gradients */}
          <rect width="100%" height="100%" fill="url(#grad1)" />
          <circle cx="600" cy="100" r="200" fill="url(#grad2)" opacity="0.6" />
          
          {/* Elegant floating book elements - Similar to your screenshot */}
          
          {/* Large book 1 */}
          <g className="animate-float-slow" transform="translate(400, 150)">
            <rect x="0" y="0" width="140" height="200" rx="12" fill="#864ea5" opacity="0.8" filter="url(#soft-glow)" />
            <rect x="0" y="0" width="25" height="200" rx="4" fill="#5d4889" opacity="0.9" />
            {[1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1="35" y1={i * 35} x2="130" y2={i * 35} stroke="white" strokeWidth="1.5" opacity="0.4" />
            ))}
          </g>
          
          {/* Large book 2 */}
          <g className="animate-float" style={{animationDelay: '1s'}} transform="translate(500, 250)">
            <rect x="0" y="0" width="160" height="220" rx="12" fill="#4e4cbd" opacity="0.8" filter="url(#soft-glow)" />
            <rect x="0" y="0" width="30" height="220" rx="5" fill="#5d4889" opacity="0.9" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1="40" y1={i * 33} x2="150" y2={i * 33} stroke="white" strokeWidth="1.5" opacity="0.4" />
            ))}
          </g>
          
          {/* Large book 3 */}
          <g className="animate-float-slow" style={{animationDelay: '2s'}} transform="translate(300, 200)">
            <rect x="0" y="0" width="180" height="240" rx="15" fill="#fb4a8b" opacity="0.8" filter="url(#soft-glow)" />
            <rect x="0" y="0" width="35" height="240" rx="6" fill="#5d4889" opacity="0.9" />
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1="45" y1={i * 32} x2="170" y2={i * 32} stroke="white" strokeWidth="1.5" opacity="0.4" />
            ))}
          </g>
          
          {/* Small floating books */}
          <g className="animate-float" style={{animationDelay: '0.5s'}}>
            <rect x="550" y="100" width="60" height="90" rx="6" fill="#ed65ed" opacity="0.6" />
            <rect x="550" y="100" width="12" height="90" rx="2" fill="#864ea5" opacity="0.8" />
          </g>
          
          <g className="animate-float-slow" style={{animationDelay: '1.5s'}}>
            <rect x="650" y="400" width="50" height="75" rx="5" fill="#f5a51c" opacity="0.6" />
            <rect x="650" y="400" width="10" height="75" rx="2" fill="#fb4a8b" opacity="0.8" />
          </g>
          
          <g className="animate-float" style={{animationDelay: '2.5s'}}>
            <rect x="450" y="450" width="70" height="105" rx="7" fill="#4e4cbd" opacity="0.6" />
            <rect x="450" y="450" width="14" height="105" rx="3" fill="#5d4889" opacity="0.8" />
          </g>
          
          {/* Decorative circles */}
          <circle cx="700" cy="100" r="40" fill="#864ea5" opacity="0.1" className="animate-pulse" />
          <circle cx="200" cy="500" r="60" fill="#4e4cbd" opacity="0.1" className="animate-pulse" style={{animationDelay: '1s'}} />
          <circle cx="100" cy="200" r="50" fill="#fb4a8b" opacity="0.1" className="animate-pulse" style={{animationDelay: '2s'}} />
          
          {/* Minimal decorative lines */}
          <line x1="100" y1="500" x2="300" y2="500" stroke="#d6d4d5" strokeWidth="1" opacity="0.3" strokeDasharray="5,5" />
          <line x1="600" y1="100" x2="700" y2="100" stroke="#d6d4d5" strokeWidth="1" opacity="0.3" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(0.5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.05); opacity: 0.15; }
        }
      `}</style>
    </div>
  )
}

export default Home