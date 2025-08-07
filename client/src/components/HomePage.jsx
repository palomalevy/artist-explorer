import React, { useState, useEffect } from 'react'
import Discover from './HomePageItems/DiscoverColumn/Discover'
import LeftSideNav from './HomePageItems/LeftSideNav';
import RightSideNav from './HomePageItems/RightSideNavItems/RightSideNav';
import WithAuth from './WithAuth'
import { useUser } from "../contexts/UserContext";


const HomePage = () => {
  const { user, setUser } = useUser();
  const [myPosts, setMyPosts] = useState(false);
  const [discover, setDiscover] = useState(true);
  const [followingPage, setFollowingPage] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL

  const fetchUserData = async () => {
          const resData = await fetch(`${baseURL}/api/user/userInfo`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ userID: user.id }),
          });

          const data = await resData.json();
          setUser(data);
      }
  
      useEffect(() => {
          fetchUserData();
      }, [user.id]);

  return (
    <section className="homeBackground">
        <div>.</div>
        <section className="container">
            <LeftSideNav user={user} setMyPosts={setMyPosts} setDiscover={setDiscover} setFollowingPage={setFollowingPage}/>
            <Discover user={user} myPosts={myPosts} discover={discover} followingPage={followingPage} />
            <RightSideNav />
        </section>
    </section>
  )
}

export default WithAuth(HomePage);