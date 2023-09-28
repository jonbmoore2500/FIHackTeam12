import React from "react"
import {Outlet, NavLink} from "react-router-dom"

function Layout() {

    return (
        <div>
            <div id="navHeader">
                <NavLink to="/" >Profile</NavLink>
                <NavLink to="/portfolio" >Portfolio</NavLink>
                <NavLink to="/docModifier" >Modify Center</NavLink>
            </div>
            <div id="appContent">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout