import React, { useContext, useEffect, useState } from 'react'

import firebase from './firebase';
import 'firebase/storage';
import axios from 'axios'
import * as pdfjsLib from 'pdfjs-dist';
import { context } from './App';
import { Oval } from 'react-loader-spinner';
import ShowDownload from './showDownload';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfUpload = () => {

  const [book, setbook] = useState({ title: '', author: '', eddition: '', publisher: '', url: '' })
  const [loading, setLoading] = useState(false)
  const { uDetail, setUDetail } = useContext(context)
  const [pdf, setPdf] = useState('')
  const handleInput = (e) => {
    setbook({ ...book, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    console.log('book', book)
  }, [book])

  useEffect(() => {
    console.log('pdf', pdf)
  }, [pdf])

  useEffect(() => {
    if (book.url != '') {
      storeinDatabase()
    }
  }, [book.url])

  const storeinFirebase = async (pdf) => {
    setLoading(true)
    console.log('pdf in storein firebase', pdf)
    try {
      console.log('storing in firebase')
      const storage = firebase.storage()
      const storageRef = storage.ref('pdf/' + pdf.name)
      await storageRef.put(pdf);
      const downloadUrl = await storageRef.getDownloadURL();
      console.log('downloadurl', downloadUrl)
      if (downloadUrl != '' && downloadUrl != undefined) {
        setbook((prev) => {
          const updateBook = { ...prev, url: downloadUrl }
          return updateBook
        })
      } else
        console.log('error in uploading pdf in firebase')
    } catch (e) {
      console.log('error in storeinfirebase', e)
    }
  }

  const storeinDatabase = async () => {
    try {
      if (book.title && book.author && book.publisher && book.eddition && book.url) {
        console.log('storing in database....')
        const dbres = await axios.post('https://ebook-orcin-alpha.vercel.app/api/storeBookdetail', book)
        console.log('dbres', dbres)

        if (dbres.data.msg === 'book uploaded successfully')
          setUDetail({ uploadUrl: true })
        else if (dbres.data.msg === 'book already exists')
          alert('Book already exists!')
        else alert('unsucessfully uploaded')

        setbook({ title: '', author: '', eddition: '', publisher: '', url: '' })
        setPdf(null)
        setLoading(false)
      } else
        console.log('did not get all the info')
    } catch {
      console.log('error in storing detail in database')
    }
  }

  const handlePdf = (e) => {
    const selectedpdf = e.target.files[0]
    if (!selectedpdf || !selectedpdf.name.endsWith('.pdf')) {
      alert('please select pdf file')
      return
    }
    else setPdf(selectedpdf)
  }

  const uploadPdf = async (e) => {
    try {
      if (!book.title || !book.author || !book.eddition || !book.publisher || !pdf) alert('Fill all the info')
      else {
        console.log('pdf', pdf)
        await storeinFirebase(pdf)
      }
    } catch (e) {
      console.log('error in handlechoosepdf', e)
    }
  }

  return (
    <div className='pt-[100px] flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-[#f9f7ff] to-[#f0eaff]'>
      <div className='max-w-lg w-full mx-4'>
        <div className='shadow-[0_0_10px_rgba(0,0,0,0.15)] mb-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl'>
          <h1 className='text-[#864ea5] font-[700] text-3xl text-center mb-8'>Upload PDF</h1>

          <div className='space-y-6'>
            <div>
              <label className='text-[#4e4cbd] font-medium mb-2 block'>Book Name :</label>
              <input
                className='w-full px-4 py-3 border border-[#d6d4d5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fb4a8b] focus:border-transparent transition-all duration-200'
                type='text'
                placeholder='Enter book name...'
                onChange={handleInput}
                name='title'
                value={book.title}
              />
            </div>

            <div>
              <label className='text-[#4e4cbd] font-medium mb-2 block'>Author Name :</label>
              <input
                className='w-full px-4 py-3 border border-[#d6d4d5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fb4a8b] focus:border-transparent transition-all duration-200'
                type='text'
                placeholder='Enter author name...'
                onChange={handleInput}
                name='author'
                value={book.author}
              />
            </div>

            <div>
              <label className='text-[#4e4cbd] font-medium mb-2 block'>Edition :</label>
              <input
                className='w-full px-4 py-3 border border-[#d6d4d5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fb4a8b] focus:border-transparent transition-all duration-200'
                type='text'
                placeholder='Enter edition...'
                onChange={handleInput}
                name='eddition'
                value={book.eddition}
              />
            </div>

            <div>
              <label className='text-[#4e4cbd] font-medium mb-2 block'>Publication :</label>
              <input
                className='w-full px-4 py-3 border border-[#d6d4d5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fb4a8b] focus:border-transparent transition-all duration-200'
                type='text'
                placeholder='Enter publisher...'
                onChange={handleInput}
                name='publisher'
                value={book.publisher}
              />
            </div>

            <div>
              <label className='text-[#4e4cbd] font-medium mb-2 block'>Choose PDF File :</label>
              <input
                type='file'
                accept="application/pdf"
                className='w-full px-4 py-3 border border-[#d6d4d5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fb4a8b] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#fb4a8b] file:text-white file:cursor-pointer hover:file:bg-[#ed65ed]'
                onChange={handlePdf}
              />
            </div>
          </div>

          <button
            onClick={uploadPdf}
            className='w-full mt-8 bg-gradient-to-r from-[#fb4a8b] to-[#ed65ed] text-white rounded-xl py-4 px-6 font-medium text-lg relative overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
            {loading === false ? (
              <span>Upload PDF</span>
            ) : (
              <div className='flex items-center justify-center space-x-3'>
                <Oval color="white" secondaryColor="white" height={25} width={25} strokeWidth={5} />
                <span>Uploading...</span>
              </div>
            )}
          </button>

          <div className='relative mt-4'>
            {uDetail.uploadUrl && <ShowDownload />}
          </div>
        </div>
      </div>
    </div>
  )
}
export default PdfUpload
