import React from 'react'
import { data } from '../../../temp-data/temp-data'
import FollowButton from '../FollowButton'
import SuggestedUser from './SuggestedUser'

const SuggestedBox = ({ suggestedUsers }) => {
  return (
    <article className="suggestionsBox">
        {suggestedUsers.length === 0 ? (
        <p>No suggestions available</p>
      ) : (
        suggestedUsers.map((user) => (
          <SuggestedUser key={user.id} user={user} />
        ))
      )}
    </article>
  )
}

export default SuggestedBox