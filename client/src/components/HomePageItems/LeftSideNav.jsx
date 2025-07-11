import React from 'react'
import {data} from '../../temp-data/temp-data';
import { Link } from 'react-router-dom';

const LeftSideNav = ({ user, setMyPosts, setDiscover }) => {

    const handleMyPosts = () => {
        setDiscover(false);
        setMyPosts(true);
    }

    const handleDiscover = () => {
        setDiscover(true);
        setMyPosts(false);
    }

  return (
    <>
        <section className="leftNavColumn">
            <div>LeftSideNav</div>
            <section className="mainPfp">
                <Link to={`/profile`}><img src={`https://picsum.photos/200?random=${user.id}`} alt="userPfp"/></Link>
                <div className="userInfo">
                    <h3>{user.name}</h3>
                    <p>{user.username}</p>
                </div>
            </section>
            <section className="navButtons">
                <button onClick={handleDiscover}>Discover</button>
                <button>Following</button>
                <button onClick={handleMyPosts}>My Posts</button>
                <Link to={`/profile`}><button>Settings</button></Link>
            </section>
        </section>
    </>
  )
}

export default LeftSideNav;