import React, {useEffect, useState}  from 'react'
import {data} from '../../temp-data/temp-data';
import ShinyText from '../Styling/ShinyText';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePostItems/CreatePost';

const LeftSideNav = ({ user, setMyPosts, setDiscover, setFollowingPage }) => {
    const [showModal, setShowModal] = useState(false)
    const [posts, setPosts] = useState([]);

    const baseURL = 'http://localhost:3000'

    const openPopup = () => {
        setShowModal(true)
    }

    const closePopup = () => {
        setShowModal(false)
    }

    const handleMyPosts = () => {
        setFollowingPage(false);
        setDiscover(false);
        setMyPosts(true);
    }

    const handleDiscover = () => {
        setFollowingPage(false);
        setDiscover(true);
        setMyPosts(false);
    }

    const handleFollowing = () => {
        setFollowingPage(true);
        setDiscover(false);
        setMyPosts(false);
    }
    
    useEffect(() => {
        const fetchUserPosts = async () => {
            const res = await fetch(postColumn, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userID: user.id })
                    })

                const data = await res.json();

                if (!res.ok) throw new Error(data.message || 'Failed to load posts');
                setPosts(data.posts);
        }
    }, [])

  return (
    <>
        <section className="leftNavColumn">
            <section className="mainPfp">
                <Link to={`/profile`}><img src={`${baseURL}${user.imageURL}`} alt="userPfp"/></Link>
                <div className="userInfo">
                    <h3>{user.name}</h3>
                    <p>{user.username}</p>
                </div>
            </section>
            <section className="navButtons">
                <button onClick={handleDiscover}>Discover</button>
                <button onClick={handleFollowing}>Following</button>
                <button onClick={handleMyPosts}>My Posts</button>
                <section className="newButtons">
                    <button onClick={openPopup} className="createPostButton">+ Create Post</button>
                </section>
                <CreatePost showModal={showModal} setShowModal={setShowModal} closePopup={closePopup} user={user} setPosts={setPosts} posts={posts}/>
                <Link to={`/profile`}><button><img src='/src/assets/settings-23-24.ico' /></button></Link>
            </section>
        </section>
    </>
  )
}

export default LeftSideNav;