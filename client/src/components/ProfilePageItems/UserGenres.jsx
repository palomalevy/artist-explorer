import React, {useState, useEffect} from 'react'

const UserGenres = ({user, baseURL, setIsChange}) => {
    const [selectedGenres, setSelectedGenres] = useState([]);

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

    useEffect(() => {
        if (user?.genres) {
            setSelectedGenres(user.genres);
        }
    }, [user])

    if (!user?.genres) return <div>Loading genres...</div>;

    const handleChange = (event) => {
        const selected = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedGenres(selected);
    }


    const saveGenres = async () => {
        // fetch 'PUT' endpoint to update DB when saved
        try {
            const updatedUserRes = await fetch(`${baseURL}/api/user/genres`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ genres: selectedGenres }),
            })

            const genreData = await updatedUserRes.json();
        } catch (error) {
        }

        setIsChange(true);
    }

  return (
    <div>
        <select multiple value={selectedGenres} onChange={handleChange}>
            {allowedGenres.map(genre => (
                <option key={genre} value={genre} >
                    {genre}
                </option>
            ))}
        </select>
        <button onClick={saveGenres}>Save Genres</button>
        <p>Selected Options: {selectedGenres.join(', ')}</p>
    </div>
  )
}

export default UserGenres;