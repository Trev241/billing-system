import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import UserService from "../services/user.service";

import "./accountform.css"
import DefaultLayout from "./DefaultLayout";

function Signup() {
    const [username, setUsername] = useState('')    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [invalid, setInvalid] = useState(false)
    const [error, setError] = useState("Failed to register")

    // const [validName, setValidName] = useState(false)
    // const [validPassword, setValidPassword] = useState(false)
    // const [matchPassword, setMatchPassword] = useState(false)

    const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    var error_msg = "Failed to register"

    const change = {
        "username": setUsername,
        "email": setEmail,
        "password": setPassword,
        "confirmPassword": setConfirmPassword
    }

    const navigate = useNavigate()

    const handleChange = (e) => {
        console.log(e.target.name + " " + e.target.value)
        change[e.target.name](e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setInvalid(true)
        } else {
            UserService.register({
                email: email,
                password: password
            }).then(
                response => console.log(response)
            ).catch(
                e => console.log(e)
            )

            navigate('/')
        }
    }

    return (
        <DefaultLayout>
            <div className="info">
                <form>
                    <label>Username</label>
                    <input type="text" name="username" onChange={handleChange} placeholder="" />
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} placeholder="" />
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} placeholder="" />
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} placeholder="" />
                    {
                        (invalid) ?
                        <p className="error-message">{error}</p>
                        : <></>
                    }
                    <input type="submit" onClick={handleSubmit} className="submit-button" value="Sign Up" />
                </form>
                <p>Already have an account? <Link to="/signin">Login</Link></p>
            </div>
        </DefaultLayout>
    )
}

export default Signup