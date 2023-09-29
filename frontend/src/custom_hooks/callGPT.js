function callGPT(textInput, images) {

    // let tidiedText = '"' + textInput.replace(/"/g, "") + '"'
    let tidiedText = "In a castle of Westphalia, belonging to the Baron of Thunder-ten-Tronckh, lived a youth, whom nature had endowed with the most gentle manners. His countenance was a true picture of his soul. He combined a true judgment with simplicity of spirit, which was the reason, I apprehend, of his being called Candide. The old servants of the family suspected him to have been the son of the Barons sister, by a good, honest gentleman of the neighborhood, whom that young lady would never marry because he had been able to prove only seventy one quarterings, the rest of his genealogical tree having been lost through the injuries of time.The Baron was one of the most powerful lords in Westphalia, for his castle had not only a gate, but windows. His great hall, even, was hung with tapestry. All the dogs of his farmyards formed a pack of hounds at need, his grooms were his huntsmen, and the curate of the village was his grand almoner. They called him My Lord, and laughed at all his stories. The Barons lady weighed about three hundred and fifty pounds, and was therefore a person of great consideration, and she did the honours of the house with a dignity that commanded still greater respect. Her daughter Cunegonde was seventeen years of age, fresh coloured, comely, plump, and desirable. The Barons son seemed to be in every respect worthy of his father. The Preceptor Pangloss was the oracle of the family, and little Candide heard his lessons with all the good faith of his age and character."
    // let ind1 = tidiedText.indexOf("Skip to main content")
    // let ind2 = tidiedText.indexOf("Textise: Back to top")

    let obj = {texts: [{"text": tidiedText}], images: []}
    
    fetch("http://127.0.0.1:5555/GPT", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "toModify": tidiedText // keep getting "unexpected token, ... is not valid json" errors. whyyyyyyyyy
        })
    })
    .then((r) => {
        if (r.ok) {
            r.json().then((data) => {
                console.log("success", data)
            })
        } else {
            r.json().then(e => {
                console.log(e.errors)
            })
        }
    })
    
    // console.log(obj)
    return obj
}

export default callGPT