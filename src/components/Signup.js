import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import UserService from "../services/user.service";

import DefaultLayout from "./DefaultLayout";
import "./signin.css"

function Signup() {
    const [username, setUsername] = useState("")    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [invalid, setInvalid] = useState(false)
    const [error, setError] = useState("Failed to register")

    // const [validName, setValidName] = useState(false)
    // const [validPassword, setValidPassword] = useState(false)
    // const [matchPassword, setMatchPassword] = useState(false)

    const USER_REGEX = /^[A-z0-9-_]{3,23}$/
    const EMAIL_REGEX =/^.+@.+\..+$/
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

    const change = {
        "username": setUsername,
        "email": setEmail,
        "password": setPassword,
        "confirmPassword": setConfirmPassword
    }

    const navigate = useNavigate()

    const handleChange = (e) => {
        change[e.target.name](e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!USER_REGEX.test(username)) {
            setError("Username must be between 3 to 23 characters and may contain letters, digits, underscore and hyphen")
            setInvalid(true)
        } else if (!EMAIL_REGEX.test(email)) {
            setError("Email is invalid")
            setInvalid(true)
        } else if (!PASSWORD_REGEX.test(password)) {
            setError(
                "Password must be between 8 to 24 characters long and must contain at least one of each: an uppercase letter," + 
                "a lowercase letter, a digit and one of the following symbols !, @, #, $, %"
            )
            setInvalid(true)
        } else if (password !== confirmPassword) {
            setError("Passwords do not match")
            setInvalid(true)
        } else {
            UserService.register({
                username: username,
                email: email,
                password: password
            }).then(response => {
                console.log(response)
            }).catch(e => console.log(e))

            navigate("/")
        }
    }

    return (
        <DefaultLayout>
        <div className="signin-form">
            <div className="std-container">
                <div className="head">Ready to join us?</div>
                <div className="body">
                    <input type="text" name="username" onChange={handleChange} placeholder="Username" />
                    <input type="email" name="email" onChange={handleChange} placeholder="Email" />
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" />
                    <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Confirm Password" />
                    {
                        (invalid) ?
                        <p style={{"color": "red"}} className="error-message">{error}</p>
                        : <></>
                    }
                    <button onClick={handleSubmit}>Sign Up</button>
                </div>
                <p>Already have an account? <Link to="/signin">Login</Link></p>
            </div>
        </div>
        </DefaultLayout>
    )
}

export default Signup