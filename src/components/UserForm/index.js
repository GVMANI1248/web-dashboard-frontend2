import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import './index.css';

const baseUrl = 'https://web-dashboard-backend.onrender.com';

const UserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user || null;

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    email: '',
    description: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData(userData.text);
    }
  }, [userData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const wrappedData = {
      text: formData,
      _id: userData ? userData._id : undefined
    };
    try {
      const url = userData ? `${baseUrl}/update` : `${baseUrl}/save`;
      const method = 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wrappedData)
      });
      if (response.ok) {
        setFormData({
          name: '',
          dob: '',
          contact: '',
          email: '',
          description: ''
        });
        navigate('/userlist'); // Navigate back to user list after saving
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const { name, dob, contact, email, description } = formData;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Name"
        />
        <input
          type="date"
          name="dob"
          value={dob}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="contact"
          value={contact}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Contact"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Email"
        />
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          required
          className="form-textarea"
          placeholder="Description"
        />
        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            'Save'
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
