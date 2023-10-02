import React, {useState, useEffect} from "react"

const UserContext = React.createContext()

function UserProvider({children}) {

    // const [user, setUser] = useState({"username": "jmoore123", "simplifiedText": true, "addCaptions": true, "addImages": false}) // temporary
    const [user, setUser] = useState(null)
    
    console.log(user)

    useEffect(() => {
        fetch("/check_session")
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                })
            } else {
                r.json().then((error) => {
                    console.log(error)
                })
            }
        })
    }, [])

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}