import React, { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link, Outlet } from "react-router-dom"

function PortfolioContainer() {
    const context = useContext(UserContext)
    if (!context) {
        return null
    }
    // console.log("portfolio", context)
    return (
        <>
        <div className="portfolioContainerDivHead">   
            {context.user.modifiedResource.map((resource) => {
                return <Link className="portfolioContainerLink" key={resource.id} to={`/portfolio/${resource.id}`}>{resource.original.title}</Link>
            })}
        </div>
        <div>
            <Outlet />
        </div>
        </>
    )
}

export default PortfolioContainer