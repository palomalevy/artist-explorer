import React, { useState } from 'react'
import PostImages from './PostImages';
import PostGenre from './PostGenre';
import PostEventType from './PostEventType';

const CreatePost = ({showModal, setShowModal, closePopup, user, setPosts}) => {
    const [title, setTitle] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [caption, setCaption] = useState('');
    const [postImages, setPostImages] = useState([]);
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

        const formData = new FormData();
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('zipcode', parseInt(zipcode));
        formData.append('musicURL', musicURL);
        formData.append('postGenre', postGenre);
        formData.append('postEventType', postEventType);
        formData.append('userID', userID);

        postImages.forEach((image, index) => {
            if (image) {
                formData.append('images', image);  // 'images' is the field name used in the backend (use same name)
            }
        });

        try {
            const postRes = await fetch(`${baseURL}/api/posts/createPosts`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
            
            if (postRes.ok) {
                const newPost = await postRes.json();
                setPosts((prevPosts) => [...prevPosts, newPost]);
                // Reset the form
                setTitle('');
                setCaption('');
                setZipcode('');
                setPostImages([]);
                setMusicURL('');
                closePopup();
            }
        } catch (err) {
            console.error(err)
            setError('Failed to create a new post.');
        }
    };

    return (
    <>       
        <div className={`overlay ${showModal ? "visible" : "notVisible"}`} onClick={() => setShowModal(false)} >
        <section className={`popup ${showModal ? "visible" : "notVisible"}`} onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={() => setShowModal(false)}>&times;</button>
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
                    Music URL: <input type="text" name="musicURL" placeholder="Paste SoundCloud URL" value={musicURL} onChange={handleMusicURLChange} />
                </label>
                <button className="popupButton" type="submit">Post</button>
            </form>
        </section>
        </div>
    </>
  )
}

export default CreatePost