import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import WithAuth from './WithAuth'
import Logout from './Logout';
import { Link } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";
import UserGenres from './ProfilePageItems/UserGenres';
import UserEventTypes from './ProfilePageItems/UserEventTypes';
import EditZipcode from './ProfilePageItems/EditZipcode';

const ProfilePage = () => {
    const { user, setUser } = useUser();
    const [editing, setEditing] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const baseURL = import.meta.env.VITE_BASE_URL
    const imageBaseURL = 'http://localhost:3000'

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
        if (isChange) {
            fetchUserData();
            setIsChange(false)
        }
    }, [isChange]);

    const handleEditButton = () => {
        setEditing(true);
    }

    return (
    <section className="profileContainer">
        <section className="profilePage">
            <Link to={`/home`}><h2 className='linkTo'>❮</h2></Link>
            <section className="mainPfp">
                <Link to={`/home`}>
                    <img src={`${imageBaseURL}${user.imageURL}`} alt="imageURL" />
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
                            {editing ? (
                                <EditZipcode user={user} baseURL={baseURL} setEditing={setEditing} setIsChange={setIsChange}/>
                            ) : (
                                <>
                                    <p className="textBkgnd">{user.zipcode}</p>
                                    <button className="editZipcode" onClick={handleEditButton}>Edit</button>
                                </>
                            )}
                        </article>
                    </section>
                </section>
                <section className="allPreferences">
                    <h3>Preferences</h3>
                    <section className="preferences">
                        <div className="genreColumn">
                            <p><b>Genres</b></p>
                            <article className="preferredItem">
                            <UserGenres user={user} baseURL={baseURL} setIsChange={setIsChange} />
                            </article>
                        </div>
                        <div className="eventsColumn">
                            <p><b>Events</b></p>
                            <article className="preferredItem">
                                <UserEventTypes user={user} baseURL={baseURL} setIsChange={setIsChange} />
                            </article>
                        </div>
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