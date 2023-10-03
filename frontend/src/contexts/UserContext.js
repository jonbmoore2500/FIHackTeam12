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

    function handleNewResource(data) {
        const newResource = {id: data[1].id, image: data[3], original: data[1].original, originalId: data[1].originalId, text: data[2]}
        setUser({...user, modifiedResource: [...user.modifiedResource, newResource]})
    }

    return <UserContext.Provider value={{user, setUser, handleNewResource}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}