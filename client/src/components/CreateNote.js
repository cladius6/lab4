import React, { useState } from 'react';
import axios from 'axios';

function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3004/api/notes',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = '/';
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Create Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={handleContentChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateNote;