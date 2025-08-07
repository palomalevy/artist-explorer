import React, {useState} from 'react'
import LikeButton from './LikeButton'
import FollowButton from '../FollowButton';
import { data } from '../../../temp-data/temp-data';

const DiscoverPost = ({user, post}) => {

    const pfpBaseURL = 'http://localhost:3000'
    const imageBaseURL = 'http://localhost:3000/'
    console.log("this is post object: ", post)
    console.log('post pfp: ', post.author.imageURL)
    console.log('post images: ', post.postImages)

  return (
    <>
        <section className="userPost">
            <div className="postHeader">
                    <div className="headerRowLeft">
                        <img className="postPfp" src={`${pfpBaseURL}${post.author.imageURL}`} alt="userPost" />
                    </div>
                    <div className="headerRowRight">
                        <h4>{post.author.name}</h4>
                        <p className="username">@{post.author.username}</p>  
                    </div>
            </div>
            
            <div className="postImages">
                {Array.isArray(post.postImages) && post.postImages.map((imgURL, index) => (
                 <img key={index} src={`${imageBaseURL}${imgURL}`} alt={`Post image ${index + 1}`} />
                ))}
            </div>
            
            {post.musicURL && (
                    <iframe
                        width="100%"
                        height="20"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${post.musicURL}&color=%23425057&inverse=false&auto_play=false&show_user=true`}
                    ></iframe>
            )}

            <div className="postTitle"><b>{post.title}</b></div>
            <div className="postDescription">
                <p>{post.caption}</p>
            </div>
            
            <div className="postButtons">
                <LikeButton postID={post.id}/>
                <FollowButton targetUserID={post.author.id}/>
            </div> 
        </section>
    </>
  );
};

export default DiscoverPost;