import React, {useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

function Profile() {

    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    
    return (
        <div>
            <h2>{user["username"]}</h2>

            {user["simplifiedText"] ? 
                <div>
                    box showing simplifiedText is selected TRUE
                </div>
             : null
            }

            {user["addCaptions"] ? 
                <div>
                    box showing addCaptions is selected TRUE
                </div>
             : null
            }

            {user["addImages"] ? 
                <div>
                    box showing addImages is selected TRUE
                </div>
             : null
            }


            <label>Change your modifications?</label>
            <button onClick={() => navigate("profileEdit")}>Edit</button>

        </div>
    )
}

export default Profile