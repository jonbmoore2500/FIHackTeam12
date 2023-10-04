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
        color: '',
        fontFamily: '',
        background: ''
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
            <h2>Modify a resource according to your settings. Save the resource and review it later in your Workspace</h2>
            <h3>&#40;Currently only supports plain text, external websites and PDFs coming soon&#41;</h3>
            <UploadDocForm setShowOriginal={setShowOriginal} setOriginalContent={setOriginalContent} handleModified={handleModified} setEnableButton={setEnableButton}/>
            
            <div id="modifierBodyDiv">
                <div id="materialsContainer">
                    {/* <br></br> */}
                    {showSave ? 
                        <div id="saveFormDiv">
                            <SaveResourceForm original={originalContent} modified={modifiedContent} setShowSave={setShowSave}/>
                            <div id="loginLineBreak"></div>
                        </div>
                    :
                        null
                    }
                    {originalContent.text ? 
                    <>
                        <Toolbar style={style} setStyle={setStyle} />
                        <div id="loginLineBreak"></div>
                    </>
                    : 
                    ''
                    }
                    {showOriginal ? 
                        <OriginalDocContainer style={style} originalContent={originalContent} /> 
                    :
                        <>
                            {modifiedContent.texts.length > 0 || modifiedContent.images.length > 0 ? <ModDocContainer obj={modifiedContent} style={style}/> : <ModDocContainer style={style} />} 
                            {/* insert loading screen if no modified content? */}
                        </>
                    }
                </div>
                <div className="resourceButtonsDiv">
                    <button 
                        onClick={() => setShowOriginal(!showOriginal)}
                        disabled={enableButton}
                        className="resourceButton"
                    >
                        Show {showOriginal ? "Modified" : "Original"}
                    </button>
                    <button
                        onClick={() => setShowSave(!showSave)}
                        disabled={enableButton}
                        className="resourceButton"
                    >
                        {showSave ? "Cancel Save": "Save Form"}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default DocModifierContainer