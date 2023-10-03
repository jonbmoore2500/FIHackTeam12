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
    return <>
    <h2>Original</h2>
    <h4>{specificResource[0].original.title}</h4>
    <img src={specificResource[0].original.url} />
    <h2>Modified</h2>
    {specificResource[0].text.map((text) => {
        return <p key={text.id}>{text.text}</p>
    })}
    </>
}

export default ResourceByID