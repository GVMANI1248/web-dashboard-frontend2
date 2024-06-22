// src/components/Header.js

import { NavLink } from 'react-router-dom';
import './index.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <NavLink to="/userform" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Add User</NavLink>
        <NavLink to="/userlist" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>View Users</NavLink>
      </nav>
    </header>
  );
};

export default Header;
