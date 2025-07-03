import React from 'react'
import { Link, useNavigate } from 'react-router';
import { useUser } from '../../contexts/UserContext';

const Logout = () => {
    const { user, setUser } = useUser();
    const baseURL = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            const response = await fetch(`${baseURL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setUser(null);
                navigate('/login');
            }
        } catch (error) {
            res.send({ message: 'An error occurred during logout.' });
        }
    };

  return (
    <button className="logoutButton" type="button" onClick={handleLogout}>Logout</button>
  )
}

export default Logout;