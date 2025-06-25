import React from 'react'
import { Link } from 'react-router'

const LoginPage = () => {
  return (
    <section className="loginPage">
        <p>Pulse Logo Here</p>
        <h1>Pulse</h1>
        <section className="loginForm">
            <form>
                <div className="loginContainer">
                    <div className="credentials">
                        <div className="userName">
                            <label className="username"><b>Email or username</b></label>
                            <input type="text" placeholder="Email or username" name="username" required/>
                        </div>
                        <div className="passWord">
                            <label className="password"><b>Password</b></label>
                            <input type="password" placeholder="Password" name="password" required/>
                        </div>
                    </div>
                     <button className="loginButton" type="submit"><Link to="/"></Link>Login</button>
                </div>
            </form> 
        </section>
        <p>or</p>
        <p>Create an account</p>
    </section>
  )
}

export default LoginPage;