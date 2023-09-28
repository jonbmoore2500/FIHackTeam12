import React from "react"

function OriginalDocContainer({originalContent}) {

    return (
        <div>
        {/* copies a whole block of text, formatted strangely. not sure how to deal with this, is going to depend on the unique html layout of every page  */}
            { originalContent ? 
            <>
                {originalContent.text} 
                {originalContent.images.map((src, i) => (
                    <img key={i} src={src} alt={`Image ${i}`} />
                ))}
            </>
            :
            null
            }
        </div>
    )
}

export default OriginalDocContainer