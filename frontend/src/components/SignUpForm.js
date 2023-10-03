import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import { Link } from "react-router-dom"

function SignUpForm() {

    const {setUser} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    // const [confirmPass, setConfirmPass] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [acceptTC, setAcceptTC] = useState(false)


    function handleSignUp(e) {
        e.preventDefault()
        if (acceptTC) {
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
        
    }

    return (
        <div id="signUpForm">
            <h1 className="landingHead">Register</h1>
            <p className="landingHead">Please fill your information below</p>
            <br></br>
            <form onSubmit={handleSignUp}>
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
                    <label className="loginLabel">PASSWORD</label>
                    <input 
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    type={showPass ? "" : "password"}
                    className="logInInput"
                    placeholder="PASSWORD"
                    />
                </div>
                {/* one more for confirmPW */}
                <div className="checkBoxesDiv">
                    <label className="pwSelect">
                        <span className="pwBoxLabel">Accept <Link to={"/termsandconditions"}>Terms and Conditions</Link></span>
                        <input type="checkbox" checked={acceptTC} onChange={() => setAcceptTC(!acceptTC)}/>
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
                <div id="signUpLineBreak"></div>
            </form>
        </div>
    )
}

export default SignUpForm