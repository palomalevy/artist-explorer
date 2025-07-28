import React from 'react'
import { data } from '../../../temp-data/temp-data'
import Logout from '../Logout'

const RightSideNav = () => {
  return (
    <>
        <section className="rightNavColumn">
            <div>RightSideNav</div>
            <section className="suggestions">
                <h4>Suggestions</h4>
                <article className="suggestionsBox">
                    <div className="artistInfo">
                        <img src={data[0].post.images[3]}alt="userPost" />
                        <div className="artistInfoText">
                            <p>Artist 1 Name</p>
                            <p className="userName">{data[0].user.username}</p>
                        </div>
                    </div>
                    <div className="artistInfo">
                        <img src={data[0].post.images[4]}alt="userPost" />
                        <div className="artistInfoText">
                            <p>Artist 2 Name</p>
                            <p className="userName">{data[0].user.username}</p>
                        </div>
                       
                    </div>
                    <div className="artistInfo">
                        <img src={data[0].post.images[5]}alt="userPost" />
                        <div className="artistInfoText">
                            <p>Artist 3 Name</p>
                            <p className="userName">{data[0].user.username}</p>
                        </div>
                        <button>Follow</button>
                    </div>
                </article>
            </section>
            <Logout />
        </section>
    </>
    
  )
}

export default RightSideNav