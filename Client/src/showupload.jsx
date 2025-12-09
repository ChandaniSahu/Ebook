import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { ImCross } from "react-icons/im";
import { context } from './App'

const ShowUpload = () => {
  const navigate = useNavigate()
  const { showUpload, setShowUpload } = useContext(context)
  return (
    <div className={showUpload === true ? 'fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm' : 'hidden'}>
      <div className='relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100'>
        <div className='text-center'>
          <h1 className='text-[#4e4cbd] font-semibold text-xl mb-6 leading-relaxed'>
            Sorry! You need to upload a PDF first before you can download any books.
          </h1>
          <button
            className='bg-gradient-to-r from-[#fb4a8b] to-[#ed65ed] text-white rounded-xl px-8 py-3 font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            onClick={() => { navigate('/pdfupload'); setShowUpload(false) }}
          >
            Upload Now
          </button>
        </div>

        <button
          className='absolute top-4 right-4 text-[#4e4cbd] hover:text-[#fb4a8b] transition-colors duration-200'
          onClick={() => { setShowUpload(false) }}
        >
          <ImCross size='20px' />
        </button>
      </div>
    </div>
  )
}

export default ShowUpload
