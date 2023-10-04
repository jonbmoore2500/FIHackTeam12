import { useParams } from "react-router-dom"
import React, { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import OriginalDocContainer from "./OriginalDocContainer"
import ModDocContainer from "./ModDocContainer"
import Toolbar from "./Toolbar"

function ResourceByID() {
    const context = useContext(UserContext)
    let {id} = useParams()
    const specificResource = context.user.modifiedResource.filter((resource) => resource.id === Number(id))
    const [showMod, setShowMod] = useState(false)
    // console.log(specificResource[0])

    const [style, setStyle] = useState({
        fontSize: '',
        fontWeight: '',
        fontStyle: '',
        color: ''
    })

    if (!context) {
        return null
    }

    return (
        <div>
            <div id="resourceByIdHead">
                <div id="resourceByIdToolbar">
                    <Toolbar style={style} setStyle={setStyle} />
                </div>
                <button 
                    onClick={() => setShowMod(!showMod)}
                    className="resourceButton"
                    id="resourceByIdButton"
                >
                    Show {showMod ? "Original" : "Modified"}
                </button>
            </div>
            <div>
                {showMod ? 
                    <div className="ResourcebyidContainerDiv">
                        <h2 className="ResourcebyidModifiedh2">Modified</h2>
                        <ModDocContainer obj={{texts: specificResource[0].text, images: specificResource[0].image}}/>
                    </div>
                    :
                    <div className="ResourcebyidContainerDiv" >
                        <h2 className="ResourcebyidOriginalh2">Original</h2>
                        <OriginalDocContainer originalContent={{text: specificResource[0].original.url}} style={style}/>
                    </div>
                    }
            </div>
        </div>
    )
}

export default ResourceByID