import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function SignInForm() {

    const {setUser} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [showPass, setShowPass] = useState(false)

    function handleSignIn(e) {
        e.preventDefault()
        fetch('/login', { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: pass
            })
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then(user => {
                    setUser(user)
                })
            } else {
                resp.json().then(error => {
                    console.log(error)
                })
            }
        })
    }


    return (
        <div>
            <h1 className="landingHead">Login </h1> 
            <br></br>
            <form onSubmit={handleSignIn}>
                <div className="formGroup">
                    <label className="loginLabel">USERNAME</label>
                    <input
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                        className="logInInput"
                        placeholder="USERNAME"
                    />
                </div>

                <br></br>
                <div className="formGroup">
                    <label className="loginLabel">USERNAME</label>
                    <input 
                        onChange={(e) => setPass(e.target.value)} 
                        value={pass}
                        type={showPass ? "" : "password"}
                        className="logInInput"
                        placeholder="PASSWORD"
                    />
                </div>
                <br></br>

                <div className="checkBoxesDiv">
                    <label className="pwSelect">
                    </label>
                    <label className="pwSelect">
                        <span className="pwBoxLabel">Show password</span>
                    <input type="checkbox" checked={showPass} onChange={() => setShowPass(!showPass)}/>
                </label>
                </div>
                <br></br>
                <br></br>
                <div className="rightButtonDiv">
                    <button type="submit" className="landingButton">Submit</button>
                </div>
                <div id="loginLineBreak"></div>
            </form>
        </div>
    )
}

export default SignInForm