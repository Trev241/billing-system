import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import AuthContext from "../AuthProvider";
import DefaultLayout from "./DefaultLayout";

function HomePage() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const emailName = auth.email;

    const routeChange = () => {
        // console.log("first");
        let path = `signup`;
        navigate(path);
    };

    return (
        <DefaultLayout>
        <div className="container-sm">
            <div>
            <div className="hero-content">
                <div style={{ "white-space": "nowrap" }}>
                <h3
                    className="mt-0 mb-16 reveal-from-bottom"
                    data-reveal-delay="200"
                >
                    Invoice intelligently using our{" "}
                    <div className="type-container">
                    <div className="text-color-primary typed-out">
                        Billing System
                    </div>
                    </div>
                </h3>
                <p
                    className="m-0 mb-32 reveal-from-bottom"
                    style={{ color: "white" }}
                    data-reveal-delay="400"
                >
                    One Free, Powerful Invoicing Platform.
                </p>
                </div>

                <div
                className="hero-figure reveal-from-bottom illustration-element-01 mb-24"
                data-reveal-value="20px"
                data-reveal-delay="800"
                >
                <img
                    className="has-shadow"
                    src={require("./../assets/images/inverted.gif")}
                    alt="Hero"
                    width={600}
                    height={504}
                />
                </div>
                <div className="container-xs">
                <div className="reveal-from-bottom" data-reveal-delay="600">
                    <input
                        type="button"
                        onClick={routeChange}
                        value="Get Started"
                    >
                    </input>
                </div>
                </div>
            </div>
            </div>
        </div>
        </DefaultLayout>
    )
}

export default HomePage;
