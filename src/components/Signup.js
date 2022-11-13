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

    const [warning, setWarning] = useState("Registration failed. The email or username has already been taken")
    const [warn, setWarn] = useState(false)

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
            setWarning("Username must be between 3 to 23 characters and may contain letters, digits, underscore and hyphen")
            setInvalid(true)
        } else if (!EMAIL_REGEX.test(email)) {
            setWarning("Email is invalid")
            setInvalid(true)
        } else if (!PASSWORD_REGEX.test(password)) {
            setWarning(
                "Password must be between 8 to 24 characters long and must contain at least one of each: an uppercase letter," + 
                "a lowercase letter, a digit and one of the following symbols !, @, #, $, %"
            )
            setInvalid(true)
        } else if (password !== confirmPassword) {
            setWarning("Passwords do not match")
            setInvalid(true)
        } else {
            UserService.register({
                username: username,
                email: email,
                password: password
            }).then(response => {
                console.log(response)
                navigate("/")
            }).catch(e => {
                console.log(e)
                setWarning("Registration failed. The email or username has already been taken")
                setWarn(true)
            })
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
                    {/* {
                        (invalid) ?
                        <p style={{"color": "red"}} className="error-message">{warning}</p>
                        : <></>
                    } */}
                    <button onClick={handleSubmit}>Sign Up</button>
                </div>
                {
                    warn || invalid
                    ? <div className={warn ? "warning" : "error"}>{warning}</div>
                    : <></>
                }
                <p>Already have an account? <Link to="/signin">Login</Link></p>
            </div>
        </div>
        </DefaultLayout>
    )
}

export default Signup