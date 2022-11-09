import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../AuthProvider";
import './header.css'

const Header = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="header">
            <h1>
                <Link to="/">e-Invoicer</Link>
            </h1>
            <div>
                <ul>
                    {
                        auth.authenticated ? (
                            <>
                            <li><Link to="/create-invoice">INVOICE</Link></li>
                            <li><Link to="/inventory">INVENTORY</Link></li>
                            <li><Link to="/history">HISTORY</Link></li>
                            </>
                        ) : (
                            <li><Link to="/signin">SIGN IN</Link></li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header