import React, { useState} from 'react'

const LikeButton = () => {
  const [emoji, setEmoji] = useState('🖤');
//   TODO: add like button
  return (
    <button className='likeButton'>
      🤍
    </button>
  );
};

export default LikeButton;