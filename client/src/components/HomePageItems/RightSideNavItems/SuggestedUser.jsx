import React from 'react'
import { data } from '../../../temp-data/temp-data'
import FollowButton from '../FollowButton'

const SuggestedUser = ({user}) => {
  const imageBaseURL = 'http://localhost:3000'
  return (
    <>
        <div className="artistInfo">
          <div className="artistLeft">
            <img src={`${imageBaseURL}${user.imageURL}`} alt="userPost" />
            <div className="artistInfoText">
              <p>{user.name}</p>
              <p className="userName">@{user.username}</p>
            </div>
           </div>
           <FollowButton targetUserID={user.id}/>
        </div>
    </>
    
  )
}

export default SuggestedUser