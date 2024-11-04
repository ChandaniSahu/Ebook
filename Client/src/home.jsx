import React ,{useContext} from 'react'

const Home =()=>{


return(
    <>
   
    <div  className='flex justify-start items-center bg-cover h-screen bg-center  bg-[url("./photos/bgImage.jpg")]'>
    <div className='flex flex-col font-[Helvetica] ml-[30px]'>
        <div className='text-[#864ea5] font-[700] text-[40px] mb-[-20px] '>Welcome In</div><br/>
    <div className='text-[#4e4cbd] font-[700] text-[40px] mb-[-20px] '>ONLINE LIBRARY</div><br/>
    <pre className=' text-wrap text-[#d6d4d5] font-[Helvetica]'>            
             {
            `Your one-stop destination for 
 exploring a vast collection of books
 across various genres. Easily search, 
 read, and download books from the
 comfort of your home.`
             }
   </pre><br/>
    <button className='text-white bg-[#fb4a8b] rounded-xl w-[100px] px-[10px] py-[5px]'>Let's Start </button>
    </div>
    
   
    </div>
    </>
)
}

export default Home

// purple - #864ea5
// lightpurple -#ed65ed
// pink- #fb4a8b
//darkblue-#5d4889
// blue-#4e4cbd
// yellow -#f5a51c
// grey-#d6d4d5