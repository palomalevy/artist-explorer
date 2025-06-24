import React, { useState} from 'react'

const LikeButton = () => {
  const [emoji, setEmoji] = useState('🖤');
//   const handleClick = (event) => {
//     event.stopPropagation();
//     setEmoji(emoji === '🤍' ? '💖' : '🤍');
 
//   };
  return (
    <button className='likeButton'>
      🤍
    </button>
  );
};

export default LikeButton;