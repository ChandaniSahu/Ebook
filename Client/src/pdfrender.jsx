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

const PdfRender = () => {
  const [books, setBooks] = useState('')
  const [Url, setUrl] = useState('')
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchedBooks, setSearchedBooks] = useState([])
  const { uDetail, setUDetail, showUpload, setShowUpload ,setShowDownload,setClick} = useContext(context)

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

useEffect(()=>{
  console.log('uploadurl',uDetail.uploadUrl)
})
  const searchBook = () => {
    let found = false
    console.log('books in search() ',books)
    books.map((ele) => {
      if (search.toLowerCase() == ele.title.toLowerCase()) {
        setSearchedBooks([ele])
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

  const handleDonwloadPdf = async(pdfUrl)=>{
    console.log('handleDownloadPdf',pdfUrl)
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob(); // Convert response to a Blob
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); // Specify file name
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link); // Clean up
      window.URL.revokeObjectURL(url); // Revoke the object URL
    } catch (error) {
      console.error('Download failed:', error);
    }
  }
  return (
    <>
      <div className='flex  bg-[#e6e0e3] h-[120vh] py-[100px] justify-between pr-[20px] scrollNone'>
        <div className='flex flex-col overflow-auto h-[570px] w-[330px]  items-center  ' >
          <div className='flex items-center justify-center space-x-[5px]'>
            <input type='text' placeholder='Search book here....'
              onChange={(e) => setSearch(e.target.value)} className='w-[220px]' style={{ boxShadow: '1px 1px 6px 2px gray' }}/>
            <button onClick={searchBook} className='bg-[#fb4a8b] text-white w-[80px]' style={{ boxShadow: '1px 1px 6px 2px gray' }}>Search</button>
          </div>

          {searching === false ?
            <>
              {books != '' &&
                <>
                  {books.map((ele) => {
                    return (
                      <>
                        <div className='w-[200px] h-[auto] bg-[#5d4889]  py-[10px] my-[10px] justify-center items-center 
                      flex flex-col rounded-[10px]' style={{ boxShadow: '1px 1px 10px 4px gray' }}>
                          <img src={booklogo} width='100px' height='100px' />
                          <h1 className='text-white  text-center '>{ele.title}</h1><br />

                          <div className='flex flex-col  space-y-[10px]'>
                            <button className='bg-[#fb4a8b] text-white rounded-xl w-[100px] 
                          px-[10px] py-[5px]' onClick={() => setUrl(ele.url)}>Read</button>
                            <div>
                              {uDetail.uploadUrl == false ? <button className='bg-green-500 text-white rounded-xl w-[100px] px-[10px] py-[5px]'
                                onClick={() => { setShowUpload(true);setClick('u') }} >Download</button> :
                                // <a href={ele.url} download={`${ele.title}.pdf`} target='_blank' rel="noopener noreferrer"
                                //   onClick={(e) => { e.stopPropagation(); }}>
                                  <button className='bg-green-500 text-white rounded-xl w-[100px] px-[10px] py-[5px]' 
                                  onClick={()=>{handleDonwloadPdf(ele.url),setUDetail({uploadUrl:false})}}>Download</button>
                                // </a>
                                }
                            </div>
                          </div>


                        </div>

                      </>
                    )
                  })}
                </>
              }
            </> :
            <>
              {searching && searchedBooks.length === 0 ? <h1>Not Found</h1> : <>
                {searchedBooks != '' &&
                  <>
                    {searchedBooks.map((ele) => {
                      return (
                        <>
                          <div className='w-[200px] h-[auto] bg-[#5d4889]  mx-[20px] py-[10px] my-[10px] justify-center items-center 
                      flex flex-col rounded-[10px]' style={{ boxShadow: '1px 1px 10px 4px gray' }}>
                            <img src={booklogo} width='100px' height='100px' />
                            <h1 className='text-white  text-center '>{ele.title}</h1><br />

                            <div className='flex flex-col  space-y-[10px]'>
                              <button className='bg-[#fb4a8b] text-white rounded-xl w-[100px] 
                          px-[10px] py-[5px]' onClick={() => setUrl(ele.url)}>Read</button>
                              <div>
                                {uDetail.uploadUrl == false ? <button className='bg-green-500 text-white rounded-xl w-[100px] px-[10px] py-[5px]'
                                  onClick={() => { setShowUpload(true);setClick('u') }} >Download</button> :
                                  <button className='bg-green-500 text-white rounded-xl w-[100px] px-[10px] py-[5px]' 
                                  onClick={()=>{handleDonwloadPdf(ele.url)}}>Download</button>}
                              </div>
                            </div>


                          </div>

                        </>
                      )
                    })}
                  </>
                }</>}
            </>}

        </div>




        {Url == '' ?
          <div className=' w-[850px]  bg-gray-300 h-[580px] p-[15px] rounded-lg ' style={{ boxShadow: '1px 1px 10px 4px gray' }}>


            <h1 className='text-black font-[500] text-[40px] text-center'>Book Library</h1><br />
            <h1 className='text-[35px] text-center '
            >There are alots of book in this online Library , you can explore these
              books and increase your knowledge ,You can</h1><br /><br />
            <div className='flex justify-center gap-[130px]'>
              <span className='flex flex-col justify-center items-center ' >
                <img src={readbook} width='200px' height='200px' className='rounded-[50%] hover:scale-105 ' />
                <h1 className='text-[40px] font-[Helvetica] '>Read</h1>
              </span>

              <span className='flex flex-col justify-center items-center'>
                <img src={downloadbook} width='200px' height='200px' className='rounded-[50%] hover:scale-105' />
                <h1 className='text-[40px] font-[Helvetica] '>Download</h1>
              </span>

            </div>
          </div> :
          <div className='overflow-auto overflow-x-hidden w-[850px] h-[570px] z-0 ' style={{ boxShadow: '1px 1px 10px 4px gray' }}>
            {
              Url && <Pdf pdf={Url} />
            }
          </div>
        }
        {showUpload && <ShowUpload />}
      </div>



    </>
  )
}
export default PdfRender
// import { FaBook } from "react-icons/fa";
// <FaBook />            








