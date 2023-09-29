import React, {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

function SignUpForm() {

    const {setUser} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [showPass, setShowPass] = useState(false)

    const navigate = useNavigate()

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
                    // navigate("/profileEdit")
                })
            } else {
                console.log("error")
            }
        })
        
        
    }

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={handleSignUp}>
                <label>Choose your Username</label>
                <input 
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <label>Choose your Password</label>
                <input 
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    type={showPass ? "" : "password"}
                />
                <label>Reenter your Password</label>
                <input 
                    onChange={(e) => setConfirmPass(e.target.value)}
                    value={confirmPass}
                    type={showPass ? "" : "password"}
                />

                <label>Show password</label>
                <input type="checkbox" checked={showPass} onChange={() => setShowPass(!showPass)}/>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm