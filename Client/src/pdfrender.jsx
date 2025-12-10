import React, { useContext, useEffect, useState } from 'react'
import Pdf from './pdf'
import './index.css'
import ShowUpload from './showupload';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import booklogo from './photos/bookImage.png'
import readbook from './photos/readbook.jpg'
import downloadbook from './photos/bookdownload.png'
import axios from 'axios'
import { context } from './App';
import { ThreeCircles } from 'react-loader-spinner';

const PdfRender = () => {
  const [books, setBooks] = useState('')
  const [Url, setUrl] = useState('')
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchedBooks, setSearchedBooks] = useState()
  const { uDetail, setUDetail, showUpload, setShowUpload, setShowDownload, setClick } = useContext(context)

  const fetchBookdetails = async () => {
    try {
      const res = await axios.get('https://ebook-orcin-alpha.vercel.app/api/getBookdetails')
      console.log('bookdetails', res.data)
      setBooks(res.data)
    }
    catch (e) {
      console.log('error in fetchbookdetails', e)
    }
  }

  useEffect(() => {
    fetchBookdetails()
  }, [])

  useEffect(() => {
    console.log('uploadurl', uDetail.uploadUrl)
  })

  const searchBook = () => {
    let found = false
    books.map((ele) => {
      if (search.toLowerCase() == ele.title.toLowerCase()) {
        setSearchedBooks(ele)
        console.log(ele.title)
        found = true
        setSearching(true)
      }
    })
    if (found === false) {
      setSearchedBooks([])
      setSearching(true)
    }
  }

  const handleDonwloadPdf = async (pdfUrl) => {
    console.log('handleDownloadPdf', pdfUrl)
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }

  return (
    <div className='pt-[90px] flex-col space-y-6 sm:flex-row flex bg-gradient-to-br from-white via-[#f9f7ff] to-[#f0eaff] min-h-screen mx-auto py-[50px] px-4 justify-between items-start max-w-full'>
      {/* Book List Sidebar */}
      <div className='flex flex-col w-full max-w-sm mx-4 pt-4 rounded-[20px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'>
        {/* Search Section */}
        <div className='flex items-center justify-center space-x-4 mb-2'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search books...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-48 px-4 py-3 pr-10 border border-[#d6d4d5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fb4a8b] focus:border-transparent transition-all duration-200'
            />
            {search && (
              <button
                onClick={() => { setSearch(''); setSearching(false); setSearchedBooks(''); }}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold'
              >
                ×
              </button>
            )}
          </div>
          <button
            onClick={searchBook}
            className='bg-gradient-to-r from-[#fb4a8b] to-[#ed65ed] text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            Search
          </button>
        </div>

        {/* Books Container */}
        <div className='flex flex-col items-center h-[600px] overflow-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-4'>
          {searching === false ? (
            <>
              {books == '' ? (
                <div className='flex flex-col items-center justify-center h-full'>
                  <ThreeCircles color="#4e4cbd" height={50} width={50} />
                  <h1 className='text-[#4e4cbd] font-medium mt-4'>Loading books...</h1>
                </div>
              ) : (
                <>
                  {books != '' && books.map((ele) => (
                    <div
                      key={ele.id || ele.title}
                      className='w-48 h-auto bg-gradient-to-br from-[#5d4889] to-[#4e4cbd] py-6 my-4 mx-2 flex flex-col items-center rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-white/30'
                    >
                      <img src={booklogo} width='80px' height='80px' className='mb-4 rounded-lg' />
                      <h1 className='text-white text-center font-medium px-2 mb-4'>{ele.title}</h1>

                      <div className='flex flex-col space-y-3 w-full px-4'>
                        <button
                          className='bg-gradient-to-r from-[#fb4a8b] to-[#ed65ed] text-white rounded-xl px-4 py-2 font-medium hover:scale-105 transition-all duration-200 shadow-md'
                          onClick={() => setUrl(ele.url)}
                        >
                          Read
                        </button>
                        <div>
                          {uDetail.uploadUrl == false ? (
                            <button
                              className='bg-green-500 text-white rounded-xl px-4 py-2 font-medium hover:scale-105 transition-all duration-200 shadow-md w-full'
                              onClick={() => { setShowUpload(true); setClick('u') }}
                            >
                              Download
                            </button>
                          ) : (
                            <button
                              className='bg-green-500 text-white rounded-xl px-4 py-2 font-medium hover:scale-105 transition-all duration-200 shadow-md w-full'
                              onClick={() => { handleDonwloadPdf(ele.url); setUDetail({ uploadUrl: false }) }}
                            >
                              Download
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {searching && searchedBooks.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-full'>
                  <h1 className='text-[#4e4cbd] font-medium text-xl'>No books found</h1>
                  <p className='text-gray-500 mt-2'>Try a different search term</p>
                </div>
              ) : (
                <>
                  {searchedBooks != '' && (
                    <div className='w-48 h-auto bg-gradient-to-br from-[#5d4889] to-[#4e4cbd] py-6 my-4 mx-2 flex flex-col items-center rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-white/30'>
                      <img src={booklogo} width='80px' height='80px' className='mb-4 rounded-lg' />
                      <h1 className='text-white text-center font-medium px-2 mb-4'>{searchedBooks.title}</h1>

                      <div className='flex flex-col space-y-3 w-full px-4'>
                        <button
                          className='bg-gradient-to-r from-[#fb4a8b] to-[#ed65ed] text-white rounded-xl px-4 py-2 font-medium hover:scale-105 transition-all duration-200 shadow-md'
                          onClick={() => setUrl(searchedBooks.url)}
                        >
                          Read
                        </button>
                        <div>
                          {uDetail.uploadUrl == false ? (
                            <button
                              className='bg-green-500 text-white rounded-xl px-4 py-2 font-medium hover:scale-105 transition-all duration-200 shadow-md w-full'
                              onClick={() => { setShowUpload(true); setClick('u') }}
                            >
                              Download
                            </button>
                          ) : (
                            <button
                              className='bg-green-500 text-white rounded-xl px-4 py-2 font-medium hover:scale-105 transition-all duration-200 shadow-md w-full'
                              onClick={() => { handleDonwloadPdf(searchedBooks.url) }}
                            >
                              Download
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {Url == '' ? (
        <div className='flex-1 max-w-4xl mx-4 rounded-[20px] shadow-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'>
          <div className='bg-white/80 backdrop-blur-md border rounded-[20px] border-white/50 p-8 transform transition-all duration-300  hover:shadow-3xl'>
            <h1 className='text-[#864ea5] font-bold text-4xl text-center mb-6'>Book Library</h1>
            <p className='text-gray-700 text-xl text-center leading-relaxed mb-8'>
              Discover a vast collection of books across various genres. Read and download books from the comfort of your home.
            </p>

            <div className='flex justify-center gap-16 mb-8'>
              <div className='flex flex-col items-center group'>
                <img
                  src={readbook}
                  width='180px'
                  height='180px'
                  className='rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 group-hover:scale-110 mb-4 border-4 border-white'
                />
                <h1 className='text-[#4e4cbd] text-3xl font-semibold group-hover:scale-110 transition-all duration-300'>Read</h1>
              </div>

              <div className='flex flex-col items-center group'>
                <img
                  src={downloadbook}
                  width='180px'
                  height='180px'
                  className='rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 group-hover:scale-110 mb-4 border-4 border-white'
                />
                <h1 className='text-[#4e4cbd] text-3xl font-semibold group-hover:scale-110 transition-all duration-300'>Download</h1>
              </div>
            </div>

            <div className='relative'>
              {showUpload && <ShowUpload />}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex-1 max-w-4xl mx-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'>
          <div className='overflow-auto h-[700px] bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-4'>
            {Url && <Pdf pdf={Url} />}
          </div>
        </div>
      )}
    </div>
  )
}
export default PdfRender
