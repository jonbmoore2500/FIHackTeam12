import React, {useContext} from "react"
import {Outlet, NavLink} from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

function Layout() {

    const {user} = useContext(UserContext)

    return (
        <>
            <div id="headerDiv">
                <h3 id="headerLeft">User: {user.username}</h3>
                <nav id="navHeader">
                    <ul>
                        <li><NavLink to="/" >Profile</NavLink></li>
                        <li><NavLink to="/portfolio" >Portfolio</NavLink></li>
                        <li><NavLink to="/docModifier" >Modify</NavLink></li>
                    </ul>
                </nav>
            </div>
            <div id="appContent">
                <Outlet />
            </div>
        </>

    )
}

export default Layout