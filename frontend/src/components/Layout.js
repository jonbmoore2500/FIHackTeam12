import React from "react"
import {Outlet, NavLink} from "react-router-dom"

function Layout() {

    return (
        <>
            <nav id="navHeader">
                <ul>
                    <li><NavLink to="/" >Profile</NavLink></li>
                    <li><NavLink to="/portfolio" >Portfolio</NavLink></li>
                    <li><NavLink to="/docModifier" >Modify</NavLink></li>
                </ul>
            </nav>

            <div id="appContent">
                <Outlet />
            </div>
        </>

    )
}

export default Layout