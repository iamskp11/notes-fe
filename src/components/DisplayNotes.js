// src/components/DisplayNotes.js
import React, { useEffect, useState } from 'react';
import './DisplayNotes.css';

const DisplayNotes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;
  const [totalNotes, setAllNotes] = useState([]);
  const [targetPage, setTargetPage] = useState('');

  useEffect(() => {
    // Make a GET request to your backend API to fetch all notes
    // Update the notes state with the response data
	// Function to fetch all notes
	const fetchTotalCount = async () => {
		try {
		  const response = await fetch(`http://127.0.0.1:8080/api/notes?offset=0&limit=10000000`);
		  if (!response.ok) {
			throw new Error('Failed to fetch total count');
		  }
  
		  const notes_data = await response.json();
		  setAllNotes(Math.ceil(notes_data.length / notesPerPage));
		//   const totalPages = totalNotes;
		} catch (error) {
		  console.error('Error fetching total count:', error.message);
		}
	};
    const fetchNotes = async () => {
		try {
		  var new_offset = (currentPage-1)*notesPerPage;
		  const response = await fetch(`http://127.0.0.1:8080/api/notes?offset=${new_offset}&limit=${notesPerPage}`);
		  if (!response.ok) {
			throw new Error('Failed to fetch notes');
		  }
  
		  const data = await response.json();
		  setNotes(data);
		} catch (error) {
		  console.error('Error fetching notes:', error.message);
		}
	  };
  
	  // Call the fetchNotes function
	  fetchTotalCount();
	  fetchNotes();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      // Update the notes after deletion
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const formatTimestamp = (timestamp) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(timestamp).toLocaleDateString('en-GB', options);
  };

  const handleGoToPage = () => {
    const targetPageNumber = parseInt(targetPage, 10);
    if (!isNaN(targetPageNumber) && targetPageNumber >= 1 && targetPageNumber <= totalNotes) {
      setCurrentPage(targetPageNumber);
      setTargetPage('');
    }
  };

//   const totalPages = Math.ceil(notes.length / notesPerPage);

  return (
    <div className="display-notes-container">
      <h2>All Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="note">
          <div className="note-header">
            <div className="note-title">{note.title}</div>
            <div className="note-dates">
              <span>Created: {formatTimestamp(note.createdAt)}</span>
              <span>Updated: {formatTimestamp(note.updatedAt)}</span>
            </div>
          </div>
          <div className="note-content">{note.content}</div>
          <button className="delete-button" onClick={() => handleDeleteNote(note.id)}>
            Delete
          </button>
        </div>
      ))}

	  <div className="pagination-container">
        <span>Page {currentPage} of {totalNotes}</span>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <button disabled={currentPage === totalNotes} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>

		<div className="go-to-page-container">
          <input
            type="text"
            placeholder={`Go to page (1-${totalNotes})`}
            value={targetPage}
            onChange={(e) => setTargetPage(e.target.value)}
          />
          <button onClick={handleGoToPage}>Go</button>
        </div>
      </div>
    </div>
  );
};

export default DisplayNotes;
