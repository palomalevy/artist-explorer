import React from 'react'

const PostEventType = ({postEventType, setPostEventType}) => {
      
    const allowedEventTypes = [
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

    const handleChange = async (event) => {
        setPostEventType(event.target.value);
    }

  return (
    <label>
        Event Type:
        <select value={postEventType} onChange={handleChange}>
            <option value="" selected disabled>Select Event</option>
            {allowedEventTypes.map(eventType => (
                <option key={eventType} value={eventType}>
                    {eventType}
                </option>
            ))}
        </select>
    </label> 
  )
}

export default PostEventType