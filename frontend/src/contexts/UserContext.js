import React, {useState, useEffect} from "react"

const UserContext = React.createContext()

function UserProvider({children}) {

    const [user, setUser] = useState({"username": "jmoore123", "simplifiedText": true, "addCaptions": true, "addImages": false}) // temporary

    useEffect(() => {
        // fetch user based on session 
    }, [])

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}