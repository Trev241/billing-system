import React from "react";

import './header.css'

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h1>BILLING SYSTEM</h1>
                <div>
                    <ul>
                        <li>HOME</li>
                        <li>SIGN IN</li>
                        <li>HELP</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header