import React, {useState} from "react"

import SignUpForm from "./SignUpForm"
import SignInForm from "./SignInForm"


function LandingPage() {

    const [modal, setModal] = useState(false)

    return (
        <div id="landingPageDiv"> 
            {/* big buttons! */}
            <div id="welcomeDiv" className="landingFlex">

            </div>
            <div id="signInDiv" className="landingFlex">
                <SignInForm />
                <h2>No Acount?</h2>
                <button onClick={() => setModal(true)} className="landingButton" id="registerButton">Register</button>
            </div>
            <br></br>


            { modal ? 
            <div className="modal">
                <div onClick={() => setModal(false)} className="overlay"></div> 
                <div className="modal-content">
                    <SignUpForm />
                    <button onClick={() => setModal(false)}>Cancel</button>
                </div>
            </div>
            : null
            }
        </div>
    )
}

export default LandingPage