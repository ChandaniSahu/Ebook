import React,{useEffect, useState} from 'react'
import {Document, Page, pdfjs } from 'react-pdf';
import './App.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const Pdf = ({pdf}) => {
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(()=>{
    console.log('charu',pdf)
  },[])
  return (
    <>
    <div >
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} >
        {Array.from(new Array(numPages), (el, index) => (
          
             <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1.5} />
          
         
        ))}
      </Document>
    </div>
    </>
    
  );
};

export default Pdf;
