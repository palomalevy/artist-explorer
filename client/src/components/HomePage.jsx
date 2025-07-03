import React, { useState, useEffect } from 'react'
import Discover from './HomePageItems/Discover'
import LeftSideNav from './HomePageItems/LeftSideNav';
import RightSideNav from './HomePageItems/RightSideNav';
import WithAuth from './WithAuth'
import { useUser } from "../contexts/UserContext";


const HomePage = () => {
  const { user, setUser } = useUser();
  const baseURL = import.meta.env.VITE_BASE_URL

  const fetchUserData = async () => {
          const resData = await fetch(`${baseURL}/api/user/userInfo`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({
                userID: user.id
            }),
          });

          const data = await resData.json();
          setUser(data);
      }
  
      useEffect(() => {
          fetchUserData();
      }, [user.id]);
      
  return (
    <section className="homeBackground">
        <div>Pulse Home</div>
        <section className="container">
            <LeftSideNav user={user}/>
            <Discover />
            <RightSideNav />
        </section>
    </section>
  )
}

export default WithAuth(HomePage);