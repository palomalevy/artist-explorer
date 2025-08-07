import React from 'react'
import { Link } from 'react-router';
import DiscoverPost from './DiscoverPost';

const PostList = ({ posts, user, onLike }) => {
  
  return (
      <div className="postList">
      {posts?.length ? (
        <>
        {posts.map((post) => (
          <DiscoverPost key={post.id} post={post} user={user} onLike={onLike}/>
        ))}
        </>
      ) : (
        <h2>No posts to display!</h2>
      )}
    </div>
  );
};

export default PostList;