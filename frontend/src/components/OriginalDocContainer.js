import React from "react"

function OriginalDocContainer({originalContent, style}) {
    console.log(style)
    return (
        <div>
        {/* copies a whole block of text, formatted strangely. not sure how to deal with this, is going to depend on the unique html layout of every page  */}
            { originalContent ? 
            <p style={style}>
                {originalContent.text} 
                {/* {originalContent.images.map((src, i) => (
                    <img key={i} src={src} alt={`Image ${i}`} />
                ))} */}
            </p>
            :
            null
            }
        </div>
    )
}

export default OriginalDocContainer