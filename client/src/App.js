import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteDetails from './components/NoteDetails';
import CreateNote from './components/CreateNote';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/">Note List</Link>
                </li>
                <li>
                  <Link to="/notes/create">Create Note</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<NoteList/>} />
          <Route path="/notes/create" element={<CreateNote/>} />
          <Route path="/notes/:id" element={<NoteDetails/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
