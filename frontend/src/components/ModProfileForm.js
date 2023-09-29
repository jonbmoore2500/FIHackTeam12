import React, {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import { UserContext } from "../contexts/UserContext"


function ModProfileForm({preLogged = false}) {

    const {user, setUser} = useContext(UserContext)

    const [simplifyBool, setSimplifyBool] = useState(true && user.simplifiedText)
    const [imagesBool, setImagesBool] = useState(true && user.addImages)
    const [captionsBool, setCaptionsBool] = useState(true && user.addCaptions)
    const navigate = useNavigate()


    function handleSubmit(e) { // use later, 
        e.preventDefault()
        console.log(simplifyBool)
        console.log(imagesBool)
        console.log(captionsBool)
        fetch(`http://127.0.0.1:5555/user/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                simplifiedText: simplifyBool,
                addImages: imagesBool,
                addCaptions: captionsBool
            })
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    setUser(data)
                    if (preLogged) {navigate("/")}
                })
            } else {
                console.log("didn't save bools")
            }
        })
        // navigate("/")
    }

    // change these to fancy toggles? https://www.sitepoint.com/react-toggle-switch-reusable-component/

    return (
        <div>
            <div>accessibility logo</div>
            <div>Accessibility text</div>
            <form onSubmit={handleSubmit}>
                option boxes w/ images, arrange side by side. change the box to show selected as opposed to just the checkbox?
                <div>
                    <div>Simplify Text</div>
                    <input 
                        type="checkbox"
                        checked={simplifyBool}
                        onChange={() => setSimplifyBool(!simplifyBool)}
                    />
                </div>
                <div>
                    <div>Add Images to Text</div>
                    <input 
                        type="checkbox"
                        checked={imagesBool}
                        onChange={() => setImagesBool(!imagesBool)}
                    />
                </div>
                <div>
                    <div>Add Captions to Images</div>
                    <input 
                        type="checkbox"
                        checked={captionsBool}
                        onChange={() => setCaptionsBool(!captionsBool)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ModProfileForm