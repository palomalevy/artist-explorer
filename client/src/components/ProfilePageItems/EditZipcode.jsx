import React, {useState, useEffect} from 'react'

const EditZipcode = ({user, baseURL, setEditing, setIsChange}) => {
    const [zipcode, setZipcode] = useState();

    const handleCancel = () => {
        setEditing(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const zipcodeRes = await fetch(`${baseURL}/api/user/zipcode`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({ zipcode }),
            });

            const zipcodeData = await zipcodeRes.json();
            console.log('Sent to DB: ', zipcodeData)
        } catch (error) {
            console.error(error)
        }

        setEditing(false);
        setIsChange(true);
    }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            <input type="number" placeholder={user.zipcode} value={zipcode} onChange={(event) => setZipcode(event.target.value)}/>
        </label>
        <div className="zipcodeEditButtons">
            <button type="submit">Update Zipcode</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    </form>
  )
}

export default EditZipcode;