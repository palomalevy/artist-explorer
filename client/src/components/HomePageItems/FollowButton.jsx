import React, { useState} from 'react'
import { useUser } from "/src/contexts/UserContext";

const FollowButton = ({authorID}) => {
  const { user, setUser } = useUser();
  const baseURL = import.meta.env.VITE_BASE_URL
  const following = user.following

  const handleFollow = async () => {
    let updatedFollowing = []

    if (!user?.following?.includes(authorID)) {
       updatedFollowing = [authorID, ...following]
       setUser(prev => ({
         ...prev, 
         following: updatedFollowing
       }));
 
     } else {
      updatedFollowing = following.filter(id => id !== authorID)
       setUser(prev => ({
         ...prev,
         following: updatedFollowing
       }));
     }

     try {
        await fetch(`${baseURL}/api/user/following`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({ updatedFollowing })
        })

    } catch (error) {}

    }

  return (
    <button className="followButton" onClick={handleFollow}>
        {user?.following?.includes(authorID) ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;