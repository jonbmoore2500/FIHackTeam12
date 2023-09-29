import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import ModDocContainer from "./ModDocContainer"
import OriginalDocContainer from "./OriginalDocContainer"
import UploadDocForm from "./UploadDocForm"
import callGPT from "../custom_hooks/callGPT.js"

function DocModifierContainer() {

    const {user} = useContext(UserContext)
    const [showOriginal, setShowOriginal] = useState(true)

    
    const [originalContent, setOriginalContent] = useState({text: "", images: []})

    const [modifiedContent, setModifiedContent] = useState({texts: [], images: []})

    // setModifiedContent(callGPT(originalContent.text, originalContent.images))

    // upload resource form - give option for URL or uploading file from user's computer? how do we get a url to the user's own file system?

    // handle resource parsing based on what the resource is. (web page? pdf?)
    
    // pass data to this container and into modified, include function request ai modifications based on user
    
    // 

    return (
        <div>
            <UploadDocForm setOriginalContent={setOriginalContent} setModifiedContent={setModifiedContent}/>
            <button onClick={() => setShowOriginal(!showOriginal)}>Show {showOriginal ? "Modified" : "Original"}</button>
            {showOriginal ? 
                <OriginalDocContainer originalContent={originalContent} /> 
            :
                <>
                    {modifiedContent.texts.length > 0 || modifiedContent.images.length > 0 ? <ModDocContainer obj={modifiedContent}/> : <ModDocContainer />} 
                    {/* insert loading screen if no modified content? */}
                </>
            }


            {/* <SaveResourceForm /> */}
        </div>
    )
}

export default DocModifierContainer