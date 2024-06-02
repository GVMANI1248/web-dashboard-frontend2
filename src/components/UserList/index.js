import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../utils/HandleApi';
import UserListItem from '../UserItems';
import UserDetails from '../UserDetails';
import './index.css'; // Update your CSS file path if needed

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change the number of items per page as needed

  const fetchUsers = async () => {
    await getAllUsers(setUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.text.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply sorting
    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'name') {
        if (sortOrder === 'asc') {
          return a.text.name.localeCompare(b.text.name);
        } else {
          return b.text.name.localeCompare(a.text.name);
        }
      } else if (sortBy === 'dob') {
        const dateA = new Date(a.text.dob);
        const dateB = new Date(b.text.dob);
        if (sortOrder === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      }
    });

    setFilteredUsers(sorted);
  }, [users, searchQuery, sortOrder, sortBy]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const handleDelete = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Logic to get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-list-container">
      {selectedUser ? (
        <UserDetails details={selectedUser} onBack={handleBackClick} onDelete={handleDelete} />
      ) : (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="filters">
            <button onClick={toggleSortOrder}>
              {sortOrder === 'asc' ? `Sort by DOB (Oldest First)` : 'Sort by DOB (Newest First)'}
            </button>
            <select onChange={(e) => handleSortChange(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="dob">Sort by DOB</option>
            </select>
          </div>
          
          <ul className="user-list">
            {currentItems.map((item) => (
              <UserListItem key={item._id} details={item} onClick={handleUserClick} />
            ))}
          </ul>

          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
