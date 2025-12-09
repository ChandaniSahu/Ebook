import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImCross } from "react-icons/im";
import { context } from './App';

const ShowDownload = () => {
  const navigate = useNavigate()
  const { setClick, uDetail, setShowDownload, showDownload } = useContext(context)

  return (
    <div className={showDownload === false && uDetail.uploadUrl ? 'fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm' : 'hidden'}>
      <div className='relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100'>
        <div className='text-center'>
          <div className='mb-4'>
            <svg className='w-16 h-16 text-green-500 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
            </svg>
          </div>
          <h1 className='text-[#4e4cbd] font-semibold text-xl mb-6 leading-relaxed'>
            PDF uploaded successfully! You can now download books.
          </h1>
          <button
            className='bg-green-500 text-white rounded-xl px-8 py-3 font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            onClick={() => { navigate('/pdfrender'); setShowDownload(true); setClick('l') }}
          >
            Download Now
          </button>
        </div>

        <button
          className='absolute top-4 right-4 text-[#4e4cbd] hover:text-[#fb4a8b] transition-colors duration-200'
          onClick={() => { setShowDownload(true) }}
        >
          <ImCross size='20px' />
        </button>
      </div>
    </div>
  )
}

export default ShowDownload
