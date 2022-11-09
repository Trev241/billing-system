import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserService from "../services/user.service";
import DefaultLayout from "./DefaultLayout";
import AuthContext from "../AuthProvider";
import "./signin.css"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalid, setInvalid] = useState(false)
    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const change = {
        "email": setEmail,
        "password": setPassword,
        "invalid": setInvalid
    }

    const handleChange = (e) => {
        change[e.target.name](e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        UserService.login({
            email: email,
            password: password
        }).then(response => {
                const username = response.data.username
                setAuth({ authenticated: true, username, email, password })
                navigate("/")
        }).catch(
            e => {
                console.log(e)
                change["invalid"](true)
            }
        )
    }

    return (
        <DefaultLayout>
        <div className="signin-form">
            <div className="std-container">
                {/* <h1>Welcome!</h1> */}
                <div className="head">Welcome back!</div>
                <div className="body">
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                    {
                        (invalid) ?
                        <p style={{"color": "red"}} className="error-message">Invalid email or password submitted</p>
                        : <></>
                    }
                    <button onClick={handleSubmit}>Sign in</button>
                </div>
                <p>Not yet registered? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
        </DefaultLayout>
    )
}

export default Login