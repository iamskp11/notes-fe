// src/components/CreateNote.js
import React, { useState } from 'react';
import './CreateNote.css'; 

const CreateNote = ({ onNoteCreate }) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleNoteTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleNoteContentChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleCreateNote = async () => {
    try {
      // Make a POST request to your backend API to create a new note
      const response = await fetch(`http://127.0.0.1:8080/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: noteTitle,
          content: noteContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      // Clear the input fields
      setNoteTitle('');
      setNoteContent('');

      // Notify the parent component (if needed)
      if (onNoteCreate) {
        onNoteCreate();
      }
    } catch (error) {
      console.error('Error creating note:', error.message);
    }
  };

  return (
    <div className="create-note-container">
      <h2>Create Note</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={noteTitle} onChange={handleNoteTitleChange} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={noteContent} onChange={handleNoteContentChange} />
      </div>
      <button onClick={handleCreateNote}>Create Note</button>
    </div>
  );
};

export default CreateNote;
