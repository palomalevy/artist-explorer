import React, {useState, useEffect, useRef, useCallback} from 'react'
import PostList from './PostList'
import CreatePost from '../CreatePostItems/CreatePost';
import LoadingSpinner from '../../Styling/LoadingSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const Discover = ({ user, myPosts, followingPage, discover }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snapshotId, setSnapshotId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const loadedTabRef = useRef(false);

  // const removePostFromFeed = useCallback((postId) => {
  //   setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
  // }, []);
  const handleLike = useCallback(() => {}, []);
  // Fetch the initial feed and get the snapshot ID
  useEffect(() => {
    const fetchPosts = async () => {
      // If no user ID, or the current tab has already been loaded, return.
      const currentTab = myPosts ? 'myPosts' : followingPage ? 'followingPage' : discover ? 'discover' : null;
      if (!user?.id || loadedTabRef.current === currentTab) {
          return;
      }
      
      setLoading(true);
      setPosts([]); // Clear posts on tab switch
      setSnapshotId(null);
      setPage(1);
      setHasMore(true);

      try {
        let postColumn;
        let body = { userID: user.id };
        
        if (myPosts) {
          postColumn = `${baseURL}/api/posts/myPosts`;
        } else if (discover) {
          postColumn = `${baseURL}/api/posts/generate-feed`;
        } else if (followingPage) {
          postColumn = `${baseURL}/api/posts/followingPosts`;
        }

        if (postColumn) {
          const res = await fetch(postColumn, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Failed to load posts');
          
          setPosts(data.posts);
          setHasMore(data.hasMore);
          setPage(2);
          
          if (discover) {
            setSnapshotId(data.snapshotId);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        // After a successful fetch, mark the current tab as loaded.
        loadedTabRef.current = currentTab;
      }
    };

    fetchPosts();
    
  }, [user?.id, myPosts, followingPage, discover, baseURL]);

  // Function to load more posts
  const loadMorePosts = async () => {
    if (!snapshotId) {
      return;
    }

    try {
      const res = await fetch(`${baseURL}/api/posts/discoverPosts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ snapshotId, page }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load posts');
      
      setPosts(prevPosts => [...prevPosts, ...data.posts]);
      setHasMore(data.hasMore);
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    }
  };

  if (loading && posts.length === 0) return <LoadingSpinner />;

  return (
    <div className="discoverColumn">
      <h2>Discover</h2>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage={<p style={{ textAlign: 'center' }}><b>You've seen it all!</b></p>}
      >
        <PostList posts={posts} user={user} onLike={handleLike} />
      </InfiniteScroll>
      {/* ... your modal and other buttons ... */}
    </div>
  );
};

// const Discover = ({user, myPosts, discover, followingPage}) => {
//   const [showModal, setShowModal] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const baseURL = import.meta.env.VITE_BASE_URL;
  
//   const isFirstLoad = useRef(false); // Not based on component mount, based on session
//   const hasLoaded = useRef(false);   // Prevent multiple fetches
//   const likedThisSession = useRef(new Set());

//     useEffect(() => {

//       console.log("excludeLikedPosts?", excludeLikedPosts);

//       const fetchUserPosts = async () => {
//         if (!user?.id || !discover || hasLoaded.current) return;

//         hasLoaded.current = true;
//         setLoading(true);

//         const firstTime = sessionStorage.getItem('discoverFirstLoad') === null;

//         try {
//           let postColumn;

//           if (myPosts) {
//               postColumn = `${baseURL}/api/posts/myPosts`;
//           } else if (discover) {
//               postColumn = `${baseURL}/api/posts/discoverPosts`;
//           } else if (followingPage) {
//               postColumn = `${baseURL}/api/posts/followingPosts`
//           }

//           if (postColumn) {
//               const res = await fetch(postColumn, {
//                   method: 'POST',
//                   headers: { 'Content-Type': 'application/json' },
//                   body: JSON.stringify({ 
//                     userID: user.id,
//                     excludeLikedPosts: firstTime, // Send the flag to the backend
//                    })
//                 })

//               const data = await res.json();

//               if (!res.ok) throw new Error(data.message || 'Failed to load posts');

//               setPosts(data.posts);
//               sessionStorage.setItem('discoverFirstLoad', 'false');
//           }

//         } catch (err) {
//           console.error(err)
//         }

//         setLoading(false);
//     };

//         fetchUserPosts();
//     }, [user, discover]);

//      const handleLike = (postId) => {
//         likedThisSession.current.add(postId); // track locally

//     // You can optionally send the like to backend here
//           setPosts(prev =>
//             prev.map(p => p.id === postId ? { ...p, liked: true } : p)
//           );
//       };

//         const openPopup = () => setShowModal(true);
//         const closePopup = () => setShowModal(false);

//      if (loading) return <LoadingSpinner />;

//   return (
//     <div className="discoverColumn">
//       <h2>{discover ? "Discover" : "My Posts"}</h2>
//       <section className="userPosts">
//         <PostList posts={posts} user={user} onLike={handleLike} />
//       </section>
//       <section className="newButtons">
//         <button onClick={openPopup} className="createPostButton">+ Create Post</button>
//       </section>
//       <CreatePost 
//         showModal={showModal} 
//         setShowModal={setShowModal} 
//         closePopup={closePopup} 
//         user={user} 
//         setPosts={setPosts} 
//         posts={posts} 
//       />
//     </div>
//   )
// };

export default Discover;