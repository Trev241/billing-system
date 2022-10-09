import React from "react";
import { Link } from "react-router-dom"

import "./accountform.css"
import DefaultLayout from "./DefaultLayout";

class Signup extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <div className="info">
                    <form>
                        <label>Username</label>
                        <input type="text" placeholder="" />
                        <label>Email</label>
                        <input type="email" placeholder="" />
                        <label>Password</label>
                        <input type="password" placeholder="" />
                        <label>Confirm Password</label>
                        <input type="password" placeholder="" />
                        <button className="submit-button">Register</button>
                    </form>
                    <p>Already have an account? <Link to="/signin">Login</Link></p>
                </div>
            </DefaultLayout>
        )
    }
}

export default Signup