import React, {useState, useContext} from "react"
import axios from "axios"
import * as cheerio from 'cheerio'
import callGPT from "../custom_hooks/callGPT.js"


// sloppy, needs tidying up

function UploadDocForm({setShowOriginal, setOriginalContent, handleModified, setEnableButton}) {

    const [url, setUrl] = useState("")
    const [text, setText] = useState("")

    const fetchContent = async (content, type) => {
        if (type === "url") {
            try {
                const response = await axios.get(content);
                const $ = cheerio.load(response.data);
        
                // Extract text content - text tends to be sloppy because of quirks of html from the webpage, but chatgpt can parse and summarize
                const text = $('body').text();
                
                // Extract image URLs
                const images = [];
                $('img').each((_, element) => {
                images.push($(element).attr('src'));
                });
                setOriginalContent({ text, images });

                try {
                    const gptResults = await callGPT(text, images)
                    handleModified(gptResults)
                } catch (error) {
                    console.error("an error occurred with GPT:", error)
                }

            } catch (error) {
                console.error('Error fetching content:', error);
            }
        } else {
            setOriginalContent({text: content})
            try {
                const gptResults = await callGPT(content)
                handleModified(gptResults)
            } catch (error) {
                console.error('an error occurred with GPT:', error);
            }
        }
    }

    // function handleSubmitURL(e) {
    //     e.preventDefault()
    //     setShowOriginal(true)
    //     setEnableButton(true)
    //     fetchContent(url, "url")
    // }

    function handleSubmitText(e) {
        e.preventDefault()
        if (text.length > 0) {
            setShowOriginal(true)
            setEnableButton(true)
            fetchContent(text, "text")
        }
    }

    return (

        <form onSubmit={handleSubmitText} id="modifyForm">
            <div id="modifyFormDiv">
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="4"
                    cols="100"
                    id="modifyTextInput"
                    placeholder="Input text here"
                    // make this bigger
                />
                <button type="submit" className="modifyButton">Generate</button>
            </div>
        </form>

    )
}

export default UploadDocForm