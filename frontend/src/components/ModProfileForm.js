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
                        console.log(data)
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

    // <label className="pwSelect">
    //     <span className="pwBoxLabel">Show password</span>
    //     <input type="checkbox" checked={showPass} onChange={() => setShowPass(!showPass)}/>
    // </label>

    return (
        <div>
            <img src="/access_icon.png" width="200"/>
            <div>Accessibility text - work in progress</div>
            <p>how should we explain what each option does? mouseover? show more info button?</p>
            <p>stuck using blue checkboxes, can't figure out how to change those colors for the life of me</p>
            <div className="profBoxContainer">
                <div className={"selectorBox" + (simplifyBool ? " selected": " unSelected")}>
                    <h3>Simplify Text</h3>
                    <h5>image goes here</h5>
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
                    <h5>image goes here</h5>
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
                    <h5>image goes here</h5>
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
            <br></br>
            <form onSubmit={handleSubmit}>
                <button type="submit" className="updateButton">Save</button>
            </form>
        </div>
    )
}

export default ModProfileForm