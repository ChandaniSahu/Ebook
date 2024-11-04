import React ,{useState , useEffect} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './home'
import Navbar from './navbar'
import PdfUpload from './pdfUpload'
import PdfRender from './pdfrender'
import ShowUpload from './showupload'
import Compdf from './compdf'
import { createContext } from 'react'
import axios from 'axios'
import Pdf from './pdf'
import ShowDownload from './showDownload'
// import Trial from './trial'
const context = createContext()

const App =() =>{
  

  const [click,setClick] = useState('')
  const [showDownload,setShowDownload] =useState(false)
  const [showUpload,setShowUpload] = useState(false)
  const[uDetail,setUDetail] = useState(()=>{
    const retrievedDetails = localStorage.getItem('uDetail')
    if(retrievedDetails==='undefined' || retrievedDetails==='null' || retrievedDetails===null || retrievedDetails===undefined ){
      return {uploadUrl:false}
 
    }else{
     return JSON.parse(retrievedDetails)
    }
   })

   useEffect(()=>{
    
     console.log('uploadUrl',uDetail.uploadUrl)
  },[uDetail])

  useEffect(()=>{
    console.log('showDownload',showDownload)
 },[showDownload])
  
 
  useEffect(()=>{
    localStorage.setItem('uDetail',JSON.stringify(uDetail))
  },[uDetail])
  return(
    <>
    <BrowserRouter>
  <context.Provider value={{
      uDetail,
      setUDetail,
      showUpload,
      setShowUpload,
      click,
      setClick,
      showDownload,
      setShowDownload

  }}>
   <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      {/* <Route path='/signup' element={<Signup/>}></Route> */}
        {/* <Route path='/login' element={<Login/>}></Route> */}
        <Route path='/pdfupload' element={<PdfUpload/>}></Route>
        <Route path='/pdfrender' element={<PdfRender/>}></Route>
        <Route path='/showupload' element={<ShowUpload/>}></Route>
        <Route path='/showdownload' element={<ShowDownload/>}></Route>
        <Route path='/pdf' element={<Pdf/>}></Route>
        {/* <Route path='/trial' element={<Trial/>}></Route> */}
      </Routes>
     </context.Provider>
 </BrowserRouter>
   </>
  )
}

export default App
export {context}