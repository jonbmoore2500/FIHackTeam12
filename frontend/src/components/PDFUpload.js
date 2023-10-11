import React, {useState} from "react"
import processPDF from "../custom_hooks/processPDF"
import {Document, Page} from '@react-pdf/renderer';


function PDFUpload() {

    const [data, setData] = useState([])
    const [file, setFile] = useState(null)

    const [showPDF, setShowPDF] = useState(false)

    const fileReader = new FileReader()

    function handleOnSubmit(e) {
        e.preventDefault()
        if (file) {
            fileReader.onload = function (e) {
                const pdfOutput = e.target.result 
                console.log(pdfOutput)
                // setData(pdfOutput)
                setShowPDF(true)
            }
            fileReader.readAsText(file)
        } else {
            setData([])
            console.log("Please select a file")
        }
    }

    function handleOnChange(e) {
        setFile(e.target.files[0])
    }

    return (
        <div>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <input 
                    type={"file"} 
                    id={"fileInput"}
                    accept={".pdf"}
                    onChange={handleOnChange}
                />
                <button type="submit">
                    Import
                </button>
            </form>
            <div>
                {/* {data.map((x, i) => (
                    <p key={i}>{x}</p>
                ))} */}
                {showPDF ? 
                <Document file={file}>
                    <Page pageNumber={1} />
                </Document>
                :
                <p>no pdf yet</p>
                }
            </div>
        </div>
    )
}

export default PDFUpload