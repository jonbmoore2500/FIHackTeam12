import React, { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link } from "react-router-dom"

function PortfolioContainer() {
    const context = useContext(UserContext)
    if (!context) {
        return null
    }
    return (
        <div>   
            {context.user.modifiedResource.map((resource) => {
                return <Link key={resource.id} to={`${resource.id}`}>{resource.text[0].text}</Link>
            })}
            Portfolio coming soon!
        </div>
    )
}

export default PortfolioContainer