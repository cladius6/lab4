import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3004/api/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNote(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchNote();
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Note Details</h1>
      <p>Title: {note.title}</p>
      <p>Content: {note.content}</p>
    </div>
  );
}

export default NoteDetails;