import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [imageURL, setImageURL] = useState(null);
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

        const formData = new FormData();
        formData.append('name', event.target.name.value);
        formData.append('email', event.target.email.value);
        formData.append('username', event.target.username.value);
        formData.append('password', event.target.password.value);
        formData.append('zipcode', parseInt(event.target.zipcode.value));

        if (imageURL) {
            formData.append('imageURL', imageURL);
        }

        try{
            const res = await fetch(`${baseURL}/api/auth/signup`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
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
                    setError(data.message || 'Signup failed.')
                }
            } else {
                setError(data.message || 'Login failed.')
            }

        } catch(err) {
            console.error(err)
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
                                    <div className="newImage">
                                        <label>Profile Picture</label>
                                        <input
                                            type="file"
                                            name="imageURL"
                                            accept="image/*"
                                            onChange={(e) => setImageURL(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <button className="signupButton" type="submit">Sign Up</button>
                            </div>
                        </form> 
            </section>
            <p>Already have an account? <Link to="/login" className='linkTo'>Login</Link></p>
        </section>
    </section>
  )
};

export default CreateAccount;