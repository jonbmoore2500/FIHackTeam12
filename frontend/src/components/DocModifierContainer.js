import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function DocModifierContainer() {

    const {user} = useContext(UserContext)


    return (
        <div>
            DOC WORK GOES HERE
        </div>
    )
}

export default DocModifierContainer