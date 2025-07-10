import React from 'react'

const PostGenre = ({postGenre, setPostGenre}) => {

    const allowedGenres = [
        "POP", 
        "CLASSICAL", 
        "LATIN", 
        "HOUSE", 
        "COUNTRY",
        "HIPHOP", 
        "JAZZ", 
        "ROCK", 
        "DISCO", 
        "EDM", 
        "BLUES", 
        "LOFI"
    ];

    const handleChange = async (event) => {
        setPostGenre(event.target.value);
    }

  return (
    <label>
        Post Genre:
        <select value={postGenre} onChange={handleChange}>
            <option value="" selected disabled>Select Genre</option>
            {allowedGenres.map(genre => (
                <option key={genre} value={genre}>
                    {genre}
                </option>
            ))}
        </select>
    </label> 
  )
}

export default PostGenre