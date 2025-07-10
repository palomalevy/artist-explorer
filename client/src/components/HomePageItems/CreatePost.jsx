import React, { useState } from 'react'
import PostImages from './PostImages';
import PostGenre from './CreatePostItems/PostGenre';
import PostEventType from './CreatePostItems/PostEventType';

const CreatePost = ({showModal, setShowModal, closePopup, user, setPosts}) => {
    const [title, setTitle] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [caption, setCaption] = useState('');
    const [postImages, setPostImages] = useState(['']);
    const [musicURL, setMusicURL] = useState('');
    const [postGenre, setPostGenre] = useState('')
    const [postEventType, setPostEventType] = useState('');
    const [error, setError] = useState('')
    const baseURL = import.meta.env.VITE_BASE_URL
    const userID = user.id

    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }

    const handleZipcodeChange = (event) => {
        const value = event.target.value;
        setZipcode(value);
    }

    const handleCaptionChange = (event) => {
        const value = event.target.value;
        setCaption(value)
    }

    const handleMusicURLChange = (event) => {
        const value = event.target.value;
        setMusicURL(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const newPost = {
            userID: parseInt(userID),
            title: event.target.title.value,
            caption: event.target.caption.value,
            zipcode: parseInt(event.target.zipcode.value),
            postImages: Array.isArray(postImages) ? postImages.filter(img => img.trim() !== '') : [],
            musicURL: event.target.musicURL.value,
            postGenre: postGenre,
            postEventType: postEventType,
        }

        try {
            const postRes = await fetch(`${baseURL}/api/posts/createPosts`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(newPost),
            })
            
            if (postRes.ok) {
                const newPost = await postRes.json()
                setPosts((prevPosts) => {
                    const safePrev = Array.isArray(prevPosts) ? prevPosts : [];
                    return [...safePrev, newPost];
                })
                setTitle("");
                setCaption('');
                setZipcode('');
                setPostImages("");
                setMusicURL("");
                closePopup();
            }
            
        } catch(err) {
            setError('Failed to create a new post.')
        }
    };

    return (
    <>
        <section className={`popup ${showModal ? "visible" : "notVisible"}`}>
            <button className='closeButton' onClick={() => setShowModal(false)}>x</button>
            <form onSubmit={handleSubmit}>
                <h2>Create a New Post!</h2>
                <label>
                    Title: <input type="text" name="title" value={title} onChange={handleTitleChange} required/>
                </label>
                <label>
                    Caption: <textarea name="caption" value={caption} onChange={handleCaptionChange}/>
                </label>
                <label>
                    Zipcode: <input type="number" name="zipcode" value={zipcode} onChange={handleZipcodeChange} />
                </label>
                <PostGenre setPostGenre={setPostGenre} postGenre={postGenre}/>
                <PostEventType setPostEventType={setPostEventType} postEventType={postEventType} />
                <PostImages postImages={postImages} setPostImages={setPostImages}/>
                <label>
                    Music URL: <input type="text" name="musicURL" value={musicURL} onChange={handleMusicURLChange} />
                </label>
                <button className="popupButton" type="submit">Post</button>
            </form>
        </section>
        <div className={`overlay ${showModal ? "visible" : "notVisible"}`}></div>
    </>
  )
}

export default CreatePost