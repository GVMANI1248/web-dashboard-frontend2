import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Header from './components/Header';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/userform" element={<UserForm />} />
      <Route path="/userlist" element={<UserList />} />
      <Route path="/edit/:id" element={<UserForm />} /> {/* New route for editing */}
    </Routes>
  </Router>
);

export default App;
