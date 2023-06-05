import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3004/api/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Note List</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
