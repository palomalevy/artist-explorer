import React, { useState} from 'react'

const LikeButton = () => {
  const [heart, setHeart] = useState(false);
//   TODO: add like button

  const handleLike = () => {
    if (!heart) {
      setHeart(true)
    } else {
      setHeart(false)
    }
  }

  return (
    <article className="likeButtonContainer">
      {heart ? (
        <>
          <button className='likeButton' onClick={handleLike}>
            <img src="/src/assets/favorite-4-16.png" alt="heart" />
          </button>
        </>
      ) : ( 
        <>
          <button className='likeButton' onClick={handleLike}>
            <img src="/src/assets/hearts-16.png" alt="heart" />
          </button>
        </>
      )}
    </article>
  );
};

export default LikeButton;