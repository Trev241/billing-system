import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../AuthProvider";
import DefaultLayout from "./DefaultLayout";
import "./home.css"

const HomePage = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const routeChange = () => {
        let path = (auth.authenticated) ? "create-invoice" : "signin";
        navigate(path);
    };

    return (
        <DefaultLayout>
        <div className="banner">
            <div>
                <h1>Invoice intelligently with our Billing System</h1>
                <input
                    className="button"
                    type="button"
                    onClick={routeChange}
                    value="Get Started"
                >
                </input>
            </div>

            <div>
            <img
                src={require("./../assets/images/inverted.gif")}
                alt="banner-image"
            />
            </div>
        </div>
        <div className="features">
            <h1>Why choose our product?</h1>
            <ul>
                <li>Absolutely free</li>
                <li>Incredibly simple</li>
                <li>Accessible to all</li>
                <li>Very efficient</li>
            </ul>
        </div>
        </DefaultLayout>
    )
}

export default HomePage;
