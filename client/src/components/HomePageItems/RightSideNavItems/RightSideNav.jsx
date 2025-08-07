import React, { useState, useEffect } from 'react'
import { useUser } from '../../../contexts/UserContext';
import SuggestedBox from './SuggestedBox'
import Logout from '../../Logout'

const RightSideNav = () => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const { user } = useUser();
    const baseURL = import.meta.env.VITE_BASE_URL

    useEffect(() => {

        // waits for user to load before continuing to prevent getting stuck
        if (!user || !user.following) return;

        const fetchSuggestions = async () => {
            try {
                const res = await fetch(`${baseURL}/api/user/suggestUsersToFollow`, {
                    method: 'POST',
                    credentials: 'include',
                });

                const data = await res.json();

                const filteredSuggestions = data.suggestions.filter(suggested =>
                    suggested.id !== user.id && !user.following.includes(suggested.id)
                );

                setSuggestedUsers(filteredSuggestions)

            } catch(error) {
                console.error(error)
            }
        };
        
        if (user) {
            fetchSuggestions();
        }

    }, [user])

  return (
    <>
        <section className="rightNavColumn">
            <section className="suggestions">
                <h4>Suggestions</h4>
                <SuggestedBox suggestedUsers={suggestedUsers}/>
            </section>
        </section>
    </>
    
  )
}

export default RightSideNav