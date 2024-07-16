import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTimes } from 'react-icons/fa'; // Added FaTimes for close icon
import "../Styles/EventPopup.css"; // CSS for styling popup

function EventPopup({ event, onClose }) {
    const handleRegister = () => {
        // Redirect to Google Form link
        window.open(event.googleFormLink, '_blank');
    };

    const handleImageDownload = (event) => {
        const link = document.createElement('a');
        link.href = event.image;
        link.download = 'poster.jpg'; // Set the download file name
        link.click();
    };

    return (
        <div className="event-popup-container">
            <div className="event-popup-content">
                <div className="popup-header">
                    <h2 className="hed">{event.eventName}</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>
                <div className="event-popup-image-container">
                    {event.image && <img src={event.image} alt={event.eventName} className="event-popup-image" />}
                    <button className="download-btn" onClick={handleImageDownload}>Download Poster</button>
                </div>
                <div className="event-popup-details">
                    <p><FaCalendarAlt /> {event.eventDate}</p>
                    <p><FaClock /> {event.timings}</p>
                    <p><FaMapMarkerAlt /> {event.venue}</p>
                    <p>{event.description}</p>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default EventPopup;
