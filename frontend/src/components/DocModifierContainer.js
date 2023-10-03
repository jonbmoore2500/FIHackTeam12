import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import ModDocContainer from "./ModDocContainer"
import OriginalDocContainer from "./OriginalDocContainer"
import UploadDocForm from "./UploadDocForm"
import SaveResourceForm from "./SaveResourceForm"
import Toolbar from "./Toolbar"

function DocModifierContainer() {

    const {user} = useContext(UserContext)
    
    const [style, setStyle] = useState({
        fontSize: '',
        fontWeight: '',
        fontStyle: '',
        color: ''
    })

    const [showOriginal, setShowOriginal] = useState(true)
    const [showSave, setShowSave] = useState(false)

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
                    onClick={() => setShowSave(true)}
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

            {originalContent.text ? 
            <Toolbar style={style} setStyle={setStyle} />
            : 
            ''
            }
            {showSave ? 
            <div id="saveFormDiv">
                <SaveResourceForm original={originalContent} modified={modifiedContent} setShowSave={setShowSave}/>
            </div>
                        // { modal ? 
                        //     <div className="modal">
                        //         <div onClick={() => setModal(false)} className="overlay"></div> 
                        //         <div className="modal-content">
                        //             <SaveResourceForm original={originalContent} modified={modifiedContent} userId={user.id} setModal={setModal}/>

                        //         </div>
                        //     </div>
                        //     : null
                        //     }
            :
                null
            }
            <div id="materialsContainer">
                {showOriginal ? 
                    <OriginalDocContainer style={style} originalContent={originalContent} /> 
                :
                    <>
                        {modifiedContent.texts.length > 0 || modifiedContent.images.length > 0 ? <ModDocContainer obj={modifiedContent} style={style}/> : <ModDocContainer />} 
                        {/* insert loading screen if no modified content? */}
                    </>
                }
            </div>
        </div>
    )
}

export default DocModifierContainer