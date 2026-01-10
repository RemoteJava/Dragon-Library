import React, { useState, useEffect } from 'react';

const DragonLibrary = () => {
  const [books, setBooks] = useState([]);

  // This function calls your Python Librarian on Port 8000
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8000/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("The Librarian isn't answering:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="app-container">
      <div className="library-card">
        <h1>📜 The Dragon Chronicles</h1>
        <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#8b4513' }}>
          "Knowledge is the only fire that doesn't consume its fuel."
        </p>
        {/* ... the rest of your list ... */}
      </div>
    </div>
  );
};

export default DragonLibrary;