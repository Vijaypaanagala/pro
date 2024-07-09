import React, { useState } from "react";
import "../Styles/Ef.css"; // Import CSS file with updated class name

function Ef() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [chiefGuests, setChiefGuests] = useState('');
    const [venue, setVenue] = useState('');
    const [timings, setTimings] = useState('');
    const [eventCoordinators, setEventCoordinators] = useState('');
    const [sponsors, setSponsors] = useState('');
    const [description, setDescription]=useState('');
    const [image, setImage] = useState(null); // State for storing uploaded image file

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const eventData = {
            eventName,
            eventDate,
            chiefGuests,
            venue,
            timings,
            eventCoordinators,
            sponsors,
            description,
            image // Include image data in your event data object
        };
        // Save eventData to Firebase using dataRef or any other Firebase API
        console.log(eventData); // Example: Log to console for demonstration

        // Clear form fields after submission
        setEventName('');
        setEventDate('');
        setChiefGuests('');
        setVenue('');
        setTimings('');
        setEventCoordinators('');
        setSponsors('');
        setDescription('');
        setImage(null); // Clear uploaded image state
    };

    // Function to handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file selected by the user
        setImage(file); // Set the image state with the selected file
    };

    return (
        <div className="cont"> {/* Updated class name */}
            <h2>Event Form</h2>
            <form onSubmit={handleSubmit}>
                
                    <input
                        type="text"
                        value={eventName}
                        placeholder="Name of the event"
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                
                <br />
                
                    <input
                        type="date"
                        value={eventDate}
                       
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                
                <br />
                
                    <input
                        type="text"
                        value={chiefGuests}
                        placeholder="Chief guests"
                        onChange={(e) => setChiefGuests(e.target.value)}
                        required
                    />
                
                <br />
                
                    <input
                        type="text"
                        value={venue}
                        placeholder="Venue"
                        onChange={(e) => setVenue(e.target.value)}
                        required
                    />
                
                <br />
                
                    <input
                        type="text"
                        value={timings}
                        placeholder="Timings  Eg: 10.00AM  to 5.00PM"
                        onChange={(e) => setTimings(e.target.value)}
                        required
                    />
                
                <br />
                
                    <input
                        type="text"
                        value={eventCoordinators}
                        placeholder="Event Coordinators or volunteers"
                        onChange={(e) => setEventCoordinators(e.target.value)}
                        required
                    />
                
                <br />
                
                    <input
                        type="text"
                        value={sponsors}
                        placeholder="Event sponsors"
                        onChange={(e) => setSponsors(e.target.value)}
                        required
                    />
               
                <br />
                
                    <textarea
                        type="text"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                
                <br />
                <label>
                    Upload Image:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Ef;