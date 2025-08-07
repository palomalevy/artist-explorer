import React from 'react'

const PostImages = ({postImages, setPostImages}) => {

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        setPostImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = file;
            return newImages;
        });
    };

    const addImageField = () => {
        setPostImages((prevImages) => [...prevImages, null]);
    };

    const removeImageField = (index) => {
        setPostImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

  return (
    <div>
      <label className="imageField">
        Upload Images:
        {postImages.map((img, index) => (
          <div key={index}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e)}  // Handle file change
            />
            {img && (
              <img
                src={URL.createObjectURL(img)}  // Show image preview
                alt={`Preview #${index + 1}`}
                style={{ width: 100, height: 100, objectFit: 'cover', marginTop: 5 }}
              />
            )}
            <button type="button" onClick={() => removeImageField(index)}>
              Remove
            </button>
          </div>
        ))}
      </label>
      <button type="button" onClick={addImageField}>
        Add Image
      </button>
    </div>
  )
}

export default PostImages