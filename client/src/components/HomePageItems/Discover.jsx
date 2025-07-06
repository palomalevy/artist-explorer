import React, {useState} from 'react'
import DiscoverPost from './DiscoverPost'
import CreatePost from './CreatePost';

const Discover = ({user}) => {
  const [showModal, setShowModal] = useState(false)

  const openPopup = () => {
        setShowModal(true)
    }

    const closePopup = () => {
        setShowModal(false)
    }

  return (
    <div className="discoverColumn">
        <h2>Discover</h2>
        <section className="userPosts">
          <DiscoverPost />
        </section>
        <section className="newButtons">
          <button onClick={openPopup} className="createPostButton">+ Create Post</button>
        </section>
        <CreatePost showModal={showModal} setShowModal={setShowModal} closePopup={closePopup} user={user}/>
    </div>
    
  )
};

export default Discover;