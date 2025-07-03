import React, { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router';
import axios from 'axios';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const baseURL = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate();

    const handleIdentifierChange = (event) => {
        const value = event.target.value;
        setIdentifier(value);
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const res = await fetch(`${baseURL}/api/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identifier: identifier, 
                    password: password,
                }),
            });
        
        if (res.ok) {
                const data = await res.json();
                const userID = data.userID

                if (data.message === "user auth successful") {
                    navigate(`/home`)
                } else if (data.message === "wrong username/email") {
                    setError('Invalid username/email.')
                } else if (data.message === "wrong password") {
                    setError('Invalid password.')}
            } else {
                const errorData = await res.json();
                ServerRouter(errorData.message || 'Login failed.')
            }   
        } catch (err) {
            setError('An error ocurred during login.')
        }
    };

  return (
    <section className="loginBox">
        <section className="loginPage">
            <p>Pulse Logo Here</p>
            <h1>Pulse</h1>
            <section className="loginForm">
                <form onSubmit={handleSubmit}>
                    <div className="loginContainer">
                        <div className="credentials">
                            <div className="usernameInput">
                                <label className="identifier"><b>Email or username</b></label>
                                <input type="text" placeholder="Email or username" name="identifier" value={identifier} onChange={handleIdentifierChange} required/>
                            </div>
                            <div className="passwordInput">
                                <label className="password"><b>Password</b></label>
                                <input type="password" placeholder="Password" name="password" value={password} onChange={handlePasswordChange} required/>
                            </div>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button className="loginButton" type="submit">Login</button>
                    </div>
                </form> 
            </section>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </section>
    </section>
  );
};

export default LoginPage;

