import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserService from "../services/user.service";
import DefaultLayout from "./DefaultLayout";
import AuthContext from "../AuthProvider";
import "./signin.css"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const change = {
        "email": setEmail,
        "password": setPassword,
        "invalid": setError
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
                <div className="head">Welcome back!</div>
                <div className="body">
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                    <button onClick={handleSubmit}>Sign in</button>
                </div>
                {/* <h1>Welcome!</h1> */}
                {
                    error  
                    ? <div className="error">Invalid email or password submitted</div>
                    : <></>
                }
                <p>Not yet registered? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
        </DefaultLayout>
    )
}

export default Login