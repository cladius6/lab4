import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const deleteNote = (async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3004/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      window.location.href = '/';
    } catch (error) {
      console.error(error.message);
    }
  });  

  const handleTitleChange = (event => {
    setTitle(event.target.value)
  })

  const handleContentChange = (event => {
    setContent(event.target.value)
  })

  const handleUpdateNote = (async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3004/api/notes/${id}`, 
      { title, content}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      window.location.href = `/notes/${id}`;
    } catch (error) {
      console.error(error.message);
    }
  })

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
      <div>
        <p>Title: {note.title}</p>
        <input type="text" value={title} onChange={handleTitleChange}/>
      </div>
      <div>
        <p>Content: {note.content}</p>
        <textarea type="text" value={content} onChange={handleContentChange}/>
      </div>
      <button onClick={handleUpdateNote}>Update</button>
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
}

export default NoteDetails;