import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../AuthProvider";
import './header.css'

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate()

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
                            <li onClick={(e) => {
                                setAuth({})
                                navigate("/")
                            }}>
                                <Link>LOGOUT</Link>
                            </li>
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