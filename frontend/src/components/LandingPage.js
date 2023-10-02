import React, {useState} from "react"

import SignUpForm from "./SignUpForm"
import SignInForm from "./SignInForm"



function LandingPage() {

    const [signUp, setSignUp] = useState(false)

    return (
        <div id="landingPageDiv"> 
            <div id="welcomeDiv" className="landingFlex">
                <h1 id="appTitle">Learn Link</h1>
                <img src="/ll_logo.png" alt="Application Logo, a large blue eye" id="landingLogo"/>
            </div>
            <div id="vertLineDive"></div>
            <div id="signInDiv" className="landingFlex">
                {
                    !signUp ?
                <>
                    <SignInForm />
                    <h2>Create Account</h2>
                    <button onClick={() => setSignUp(true)} className="landingButton" id="registerButton">Register</button>
                </>
                :
                <>
                    <SignUpForm />

                    <div className="rightButtonDiv">
                        <button onClick={() => setSignUp(false)} className="landingButton">Cancel</button>
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default LandingPage