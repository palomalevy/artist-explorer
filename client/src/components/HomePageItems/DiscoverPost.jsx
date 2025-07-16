import React, {useState} from 'react'
import LikeButton from './LikeButton'
import FollowButton from './FollowButton';
import { data } from '../../temp-data/temp-data';

const DiscoverPost = ({user, post}) => {

  return (
    <>
        <section className="userPost">
            <div className="postHeader">
                    <div className="headerRowLeft">
                        <img className="postPfp" src={`${data[0].user.pfp}`} alt="userPost" />
                    </div>
                    <div className="headerRowRight">
                        <h4>{post.author.name}</h4>
                        <p className="username">@{post.author.username}</p>  
                    </div>
            </div>
            <div className="postTitle"><b>{post.title}</b></div>
            <div className="postDescription">
                <p>{post.caption}</p>
            </div>
            <div className="postImages">
                {Array.isArray(post.postImages) && post.postImages.map((imgURL, index) => (
                 <img key={index} src={imgURL} alt={`Post image ${index + 1}`} />
                ))}
            </div>
            <div className="postButtons">
                <LikeButton postID={post.id}/>
                <FollowButton authorID={post.author.id}/>
            </div> 
        </section>
    </>
  );
};

export default DiscoverPost;