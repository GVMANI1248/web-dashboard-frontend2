import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import the CSS file for styling
const baseUrl = 'https://web-dashboard-backend.onrender.com';
const UserDetails = ({ details, onBack, onDelete }) => {
  const navigate = useNavigate();
  const { text } = details;
  const { name, dob, contact, email, description } = { ...text };

  const handleEdit = () => {
    navigate(`/edit/${details._id}`, { state: { user: details } });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${baseUrl}/delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: details._id })
        });
        if (response.ok) {
          onDelete(details._id); // Update the UserList state
          window.location.reload(); // Reload the browser after deletion
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="user-details-container">
        <button onClick={onBack} className="back-button">Back</button>
      <div className="user-details">
        <h2>{name}</h2>
        <p><strong>Date of Birth:</strong> {dob}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Description:</strong> {description}</p>
        <div className="buttons-container">
  <button onClick={handleEdit} className="edit-button">Edit</button>
  <button onClick={handleDelete} className="delete-button">Delete</button>
</div>
      </div>
    </div>
  );
};

export default UserDetails;
