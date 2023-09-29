async function callGPT(textInput, images) {

    let tidiedText = '"' + textInput.replace(/"/g, "") + '"'

    let obj = {texts: [], images: []}
    
    function handleObjPop(data) {
        const paras = data.split("\n")
        paras.forEach((x) => {
            obj.texts.push({"text": x})
        })
    }


    await fetch("http://127.0.0.1:5555/GPT", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            toModify: tidiedText
        })
    }) 
    .then((r) => {
        if (r.ok) {
            r.json().then((data) => {
                handleObjPop(data.text)
            })
        } else {
            r.json().then(e => {
                console.log(e.errors)
            })
        }
    })
    console.log(obj)
    return obj
}

export default callGPT