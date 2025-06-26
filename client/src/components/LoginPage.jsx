import React, { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router';
import axios from 'axios';

const LoginPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [error, setError] = useState('')
    const baseURL = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value)
    };

    const handleZipcodeChange = (event) => {
        const value = event.target.value;
        setZipcode(value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        

        try {
            const res = await fetch(`${baseURL}/api/auth/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
        
        if (res.ok) {
                const data = await res.json();
                // cookie
                console.log(data.message)
                if (data.message === "user auth successful") {
                    navigate('/')
                } else if (data.message === "wrong username") {
                    setError('Invalid username.')
                } else if (data.message === "wrong password") {
                    setError('Invalid password.')}
            } else {
                const errorData = await res.json();
                ServerRouter(errorData.message || 'Login failed.')
            }   
        } catch (err) {
            setError('An error ocurred during login.')
            console.error('Login error:', err)
        }
    };

  return (
    <section className="loginPage">
        <p>Pulse Logo Here</p>
        <h1>Pulse</h1>
        <section className="loginForm">
            <form onSubmit={handleSubmit}>
                <div className="loginContainer">
                    <div className="credentials">
                        <div className="userName">
                            <label className="username"><b>Email or username</b></label>
                            <input type="text" placeholder="Email or username" name="username" value={username} onChange={handleUsernameChange} required/>
                        </div>
                        <div className="passWord">
                            <label className="password"><b>Password</b></label>
                            <input type="password" placeholder="Password" name="password" value={password} onChange={handlePasswordChange} required/>
                        </div>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button className="loginButton" type="submit"><Link to="/"></Link>Login</button>
                </div>
            </form> 
        </section>
        <p>or</p>
        <p>Create an account</p>
    </section>
  );
};

export default LoginPage;

