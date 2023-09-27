import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import axios from "axios"
import * as cheerio from 'cheerio'

function DocModifierContainer() {

    const {user} = useContext(UserContext)
    const [url, setUrl] = useState("")
    const [originalContent, setOriginalContent] = useState({text: "", images: []})

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

    // upload resource form - give option for URL or uploading file from user's computer? how do we get a url to the user's own file system?

    // handle resource parsing based on what the resource is. (web page? pdf?)
    
    // pass data to this container and into modified, include function request ai modifications based on user
    
    // 

    return (
        <div>


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
            <div>
            {/* copies a whole block of text, formatted strangely. not sure how to deal with this, is going to depend on the unique html layout of every page  */}
                {originalContent.text} 
                {originalContent.images.map((src, i) => (
                    <img key={i} src={src} alt={`Image ${i}`} />
                ))}
            </div>
        </div>
    )
}

export default DocModifierContainer