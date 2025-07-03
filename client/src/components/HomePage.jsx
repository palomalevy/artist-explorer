import React, { useState, useEffect } from 'react'
import Discover from './HomePageItems/Discover'
import LeftSideNav from './HomePageItems/LeftSideNav';
import RightSideNav from './HomePageItems/RightSideNav';
import WithAuth from './WithAuth'
import { useParams } from 'react-router-dom';


const HomePage = () => {
  const { userID } = useParams();
  const [user, setUser] = useState({})
  const baseURL = import.meta.env.VITE_BASE_URL

  const fetchUserData = async () => {
          const resData = await fetch(`${baseURL}/api/me/${userID}`);
          const data = await resData.json();
          setUser(data);
      }
  
      useEffect(() => {
          fetchUserData();
      }, [userID]);
      
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