import React, { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link } from "react-router-dom"

function PortfolioContainer() {
    const context = useContext(UserContext)
    if (!context) {
        return null
    }
    return (
        <div className="portfolioContainerDiv">   
            {context.user.modifiedResource.map((resource) => {
                return <Link className="portfolioContainerLink" key={resource.id} to={`/portfolio/${resource.id}`}>{resource.text[0].text}</Link>
            })}
        </div>
    )
}

export default PortfolioContainer