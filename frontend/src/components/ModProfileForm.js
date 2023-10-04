import React, {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import { UserContext } from "../contexts/UserContext"


function ModProfileForm({preLogged = false}) {

    const {user, setUser} = useContext(UserContext)

    const [simplifyBool, setSimplifyBool] = useState(user.simplifiedText !== null ? user.simplifiedText : false)
    const [imagesBool, setImagesBool] = useState(user.addImages !== null ? user.addImages : false)
    const [captionsBool, setCaptionsBool] = useState(user.addCaptions !== null ? user.addCaptions : false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if ([simplifyBool, imagesBool, captionsBool].some(x => x === true)) {
            fetch(`/user/${user.id}`, {
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
                        // console.log(data)
                        setUser(data)
                        if (preLogged) {navigate("/")}
                    })
                } else {
                    console.log("didn't save bools")
                }
            })
        }
    }

    // change these to fancy toggles? https://www.sitepoint.com/react-toggle-switch-reusable-component/



    return (
        <div id="modProfileDiv">
            <h2>Welcome!</h2>
            <img src="/BodyIcon.png" width="200" />
            <h3>Please check which accessibility features apply to your workspace and save</h3>
            <div className="profBoxContainer">
                <div className={"selectorBox" + (simplifyBool ? " selected": " unSelected")}>
                    <h3>Simplify Text</h3>
                    {/* <h5>image goes here</h5> */}
                    <br></br>
                    <label className="profModLabel">
                        <span className="profModSPan"></span>
                        <input 
                            type="checkbox"
                            checked={simplifyBool}
                            onChange={() => setSimplifyBool(!simplifyBool)}
                        />
                    </label>
                    <h4>{simplifyBool ? "ACTIVE":"INACTIVE"}</h4>
                </div>
                <div className={"selectorBox" + (imagesBool ? " selected": " unSelected")}>
                    <h3>Add Images</h3>
                    {/* <h5>image goes here</h5> */}
                    <br></br>
                    <label className="profModLabel">
                        <span className="profModSPan"></span>
                        <input 
                            type="checkbox"
                            checked={imagesBool}
                            onChange={() => setImagesBool(!imagesBool)}
                        />
                    </label>
                    <h4>{imagesBool ? "ACTIVE":"INACTIVE"}</h4>
                </div>
                <div className={"selectorBox" + (captionsBool ? " selected": " unSelected")}>
                    <h3>Add Captions</h3>
                    {/* <h5>image goes here</h5> */}
                    <br></br>
                    <label className="profModLabel">
                        <span className="profModSPan"></span>
                        <input 
                            type="checkbox"
                            checked={captionsBool}
                            onChange={() => setCaptionsBool(!captionsBool)}
                        />
                    </label>
                    <h4>{captionsBool ? "ACTIVE":"INACTIVE"}</h4>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit" className="updateButton">Save Settings</button>
            </form>
        </div>
    )
}

export default ModProfileForm