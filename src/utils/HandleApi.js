// HandleApi.js
import axios from 'axios';
const baseUrl = 'https://web-dashboard-backend.onrender.com';

const getAllUsers = (setUsers) => {
  axios
    .get(baseUrl)
    .then(({ data }) => {
      console.log('data --->', data);
      setUsers(data);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
};

const addUser = async (formData, setUsers) => {
    try {
      const response = await axios.post(`${baseUrl}/save`, formData);
      const newUser = response.data.text; // Access the user data from the response
      console.log('New user added:', newUser);
      setUsers(newUser);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

export { getAllUsers, addUser };
