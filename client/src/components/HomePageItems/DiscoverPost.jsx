import React, {useState} from 'react'
import LikeButton from './LikeButton'
import { data } from '../../temp-data/temp-data';

const DiscoverPost = () => {
    const [postData, setPostData] = useState({})

  return (
    <>
        <section className="userPost">
            {/* <div key={post.id}></div> */}
            <div className="postHeader">
                    <div className="headerRowLeft">
                        <img className="postPfp" src={`${data[0].user.pfp}`} alt="userPost" />
                    </div>
                    <div className="headerRowRight">
                        <h4>{data[0].user.name}</h4>
                        <p className="username">{data[0].user.username}</p>  
                    </div>
            </div>
            <div className="postTitle"><b>Post Title</b></div>
            <div className="postDescription">
                <p>{data[0].post.caption}</p>
            </div>
            <div className="postImages">
                <img src={`${data[0].post.images[0]}`} alt="userPost" />
                <img src={`${data[0].post.images[1]}`} alt="userPost" />
            </div>
            <p>{data[0].post.dateCreated}</p> 
            <div className="postLikeButton">
                <LikeButton />
            </div> 
        </section>
        <section className="userPost">
            {/* <div key={post.id}></div> */}
            <div className="postHeader">
                    <div className="headerRowLeft">
                        <img className="postPfp" src={`${data[0].user.pfp}`} alt="userPost" />
                    </div>
                    <div className="headerRowRight">
                        <h4>{data[0].user.name}</h4>
                        <p className="username">{data[0].user.username}</p>  
                    </div>
            </div>
            <div className="postTitle"><b>Post Title</b></div>
            <div className="postDescription">
                <p>{data[0].post.caption}</p>
            </div>
            <div className="postImages">
                <img src={`${data[0].post.images[0]}`} alt="userPost" />
                <img src={`${data[0].post.images[1]}`} alt="userPost" />
            </div>
            <p>{data[0].post.dateCreated}</p> 
            <div className="postLikeButton">
                <LikeButton />
            </div> 
        </section>
    </>
  );
};

export default DiscoverPost;