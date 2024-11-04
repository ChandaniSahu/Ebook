import React, { useContext, useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {context} from './App'
// Set the worker source manually for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Compdf = () => { // Removed the comment about page number
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const {setUDetail,uDetail}= useContext(context)
  useEffect(() => {
    if (!uDetail.pdf) {
      setError('No PDF source provided.');
      return;
    }

    const pdfExtract = async () => {
      try {
        console.log('start extracting',uDetail.pdf)
        let loadingTask;
        if (typeof uDetail.pdf === 'string') {
          loadingTask = pdfjsLib.getDocument(uDetail.pdf);
        } else if (uDetail.pdf instanceof Uint8Array || uDetail.pdf instanceof ArrayBuffer) {
          loadingTask = pdfjsLib.getDocument({ data: uDetail.pdf });
        } else if (uDetail.pdf instanceof File) {
          const arrayBuffer = await uDetail.pdf.arrayBuffer();
          loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        } else {
          throw new Error('Unsupported PDF format.');
        }

        const pdfDocument = await loadingTask.promise;

        // Ensure the requested page is within the range of available pages
        const pageNumber = 3; // You can make this dynamic if needed
        if (pageNumber < 1 || pageNumber > pdfDocument.numPages) {
          throw new Error(`Page number ${pageNumber} is out of range.`);
        }

        const page = await pdfDocument.getPage(pageNumber); // Extract text from the specified page
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' '); // Extract and join the text
        setText(pageText);
        setUDetail({...uDetail,pdf:text})
      } catch (err) {
        console.error('Error extracting text from PDF:', err);
        setError(err.message || 'Failed to extract text from PDF.');
      }
    };

    pdfExtract();
  }, [ uDetail.pdf]); // Added dependency array

  return (
    <div>
      <h3>Extracted Text from Page 1:</h3>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <pre style={{ whiteSpace: 'pre-wrap', color: 'black' }}>{text}</pre>
      )}
    </div>
  );
};

export default Compdf;



