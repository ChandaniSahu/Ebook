import React, { useContext, useEffect, useState } from 'react'

import firebase from './firebase';
import 'firebase/storage';
import axios from 'axios'
import * as pdfjsLib from 'pdfjs-dist';
import { context } from './App';
import { Oval } from 'react-loader-spinner';
import ShowDownload from './showDownload';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfUpload = () => {//

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

  //  const StringMatch =(str1,str2) =>{
  //    console.log('strings',str1,str2)
  //    if (str1.toLowerCase() === str2.toLowerCase()) {
  //     console.log("Strings are equal (case-insensitive)");
  //     return 1
  //   } else {
  //     console.log("Strings are not equal");
  //     return 0
  //   }
  //  }



  // const textExtract =async(pdf)=>{
  //    console.log('psdf in textextract',pdf)
  //     try{
  //       console.log('start extracting',pdf)
  //       let loadingTask;
  //       if (typeof pdf === 'string') {
  //         loadingTask = pdfjsLib.getDocument(pdf);
  //       } else if (pdf instanceof Uint8Array || pdf instanceof ArrayBuffer) {
  //         loadingTask = pdfjsLib.getDocument({ data: pdf });
  //       } else if (pdf instanceof File) {
  //         const arrayBuffer = await pdf.arrayBuffer();
  //         loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  //       } else {
  //         throw new Error('Unsupported PDF format.');
  //       }

  //       const pdfDocument = await loadingTask.promise;

  //       // Ensure the requested page is within the range of available pages
  //       const pageNumber = 20; // You can make this dynamic if needed


  //       const page = await pdfDocument.getPage(pageNumber); // Extract text from the specified page
  //       const textContent = await page.getTextContent();
  //       const pageText = textContent.items.map((item) => item.str).join(' '); // Extract and join the te
  //       console.log('pagetext',pageText)
  //       const words = pageText.split(/\s+/).filter(word => word.length > 0);
  //     const firstTenWords = words.slice(0, 10).join(' ');

  //     // Update the state with the extracted words
  //     setbook((prev)=>{
  //       const updateBook ={...prev,pagetext:firstTenWords}
  //       return updateBook
  //     });
  //   }catch(e){
  //     console.log('error in textextract',e)
  //   }

  // }


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
      }

      else
        console.log('error in uploading pdf in firebase')
    } catch (e) {
      console.log('error in storeinfirebase', e)
    }

  }

  //const checkBookdetails= async() => {
  //https://www.googleapis.com/books/v1/volumes?q=intitle:your_book_title&key=YOUR_API_KEY
  //try {
  // const res = await axios.get(`https://Open-Library-API.proxy-production.allthingsdev.co/search.json?title=${book.title}`,{
  //   headers: { 
  //   "x-apihub-key":"uuBYdiT-BTCq1xTN6b6H7N8OtymqUQKMEWfJGWuElg-mwZYXEM",
  //   "x-apihub-host":"Open-Library-API.allthingsdev.co",
  //   "x-apihub-endpoint": "7843fb3f-2f97-4a10-8693-1b6f27b5f99a"
  //  }
  // })
  // const title ='let us c'
  // const key='AIzaSyDKzA1vuuxpLSbdbyjUYvL0fXaKvHJE8sQ'
  // const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=${key}`)
  // console.log('res',res)
  //   if(res.data.docs[0]!='' && res.data.docs[0]!=null){
  //     StringMatch(res.data.docs[0].title,book.title)
  //     const isMatch = StringMatch(res.data.docs[0].title,book.title)
  //     if(isMatch==1){
  //      console.log('finallly',book)
  //      const doc = res.data.docs[0];

  //       if (doc?.title && doc?.author_name && doc?.publisher && 
  //        doc?.cover_edition_key) {
  //         setbook((prev)=>{
  //           const updateBook={
  //            ...prev,
  //             title: doc.title, // Only set if title exists
  //            author: doc.author_name[0], // Only set if author exists
  //            publisher: doc.publisher[0], // Only set if publisher exists
  //            image: `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-L.jpg`, // Set only if cover_edition_key exists
  //           }
  //           return updateBook
  //           });
  //       }
  //    }
  //        else
  //       alert('your book name is wrong')
  // }
  //  else
  //   alert('your book name is wrong')
  // }catch(e){
  // console.log('error in checkbookdetails',e)
  // }

  // }       



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
      }
      else
        console.log('did not get all the info')


    }
    catch {
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
        //  setPdf(selectedpdf)
        //console.log('pdf',selectedpdf)

        // await checkBookdetails()
        // await textExtract(selectedpdf)
        await storeinFirebase(pdf)
        // console.log('url',book.url)
        // await storeinDatabase()}
      }
    }
    catch (e) {
      console.log('error in handlechoosepdf', e)
    }

  }

  return (
    <>
      <div className='relative bg-[#5d4889] rounded-[10px] mt-[100px] mb-[40px] w-[500px] m-[auto] flex flex-col justify-center items-center py-[20px]'
        style={{ boxShadow: '1px 1px 10px 4px gray' }}>
        <h1 className='text-[#fed573] font-[500] text-[30px]' >Pdf Upload</h1><br />

        <div>
          <lable className='text-[#fed573]' >Book Name :</lable><br />
          <input className='w-[300px]' type='text' placeholder='Enter here...' onChange={handleInput} name='title' value={book.title} />
        </div><br />

        <div>
          <lable className='text-[#fed573]' >Author Name :</lable><br />
          <input className='w-[300px]' type='text' placeholder='Enter here...' onChange={handleInput} name='author' value={book.author} />
        </div><br />

        <div>
          <lable className='text-[#fed573]' >Eddition :</lable><br />
          <input className='w-[300px]' type='text' placeholder='Enter here...' onChange={handleInput} name='eddition' value={book.eddition} />
        </div><br />

        <div>
          <lable className='text-[#fed573]' >Publication :</lable><br />
          <input className='w-[300px]' type='text' placeholder='Enter here...' onChange={handleInput} name='publisher' value={book.publisher} />
        </div><br />

        <div>
          <lable className='text-[#fed573]' >Choose Book Pdf : </lable><br />
          <input type='file' accept="application/pdf" className='text-white' onChange={handlePdf} />
        </div><br />


        <button onClick={uploadPdf} className='text-white bg-[#fb4a8b] rounded-xl  px-[10px] py-[5px]'>{loading === false ? <h1 className='px-[5px]'>Upload</h1> : <div className='flex items-center space-x-[10px]'> <Oval color="white" secondaryColor="white" height={25} width={25} strokeWidth={5} /><h1 className='text-20px'>Uploading...</h1></div>}</button>
 
    <div className='max-w-full absolute left-[50px] top-[150px]'>{uDetail.uploadUrl && <ShowDownload />}</div>
        
      </div>






    </>
  )
}
export default PdfUpload




