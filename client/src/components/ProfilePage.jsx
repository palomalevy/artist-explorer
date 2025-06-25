import React from 'react'
import {data} from '../temp-data/temp-data';

const ProfilePage = () => {
  return (
    <>
        <section className="profilePage">
            <div>ProfilePage</div>
            <section className="mainPfp">
                <img src={data[0].user.pfp} alt="userPfp" />
                <div className="userInfo">
                    <h3>{data[0].user.name}</h3>
                    <p>{data[0].user.username}</p>
                </div>
            </section>
            <section className="navButtons">
                <button className="followers">
                    <p>18 ✧</p>
                    <p>Followers</p>
                </button>
                <button className="followers">
                    <p>83 ✔</p>
                    <p>Following</p>
                </button>
            </section>
            <div className="leftRight">
                <section className="profileInfo">
                    <h3>Profile Information</h3>
                    <section className="allInfo">
                        <article className="userName">
                            <p>Username</p>
                            <p className="textBkgnd">{data[0].user.username}</p>
                        </article>
                        <article className="Email">
                            <p>Email</p>
                            <p className="textBkgnd">example@youremail.com</p>
                        </article>
                        <article className="password">
                            <p>Password</p>
                            <p className="textBkgnd">{data[0].user.password}</p>
                        </article>
                        <article className="zipCode">
                            <p>Zip Code</p>
                            <p className="textBkgnd">{data[0].user.zipcode}</p>
                        </article>
                    </section>
                </section>
                <section className="allPreferences">
                    <h3>Preferences</h3>
                    <section className="preferences">
                        <p>Genres</p>
                        <article className="preferredItem">
                            <button>✔ Hip-Hop</button>
                            <button>✔ Latin</button>
                            <button>✔ Classical</button>
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

        </section>
    </>
  )
}

export default ProfilePage;