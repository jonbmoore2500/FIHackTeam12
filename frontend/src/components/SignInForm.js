import React, {useState} from "react"

function SignInForm() {

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [showPass, setShowPass] = useState(false)

    function handleSignIn(e) {
        e.preventDefault()
        // fetch('/login', { 
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: pass
        //     })
        // })
        // .then((resp) => {
        //     if (resp.ok) {
        //         console.log("logged in")
        //     } else {
        //         console.log("error")
        //     }
        // })
    }


    return (
        <div>
            <h3>Sign In: </h3>
            <form onSubmit={handleSignIn}>
                <label>Username: </label>
                <input
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                />
                <label>Password: </label>
                <input 
                    onChange={(e) => setPass(e.target.value)} 
                    value={pass}
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

export default SignInForm