import React from "react"

function ProfSelectorBox({option, selected}) {

    function renderSwitch(param) {
        switch(param) {
            case "simplifiedText":
                return "Simplify Text"
            case "addImages":
                return "Add Images"
            default :
                return "Add Captions"
        }
    }

    return (
        <div className={"selectorBox" + (selected ? " selected": " unSelected")}>
            <h3>{renderSwitch(option)}</h3>
            <h5>image goes here</h5>
            <div className={"selectorCheck" + (selected ? " checked": " unChecked")}>
                {selected ? <h1>✔</h1> : <h1></h1> }
            </div>
            <h4>{selected ? "ACTIVE":"INACTIVE"}</h4>
        </div>
    )
}

export default ProfSelectorBox