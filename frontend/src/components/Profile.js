import React, {useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import ProfSelectorBox from "./ProfSelectorBox"

function Profile() {

    const {user} = useContext(UserContext)

    const navigate = useNavigate()
    
    return (
        <div>
            <h1>User: {user["username"]}</h1>
            <p>more profile info here</p>
            <br></br>
            <br></br>
            <h2>Your Modification Profile: </h2>
            <div className="profBoxContainer">
                <ProfSelectorBox option={"simplifiedText"} selected={user["simplifiedText"]}/>
                <ProfSelectorBox option={"addImages"} selected={user["addImages"]}/>
                <ProfSelectorBox option={"addCaptions"} selected={user["addCaptions"]}/>
            </div>

            <label className="updateLabel">
                {/* <span className="pwBoxLabel">Update your settings?</span> */}
                <button onClick={() => navigate("profileEdit")} className="updateButton">Update</button>
            </label>
        </div>
    )
}

export default Profile