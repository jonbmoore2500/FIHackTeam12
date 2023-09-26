import React, {useState, useContext} from "react"

function ModProfileForm() {

    // const {user} = useContext(UserContext)

    const [simplifyBool, setSimplifyBool] = useState(false)
    const [imagesBool, setImagesBool] = useState(false)
    const [captionsBool, setCaptionsBool] = useState(false)

    // function handleSubmit(e) { // use later, 
    //     e.preventDefault()
    //     fetch(___${user.id}, { // need route name
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             simplifiedText: simplifyBool,
    //             addImages: imagesBool,
    //             addCaptions: captionsBool
    //         })
    //     })
    //     .then((resp) => {
    //         if (resp.ok) {
    //             console.log("saved bools")
    //         } else {
    //             console.log("didn't save bools")
    //         }
    //     })
    // }

    // change these to fancy toggles? https://www.sitepoint.com/react-toggle-switch-reusable-component/

    return (
        <div>
            <div>accessibility logo</div>
            <div>Accessibility text</div>
            <form onSubmit={handleSubmit}>
                option boxes w/ images, arrange side by side
                <div>
                    <div>Simplify Text</div>
                    <input 
                        type="checkbox"
                        checked={simplifyBool}
                        onChange={() => setSimplifyBool(!simplifyBool)}
                    />
                </div>
                <div>
                    <div>Add Images to Text</div>
                    <input 
                        type="checkbox"
                        checked={imagesBool}
                        onChange={() => setImagesBool(!imagesBool)}
                    />
                </div>
                <div>
                    <div>Add Captions to Images</div>
                    <input 
                        type="checkbox"
                        checked={captionsBool}
                        onChange={() => setCaptionsBool(!captionsBool)}
                    />
                </div>
            </form>
        </div>
    )
}

export default ModProfileForm