import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function SignUpForm() {

    const {setUser} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [showPass, setShowPass] = useState(false)


    function handleSignUp(e) {
        e.preventDefault()
        fetch('http://127.0.0.1:5555/signup', { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: pass
                // passwordConfirm: confirmPass // check passwordConfirm with backend requirements
                // INITIATE WITH BOOLEANS NULL
            })
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    setUser(user)
                })
            } else {
                console.log("error")
            }
        })
        
        
    }

    return (
        <div id="signUpForm">
            <h2>Register</h2>
            <form onSubmit={handleSignUp}>
                {/* <label>Choose your Username</label> */}
                <input 
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="logInInput signUp"
                    placeholder="CREATE A USERNAME"
                />
                <br></br>
                {/* <label>Choose your Password</label> */}
                <input 
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    type={showPass ? "" : "password"}
                    className="logInInput signUp"
                    placeholder="CREATE A PASSWORD"
                />
                {/* <br></br>
                <label>Reenter your Password</label>
                <input 
                    onChange={(e) => setConfirmPass(e.target.value)}
                    value={confirmPass}
                    type={showPass ? "" : "password"}
                    className="logInInput"
                /> */}
                <br></br>
                <label className="pwSelect">
                    <span className="pwBoxLabel">Show password</span>
                    <input type="checkbox" checked={showPass} onChange={() => setShowPass(!showPass)}/>
                </label>
                <br></br>
                <br></br>
                <button type="submit" className="landingButton">Submit</button>
                <div id="signUpLineBreak"></div>
            </form>
        </div>
    )
}

export default SignUpForm