import React, {useState, useEffect} from 'react'

const UserEventTypes = ({user, baseURL}) => {
    const [selectedEventType, setSelectedEventType] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const allowedEvents = [
        "CONCERT", 
        "FESTIVAL", 
        "NIGHTCLUB", 
        "SPEAKEASY", 
        "BAND",
        "STUDIO", 
        "AWARDS", 
        "CLASSES", 
        "THEATER"
    ];

    useEffect(() => {
        if (user?.eventType) {
            setSelectedEventType(user.eventType);
        }
    }, [user])

    if (!user?.eventType) return <div>Loading events...</div>;

    const handleChange = (event) => {
        const selected = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedEventType(selected);
    }


    const saveEventType = async () => {
        try {
            const updatedUserRes = await fetch(`${baseURL}/api/user/eventType`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ eventType: selectedEventType }),
            })
            setIsEditing(false);
        } catch (error) {
        }
    }

  return (
    <div>
      {!isEditing ? (
        <>
          <p className="selectedItems">
            {selectedEventType.length ? (
            <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                {selectedEventType.map((event) => (
                <li
                    key={event}
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
                    {event}
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
            size={allowedEvents.length}
            value={selectedEventType}
            onChange={handleChange}
            className="multi-select"
            autoFocus
          >
            {allowedEvents.map(event => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
          <button onClick={saveEventType}>Save</button>
        </>
      )}
    </div>
  )
}

export default UserEventTypes;