import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import WithAuth from './WithAuth'
import Logout from './HomePageItems/Logout';
import { Link } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";

const ProfilePage = () => {
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
          
          console.log("this is the user's data: ", user)
          console.log("this is the user's genre data: ", user.genres)

          const data = await resData.json();
          setUser(data);
      }

    useEffect(() => {
        fetchUserData();
    }, [user.id]);

    return (
    <section className="profileContainer">
        <section className="profilePage">
            <Link to={`/home`}><h2 className='backButton'>❮</h2></Link>
            <section className="mainPfp">
                <Link to={`/home`}>
                    <img src={`https://picsum.photos/200?random=${user.id}`} alt="imageURL" />
                </Link>
                <div className="userInfo">
                    <h3>{user.name}</h3>
                    <p>@{user.username}</p>
                    </div>
            </section>
            <div className="leftRight">
                <section className="profileInfo">
                    <h3>Profile Information</h3>
                    <section className="allInfo">
                        <article className="userName">
                            <p>Username</p>
                            <p className="textBkgnd">{user.username}</p>
                        </article>
                        <article className="Email">
                            <p>Email</p>
                            <p className="textBkgnd">{user.email}</p>
                        </article>
                        <article className="zipCode">
                            <p>Zip Code</p>
                            <p className="textBkgnd">{user.zipcode}</p>
                        </article>
                    </section>
                </section>
                <section className="allPreferences">
                    <h3>Preferences</h3>
                    <section className="preferences">
                        <p>Genres</p>
                        <article className="preferredItem">
                            <p>{user.genres}</p>
                            {/* <button>✔ Classical</button> */}
                        </article>
                        <p>Events</p>
                        <article className="preferredItem">
                            <button>✔ DJ/Club</button>
                            <button>✔ Band</button>
                            <button>✔ Orchestra</button>
                        </article>
                    </section>
                </section>

            </div>
             <section className="logoutButton">
                <Logout />
            </section>
        </section>
    </section>
  )
}

export default WithAuth(ProfilePage);