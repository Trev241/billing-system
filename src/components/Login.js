import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import DefaultLayout from "./DefaultLayout";
import AuthContext from "../AuthProvider";

import "./accountform.css"

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
        }).then(
            response => {
                setAuth({ email, password })
                navigate("/")
            }
        ).catch(
            e => {
                console.log(e)
                change["invalid"](true)
            }
        )
    }

    return (
        <DefaultLayout>
            <div className="info">
                {/* <h1>Welcome!</h1> */}
                <form>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="" onChange={handleChange} />
                    <label>Password</label>
                    <input type="password" name="password" placeholder="" onChange={handleChange} />
                    {
                        (invalid) ?
                        <p className="error-message">Invalid email or password submitted</p>
                        : <></>
                    }
                    <input type="submit" className="submit-button" onClick={handleSubmit} value="Sign in" />
                </form>
                <p>Not yet registered? <Link to="/signup">Sign up</Link></p>
            </div>
        </DefaultLayout>
    )
}

export default Login