import React, {useState, useEffect} from 'react'

const UserEventTypes = ({user, baseURL}) => {
    const [selectedEventType, setSelectedEventType] = useState([]);

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

    if (!user?.eventType) return <div>Loading genres...</div>;

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

            const eventTypeData = await updatedUserRes.json();
        } catch (error) {
        }
    }

  return (
    <div>
        <select multiple value={selectedEventType} onChange={handleChange}>
            {allowedEvents.map(event => (
                <option key={event} value={event} >
                    {event}
                </option>
            ))}
        </select>
        <button onClick={saveEventType}>Save Events</button>
        <p>Selected Options: {selectedEventType.join(', ')}</p>
    </div>
  )
}

export default UserEventTypes;