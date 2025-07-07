import React, {useState, useEffect} from 'react'

const UserGenres = ({user}) => {
    
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        if (user?.genres) {
            setSelectedGenres(user.genres);
        }
    }, [user])

    if (!user?.genres) return <div>Loading genres...</div>;

    const options = user.genres.map(genre => ({
        value: genre,
        label: genre,
    }));

    const handleChange = (event) => {
        const selected = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedGenres(selected);
    }


    const saveGenres = async () => {
        // fetch 'PUT' endpoint to update DB when saved
    }

  return (
    <div>
        <select multiple value={selectedGenres} onChange={handleChange}>
            {options.map(option => (
                <option key={option.value} value={option.value} >
                    {option.label}
                </option>
            ))}
        </select>
        <button onClick={saveGenres}>Save Genres</button>
        <p>Selected Options: {selectedGenres.join(', ')}</p>
    </div>
  )
}

export default UserGenres;