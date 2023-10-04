import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function SaveResourceForm({original, modified, setShowSave}) {

    const {user, handleNewResource} = useContext(UserContext)
    const [resourceTitle, setResourceTitle] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/saveResource', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: resourceTitle,
                url: original.text,
                userId: user.id,
                texts: modified.texts,
                images: modified.images
            })
        })
        .then((r) => {
            // console.log(r)
            if (r.ok) {
                r.json().then(data => {
                    handleNewResource(data) 
                    // console.log(data)
                    setShowSave(false)
                })
            } else {
                r.json().then(err => {
                    console.log(err)
                })
            }
        })
    }

    return (
        <div >
            <form onSubmit={handleSubmit} id="saveResourceForm">
                <label id="saveResLabel">
                    <span id="saveResSpan">Resource Title</span>
                    <input 
                        onChange={(e) => setResourceTitle(e.target.value)}
                        value={resourceTitle}
                        id="saveResInput"
                    />
                </label>
                <div className="saveButtonsDiv">
                    <button type="submit" className="saveButton">Save Resource</button>
                    {/* <button onClick={() => setShowSave(false)} className="saveButton">Cancel Save</button> */}
                </div>
            </form>
        </div>
    )
}

export default SaveResourceForm