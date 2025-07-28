import React from 'react'

const PostImages = ({postImages, setPostImages}) => {

    const handlePostImagesChange = (index, value) => {
        setPostImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = value.trim();
            return newImages;
        });
    };

    const addImageField = () => {
        setPostImages([...postImages, '']);
    };

    const removeImageField = (index) => {
        const updatedImages = [...postImages];
        updatedImages.splice(index, 1);
        setPostImages(updatedImages);
    };

  return (
    <label>
        Image URL:
        {Array.isArray(postImages) && postImages.map((img, imageIndex) => (
            <div key={imageIndex}>
                <input type="text" value={img || ''} placeholder={`Image URL #${imageIndex + 1}`} onChange={(event) => handlePostImagesChange(imageIndex, event.target.value)} />
                {postImages.length > 1 && (
                    <button type="button" onClick={() => removeImageField(imageIndex)}>Remove</button>
                )}
            </div>
        ))}
        <button type="button" onClick={addImageField}>Add another image</button>
    </label>
  )
}

export default PostImages