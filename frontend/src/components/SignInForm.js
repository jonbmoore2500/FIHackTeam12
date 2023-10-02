import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function SignInForm() {

    const {setUser} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [showPass, setShowPass] = useState(false)

    function handleSignIn(e) {
        e.preventDefault()
        fetch('http://127.0.0.1:5555/login', { 
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
            {/* left align */}
            <form onSubmit={handleSignIn}>
                {/* <label>Username: </label> */}
                <input
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    className="logInInput"
                    placeholder="USERNAME"
                />
                <br></br>
                {/* <label>Password: </label> */}
                <input 
                    onChange={(e) => setPass(e.target.value)} 
                    value={pass}
                    type={showPass ? "" : "password"}
                    className="logInInput"
                    placeholder="PASSWORD"
                />
                <br></br>
                <label className="pwSelect">
                    <span className="pwBoxLabel">Show password</span>
                    <input type="checkbox" checked={showPass} onChange={() => setShowPass(!showPass)}/>
                </label>
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