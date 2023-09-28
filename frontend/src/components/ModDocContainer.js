import React from "react"


function ModDocContainer() {

    // sample temporary to test layouts
    let sample = {
        texts: [
            {id: 1, text: "testing text #1"}, 
            {id: 2, text: "testing text #2"},
            {id: 3, text: "testing text #3"},
            {id: 4, text: "testing text #4"},
            {id: 5, text: "testing text #5"}
        ],
        images: [ // make sure these return in location order!
            {
                id: 1, 
                url: "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80", 
                location: 2,
                caption: {id:1, text: "first bird"}
            },
            {
                id: 2, 
                url: "https://images.unsplash.com/photo-1539664030485-a936c7d29c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2697&q=80",
                location: 4,
                caption: {id: 2, text: "second bird"}
            }
        ]
    }

    function generateArr(obj) {
        let arr = sample.texts.map((t) => ["text", t.text])

        let images = sample.images.map((image) => ["img", image.url, image.caption["text"]])
        let captions = sample.images.map((image) => ["caption", image.caption["text"]])
        let indices = sample.images.map((image) => image.location)
        indices.forEach((ind, i) => {
            arr = [...arr.slice(0, ind + (i * 2)), images[i], captions[i], ...arr.slice(ind + (i * 2))]
        })

        return arr
    }

    let dispData = generateArr(sample)

    return (
        <div>
            {dispData.map((arr, i) => {
                if (arr[0] === "text") {
                    return (
                        <p key={i}>{arr[1]}</p>
                    )
                } else if (arr[0] === "img") {
                    return (
                        <img key={i} src={arr[1]} width={250} height={250} alt={arr[2]}/>
                    ) 
                } else {
                    return (
                        <p key={i}>{arr[1]}</p> // caption, change format in some way?
                    ) 
                }
            })}
        </div>
    )
}

export default ModDocContainer