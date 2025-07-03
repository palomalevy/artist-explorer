import React from 'react'
import DiscoverPost from './DiscoverPost'

const Discover = () => {
  return (
    <div className="discoverColumn">
        <h2>Discover</h2>
        <section className="userPosts">
          <DiscoverPost />
        </section>
        <section className="newButtons">
          <button className="createButton">+ Create a Post</button>
        </section>
    </div>
    
  )
};

export default Discover;