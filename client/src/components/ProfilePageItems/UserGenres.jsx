import React, {useState, useEffect} from 'react'

const UserGenres = ({user, baseURL, setIsChange}) => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

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

    if (!user) return <div>Loading user data...</div>;

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
            setIsEditing(false);
        } catch (error) {
        }

        setIsChange(true);
    }

  return (
    <div>
      {!isEditing ? (
        <>
          <p className="selectedItems">
            {selectedGenres.length ? (
            <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                {selectedGenres.map((genre) => (
                <li
                    key={genre}
                    style={{
                    padding: '4px 4px',
                    marginBottom: '2px',
                    backgroundColor: '#9D8189',
                    color: 'white',
                    borderRadius: '10px',
                    display: 'inline-block',
                    display: 'block',
                    width: 'fit-content',
                    }}
                >
                    {genre}
                </li>
                ))}
            </ul>
            ) : (
                <em>None selected</em>
            )}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      ) : (
        <>
          <select
            multiple
            size={allowedGenres.length}
            value={selectedGenres}
            onChange={handleChange}
            className="multi-select"
            autoFocus
          >
            {allowedGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button onClick={saveGenres}>Save</button>
        </>
      )}
    </div>
  )
}

export default UserGenres;