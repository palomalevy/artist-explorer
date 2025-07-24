import React, {useState}  from 'react'
import {data} from '../../temp-data/temp-data';
import ShinyText from '../Styling/ShinyText';
import { Link } from 'react-router-dom';

const LeftSideNav = ({ user, setMyPosts, setDiscover }) => {
    const [clickedDiscover, setClickedDiscover] = useState(false);
    const [clickedFollowing, setClickedFollowing] = useState(false);
    const [clickedMyPosts, setClickedMyPosts] = useState(false);

    const handleMyPosts = () => {
        setClickedDiscover(true);
        setClickedMyPosts(false);
        setClickedFollowing(true);
        setDiscover(false);
        setMyPosts(true);
    }

    const handleDiscover = () => {
        setClickedDiscover(false);
        setClickedMyPosts(true);
        setClickedFollowing(true);
        setDiscover(true);
        setMyPosts(false);
    }

    const handleFollowing = () => {
        setClickedDiscover(true);
        setClickedMyPosts(true);
        setClickedFollowing(false);
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
                <button onClick={handleDiscover}><ShinyText text="Discover" disabled={clickedDiscover} speed={3} className='custom-class' /></button>
                <button onClick={handleFollowing}><ShinyText text="Following" disabled={clickedFollowing} speed={3} className='custom-class' /></button>
                <button onClick={handleMyPosts}><ShinyText text="My Posts" disabled={clickedMyPosts} speed={3} className='custom-class' /></button>
                <Link to={`/profile`}><button>Settings</button></Link>
            </section>
        </section>
    </>
  )
}

export default LeftSideNav;