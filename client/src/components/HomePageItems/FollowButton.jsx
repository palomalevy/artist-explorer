import React, { useState} from 'react'
import { useUser } from "/src/contexts/UserContext";

const FollowButton = ({targetUserID}) => {
  // targetUserID receives input from both the posts (authorID) and the
  // suggestions box which is just (userID)

  const { user, setUser } = useUser();
  const baseURL = import.meta.env.VITE_BASE_URL
  const following = user.following

  const isFollowing = following.includes(targetUserID)

  const handleFollow = async () => {
    let updatedFollowing;

    if (!isFollowing) {
      updatedFollowing = [targetUserID, ...following];
    } else {
      updatedFollowing = following.filter(id => id !== targetUserID)
    }

    setUser(prev => ({
      ...prev, following: updatedFollowing
    }))

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
        {user?.following?.includes(targetUserID) ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;