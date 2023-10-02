import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import ModDocContainer from "./ModDocContainer"
import OriginalDocContainer from "./OriginalDocContainer"
import UploadDocForm from "./UploadDocForm"
import SaveResourceForm from "./SaveResourceForm"

function DocModifierContainer() {

    const {user} = useContext(UserContext)

    const [showOriginal, setShowOriginal] = useState(true)
    const [modal, setModal] = useState(false)

    const [originalContent, setOriginalContent] = useState({text: "", images: []})

    const [modifiedContent, setModifiedContent] = useState({texts: [], images: []})
    const [enableButton, setEnableButton] = useState(true)


    function handleModified(results) {
        setModifiedContent(results)
        setEnableButton(false)
    }


    return (
        <div>
            <UploadDocForm setShowOriginal={setShowOriginal} setOriginalContent={setOriginalContent} handleModified={handleModified} setEnableButton={setEnableButton}/>
            <div className="resourceButtonsDiv">
                <button
                    onClick={() => setModal(true)}
                    disabled={enableButton}
                    className="resourceButton"
                >
                    Save Resource
                </button>
                <button 
                    onClick={() => setShowOriginal(!showOriginal)}
                    disabled={enableButton}
                    className="resourceButton"
                >
                    Show {showOriginal ? "Modified" : "Original"}
                </button>
            </div>
            <div id="materialsContainer">
                {showOriginal ? 
                    <OriginalDocContainer originalContent={originalContent} /> 
                :
                    <>
                        {modifiedContent.texts.length > 0 || modifiedContent.images.length > 0 ? <ModDocContainer obj={modifiedContent}/> : <ModDocContainer />} 
                        {/* insert loading screen if no modified content? */}
                    </>
                }
            </div>
            { modal ? 
            <div className="modal">
                <div onClick={() => setModal(false)} className="overlay"></div> 
                <div className="modal-content">
                    <SaveResourceForm original={originalContent} modified={modifiedContent} userId={user.id} setModal={setModal}/>
                    <button onClick={() => setModal(false)} className="landingButton">Cancel</button>
                </div>
            </div>
            : null
            }
        </div>
    )
}

export default DocModifierContainer