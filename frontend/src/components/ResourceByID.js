import { useParams } from "react-router-dom"
import React, { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

function ResourceByID() {
    const context = useContext(UserContext)
    let {id} = useParams()
    const specificResource = context.user.modifiedResource.filter((resource) => resource.id === Number(id))
    console.log(specificResource[0])
    if (!context) {
        return null
    }
    return <div className="ResourcebyidDiv">
    <div className="ResourcebyidOriginalDiv" >
    <h2 className="ResourcebyidOriginalh2">Original</h2>
        <h4 className="ResourcebyidOriginalTitle">{specificResource[0].original.title}</h4>
        <img className="ResourcebyidOriginalImg" src={specificResource[0].original.url} alt="original" />
    </div>
    <div className="ResourcebyidModifiedDiv">
    <h2 className="ResourcebyidModifiedh2">Modified</h2>
    {specificResource[0].text.map((text) => {
        return <p className="ResourcebyidModifiedText" key={text.id}>{text.text}</p>
    })}
    </div>
    </div>
}

export default ResourceByID