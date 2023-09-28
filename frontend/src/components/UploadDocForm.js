import React, {useState, useContext} from "react"
import axios from "axios"
import * as cheerio from 'cheerio'

function UploadDocForm({setOriginalContent}) {

    const [url, setUrl] = useState("")

    const fetchContent = async (url) => {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
      
            // Extract text content - text tends to be sloppy because of quirks of html from the webpage, but chatgpt can parse and summarize
            const text = $('body').text();
      
            // Extract image URLs
            const images = [];
            $('img').each((_, element) => {
              images.push($(element).attr('src'));
            });
      
            setOriginalContent({ text, images });
          } catch (error) {
            console.error('Error fetching content:', error);
          }
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetchContent(url)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button type="submit">Fetch Content</button>
            </form>
        </div>
    )
}

export default UploadDocForm