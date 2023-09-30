import React, {useState} from "react"

function SaveResourceForm({original, modified, userId, setModal}) {

    const [resourceTitle, setResourceTitle] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://127.0.0.1:5555/saveResource', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: resourceTitle,
                url: original,
                userId: userId,
                texts: modified.texts,
                images: modified.images
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then(data => {
                    // setUser() // add to context 
                    setModal(false)
                })
            } else {
                r.json().then(err => {
                    console.log(err)
                })
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Resource Title</span>
                    <input 
                        onChange={(e) => setResourceTitle(e.target.value)}
                        value={resourceTitle}
                    />
                </label>
                <p>Save this original and modified resource. Choose a title to save it under, you can search reference it again later!</p>
            </form>
        </div>
    )
}

export default SaveResourceForm