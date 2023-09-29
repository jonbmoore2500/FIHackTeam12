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

    function handleSubmitURL(e) {
        e.preventDefault()
        setShowOriginal(true)
        setEnableButton(true)
        fetchContent(url, "url")
    }

    function handleSubmitText(e) {
        e.preventDefault()
        setShowOriginal(true)
        setEnableButton(true)
        fetchContent(text, "text")
    }

    return (
        <div>
            <form onSubmit={handleSubmitURL}>
                <input 
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button type="submit">Process URL</button>
            </form>
            <form onSubmit={handleSubmitText}>
                <input 
                    type="text"
                    placeholder="Enter Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit">Process Text</button>
            </form>
        </div>
    )
}

export default UploadDocForm