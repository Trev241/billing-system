import React from "react";
import { Link } from "react-router-dom";

import "./accountform.css"
import DefaultLayout from "./DefaultLayout";

class Login extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <div className="info">
                    {/* <h1>Welcome!</h1> */}
                    <form>
                        <label>Email</label>
                        <input type="email" placeholder="" />
                        <label>Password</label>
                        <input type="password" placeholder="" />
                        <button className="submit-button">Sign in</button>
                    </form>
                    <p>Not yet registered? <Link to="/signup">Sign up</Link></p>
                </div>
            </DefaultLayout>
        )
    }
}

export default Login