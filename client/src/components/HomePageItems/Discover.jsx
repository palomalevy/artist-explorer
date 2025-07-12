import React, {useState, useEffect} from 'react'
import PostList from './PostList'
import CreatePost from './CreatePost';

const Discover = ({user, myPosts, discover}) => {
  const [showModal, setShowModal] = useState(false)
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const baseURL = import.meta.env.VITE_BASE_URL;

  const openPopup = () => {
        setShowModal(true)
    }

    const closePopup = () => {
        setShowModal(false)
    }

    useEffect(() => {
      const fetchUserPosts = async () => {
        try {
          if (myPosts) {
              const res = await fetch(`${baseURL}/api/posts/myPosts`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userID: user.id }),
              });
              
              const data = await res.json();

              if (!res.ok) throw new Error(data.message || 'Failed to load posts');

              setPosts(data);

          } else if (discover) {
              const res = await fetch(`${baseURL}/api/posts/discoverPosts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID: user.id })
              });
              
              const data = await res.json();

              if (!res.ok) throw new Error(data.message || 'Failed to load posts');

              setPosts(data);
          }

        } catch (err) {
          setError('Error fetching posts')
        }
    };

      if (user?.id) {
        fetchUserPosts();
      }
    }, [user, discover]);

  return (
    <div className="discoverColumn">
        <h2>{discover ? "Discover" : "My Posts"}</h2>
        <section className="userPosts">
          <PostList posts={posts} user={user}/>
        </section>
        <section className="newButtons">
          <button onClick={openPopup} className="createPostButton">+ Create Post</button>
        </section>
        <CreatePost showModal={showModal} setShowModal={setShowModal} closePopup={closePopup} user={user} setPosts={setPosts} posts={posts}/>
    </div>
    
  )
};

export default Discover;