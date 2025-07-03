import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipcode, setZipcode] = useState();
  const [error, setError] = useState('')
  const [userData, setUserData] = useState({});
  const baseURL = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate();

    useEffect(() => {
        if (userData.message === 'Username already taken!') {
          setError('Username already taken!')
        } else if (userData.message === 'Email already taken!') {
          setError('Email already taken!')
        }
    },[userData])

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

        const newUser = {
          name: event.target.name.value,
          email: event.target.email.value,
          username: event.target.username.value,
          password: event.target.password.value,
          zipcode: parseInt(event.target.zipcode.value),
        }

        try{
            const res = await fetch(`${baseURL}/api/auth/signup`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(newUser),
            });

            if (res.ok) {
                const data = await res.json();

                if (data.message === "user auth successful") {
                    setUserData(data)
                    navigate(`/home`)
                } else if (data.message === "Username already taken!") {
                        setError('Username already taken!')
                } else if (data.message === "Email already taken!") {
                        setError(data.message)
                } else if (data.message === "Password must be at least 8 characters long!") {
                        setError(data.message)
                } else {
                    const errorData = await res.json();
                    ServerRouter(errorData.message || 'Signup failed.')
                }
            } else {
                const errorData = await res.json();
                ServerRouter(errorData.message || 'Login failed.')
            }

        } catch(err) {
            setError('An error ocurred during login.')
        }
    }

  return (
    <section className="createAccountContainer">
        <section className="createAccount">
            <h1> Create Account</h1>
            <section className="signupForm">
                        <form onSubmit={handleSubmit}>
                            <div className="signupContainer">
                                <div className="credentials">
                                    <div className="newName">
                                        <label className="name">Name</label>
                                        <input type="text" placeholder="Full Name" name="name" value={name} onChange={handleNameChange} required/>
                                    </div>
                                    <div className="newEmail">
                                        <label className="email">Email</label>
                                        <input type="text" placeholder="Email" name="email" value={email} onChange={handleEmailChange} required/>
                                    </div>
                                    <div className="newUsername">
                                        <label className="username">Username</label>
                                        <input type="text" placeholder="Username" name="username" value={username} onChange={handleUsernameChange} required/>
                                    </div>
                                    <div className="newPassword">
                                        <label className="password">Password</label>
                                        <input type="password" placeholder="Password" name="password" value={password} onChange={handlePasswordChange} required/>
                                    </div>
                                    <div className="newZipcode">
                                        <label className="zipcode">Zipcode</label>
                                        <input type="number" placeholder="Zipcode" name="zipcode" value={zipcode} onChange={handleZipcodeChange} required/>
                                    </div>
                                </div>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <button className="signupButton" type="submit">Sign Up</button>
                            </div>
                        </form> 
            </section>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </section>
    </section>
  )
};

export default CreateAccount;