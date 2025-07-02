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
            } else {
                console.error('Failed to log out.')
            }
        } catch (error) {
            console.error('Network error. Please try again.', error)
        }
    };

  return (
    <button className="logoutButton" type="button" onClick={handleLogout}>Logout</button>
  )
}

export default Logout;