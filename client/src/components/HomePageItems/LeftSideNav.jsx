import React from 'react'
import {data} from '../../temp-data/temp-data';
import { Link } from 'react-router-dom';

const LeftSideNav = () => {
  return (
    <>
        <section className="leftNavColumn">
            <div>LeftSideNav</div>
            <section className="mainPfp">
                <img src={data[0].user.pfp} alt="userPfp" />
                <div className="userInfo">
                    <h3>{data[0].user.name}</h3>
                    <p>{data[0].user.username}</p>
                </div>
            </section>
            <section className="navButtons">
                <button>Discover</button>
                <button>Following</button>
                <Link to={`/profile`}>
                     <button>Settings</button>
                </Link>
            </section>
            <section className="createNew">
                <button className="createButton">New</button>
                <div className="connect">
                    <button className="createButton">Spotify</button>
                    <button className="createButton">SC</button>
                </div>
            </section>
        </section>
    </>
  )
}

export default LeftSideNav;