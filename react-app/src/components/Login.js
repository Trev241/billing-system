import React from "react";

class Login extends React.Component {
    render() {
        return (
            <div class="login">
                <h1>Login</h1>
                <form>
                    <label>Email</label>
                    <input type="email" placeholder="" />
                    <label>Password</label>
                    <input type="password" placeholder="" />
                    <button class="Submit-button">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login