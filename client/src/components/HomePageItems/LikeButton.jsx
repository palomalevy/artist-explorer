import React, { useState} from 'react'
import { useUser } from "/src/contexts/UserContext";

const LikeButton = ({postID}) => {
  const { user, setUser } = useUser();
  const baseURL = import.meta.env.VITE_BASE_URL
  const likedPosts = user.likedPosts


  const handleLike = async () => {
    let updatedLikedPosts = []

    if (!user?.likedPosts?.includes(postID)) {
       updatedLikedPosts = [postID, ...likedPosts]
       setUser(prev => ({
         ...prev, 
         likedPosts: updatedLikedPosts
       }));
 
     } else {
      updatedLikedPosts = likedPosts.filter(id => id !== postID)
       setUser(prev => ({
         ...prev,
         likedPosts: updatedLikedPosts
       }));
     }

    try {
        await fetch(`${baseURL}/api/user/likedPosts`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({ updatedLikedPosts })
        })

    } catch (error) {}

    
  }

  return (
    <button className="likeButton" onClick={handleLike}>
      <img src={user?.likedPosts?.includes(postID) ? "/src/assets/hearts-16.png" : "/src/assets/favorite-4-16.png"} alt="heart" />
    </button>
  );
};

export default LikeButton;