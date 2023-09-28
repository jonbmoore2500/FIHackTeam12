import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import ModDocContainer from "./ModDocContainer"
import OriginalDocContainer from "./OriginalDocContainer"
import UploadDocForm from "./UploadDocForm"

function DocModifierContainer() {

    const {user} = useContext(UserContext)
    const [showOriginal, setShowOriginal] = useState(true)

    
    const [originalContent, setOriginalContent] = useState({text: "", images: []})



    // upload resource form - give option for URL or uploading file from user's computer? how do we get a url to the user's own file system?

    // handle resource parsing based on what the resource is. (web page? pdf?)
    
    // pass data to this container and into modified, include function request ai modifications based on user
    
    // 

    return (
        <div>
            <UploadDocForm setOriginalContent={setOriginalContent}/>
            <button onClick={() => setShowOriginal(!showOriginal)}>Show {showOriginal ? "Modified" : "Original"}</button>
            {showOriginal ? 
                <OriginalDocContainer originalContent={originalContent} /> 
            :
                <ModDocContainer />
            }


            {/* <SaveResourceForm /> */}
        </div>
    )
}

export default DocModifierContainer