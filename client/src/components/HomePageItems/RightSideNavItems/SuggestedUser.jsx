import React from 'react'
import { data } from '../../../temp-data/temp-data'
import FollowButton from '../FollowButton'

const SuggestedUser = ({user}) => {
  return (
    <>
        <div className="artistInfo">
            <img src={data[0].post.images[4]}alt="userPost" />
            <div className="artistInfoText">
                <p>{user.name}</p>
                <p className="userName">{user.username}</p>
            </div>
           <FollowButton targetUserID={user.id}/>
        </div>
    </>
    
  )
}

export default SuggestedUser