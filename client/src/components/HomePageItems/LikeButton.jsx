import React, { useState} from 'react'
import { useUser } from "/src/contexts/UserContext";

const LikeButton = ({postID}) => {
  const { user, setUser } = useUser();
  const baseURL = import.meta.env.VITE_BASE_URL


  const handleLike = async () => {

  
   if (!user?.likedPosts?.includes(postID)) {
      setUser(prev => ({
        ...prev, 
        likedPosts: [postID, ...prev.likedPosts]
      }));

    } else {
      setUser(prev => ({
        ...prev,
        likedPosts: prev.likedPosts.filter(id => id !== postID)
      }));
    }
    
  }

  return (
    <button className="likeButton" onClick={handleLike}>
      <img src={user?.likedPosts?.includes(postID) ? "/src/assets/hearts-16.png" : "/src/assets/favorite-4-16.png"} alt="heart" />
    </button>
  );
};

export default LikeButton;