import React, {useState} from "react"

function SignUpForm() {

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [showPass, setShowPass] = useState(false)

    function handleSignUp(e) {
        e.preventDefault()
        // fetch(___, { // need route name
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: pass,
        //         passwordConfirm: confirmPass // check passwordConfirm with backend requirements
        //     })
        // })
        // .then((resp) => {
        //     if (resp.ok) {
        //         console.log("logged in")
        //     } else {
        //         console.log("error")
        //     }
        // })

        // route to ModProfileForm 
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