import React from 'react'
import Discover from './HomePageItems/Discover'
import LeftSideNav from './HomePageItems/LeftSideNav';
import RightSideNav from './HomePageItems/RightSideNav';
import WithAuth from './WithAuth'


const HomePage = () => {
  return (
    <section className="homeBackground">
        <div>Pulse Home</div>
        <section className="container">
            <LeftSideNav />
            <Discover />
            <RightSideNav />
        </section>
    </section>
  )
}

export default WithAuth(HomePage);