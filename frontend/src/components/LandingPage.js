import React, {useState} from "react"

import SignUpForm from "./SignUpForm"
import SignInForm from "./SignInForm"


function LandingPage() {

    const [modal, setModal] = useState(false)

    return (
        <div> 
            {/* big buttons! */}

            <SignInForm />
            <br></br>
            <button onClick={() => setModal(true)}>Register</button>
            
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