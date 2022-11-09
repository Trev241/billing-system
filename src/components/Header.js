import React from "react";
import { Link } from "react-router-dom";

import './header.css'

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h1>
                    <Link to="/">e-Invoicer</Link>
                </h1>
                <div>
                    <ul>
                        <li><Link to="/signin">SIGN IN</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header