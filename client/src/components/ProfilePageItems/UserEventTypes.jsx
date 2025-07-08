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
        // fetch 'PUT' endpoint to update DB when saved
        try {
            console.log('about to fetch')
            const updatedUserRes = await fetch(`${baseURL}/api/user/eventType`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ eventType: selectedEventType }),
            })

            console.log('Preferred events saved!: ', selectedEventType)

            const eventTypeData = await updatedUserRes.json();
            console.log('Sent to DB: ', eventTypeData)
        } catch (error) {
            console.error('Something went wrong: ', error)
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