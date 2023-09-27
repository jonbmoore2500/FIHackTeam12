import React, {useContext, useState} from "react"
import ModProfileForm from "./ModProfileForm"

function Profile() {

    const user = {"username": "jmoore123", "simplifiedText": true, "addCaptions": true, "addImages": false} // temporary
    const [showForm, setShowForm] = useState(false)
    
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
            <button onChange={() => setShowForm(true)}>Edit</button>
        </div>
    )
}

export default Profile