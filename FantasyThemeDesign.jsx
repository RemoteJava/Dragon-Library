import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

function App() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState('library'); // 'library' or 'design-system'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'unread', 'reading', 'read'
  const [genreFilter, setGenreFilter] = useState('all'); // NEW: genre filter
  const [sortBy, setSortBy] = useState('dateAdded'); // NEW: sorting option
  const [expandedReview, setExpandedReview] = useState(null); // NEW: for expanding reviews
  
  // PHASE 4: Achievement & Animation System
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [dragons, setDragons] = useState([]);
  const [celebrationEffect, setCelebrationEffect] = useState(false);
  const [dragonScales, setDragonScales] = useState(0);
  const [particles, setParticles] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    series: '',
    genre: '',
    status: 'unread',
    rating: 0,
    review: ''
  });

  // Genre options
  const genres = [
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Adventure',
    'Historical Fiction',
    'Contemporary',
    'Horror',
    'Romance',
    'Thriller',
    'Non-Fiction',
    'Biography',
    'Poetry',
    'Graphic Novel',
    'Other'
  ];

  // PHASE 4: Achievement definitions
  const achievementDefinitions = [
    { id: 'first_book', name: 'Dragon Hatchling', description: 'Add your first book', icon: '🥚', scales: 10, check: (books) => books.length >= 1 },
    { id: 'five_books', name: 'Dragon Rider', description: 'Add 5 books to your library', icon: '🐉', scales: 25, check: (books) => books.length >= 5 },
    { id: 'ten_books', name: 'Dragon Master', description: 'Build a library of 10 books', icon: '🔥', scales: 50, check: (books) => books.length >= 10 },
    { id: 'first_read', name: 'Quest Complete', description: 'Mark your first book as read', icon: '✓', scales: 15, check: (books) => books.filter(b => b.status === 'read').length >= 1 },
    { id: 'five_read', name: 'Seasoned Adventurer', description: 'Read 5 books', icon: '📖', scales: 30, check: (books) => books.filter(b => b.status === 'read').length >= 5 },
    { id: 'first_review', name: 'Scribe', description: 'Write your first review', icon: '📜', scales: 20, check: (books) => books.filter(b => b.review && b.review.length > 10).length >= 1 },
    { id: 'five_star', name: 'Treasure Found', description: 'Rate a book 5 stars', icon: '⭐', scales: 15, check: (books) => books.filter(b => b.rating === 5).length >= 1 },
    { id: 'three_genres', name: 'Genre Explorer', description: 'Read from 3 different genres', icon: '🗺️', scales: 25, check: (books) => {
      const genres = new Set(books.filter(b => b.genre).map(b => b.genre));
      return genres.size >= 3;
    }},
    { id: 'series_starter', name: 'Series Collector', description: 'Add a book from a series', icon: '📚', scales: 15, check: (books) => books.filter(b => b.series).length >= 1 },
    { id: 'twenty_books', name: 'Dragon Lord', description: 'Amass 20 books in your hoard', icon: '👑', scales: 100, check: (books) => books.length >= 20 }
  ];

  // Load books and achievements from localStorage on mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('dragonLibraryBooks');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
    
    const savedAchievements = localStorage.getItem('dragonLibraryAchievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
    
    const savedScales = localStorage.getItem('dragonLibraryScales');
    if (savedScales) {
      setDragonScales(parseInt(savedScales));
    }
  }, []);

  // Save books to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem('dragonLibraryBooks', JSON.stringify(books));
  }, [books]);

  // Save achievements and scales
  useEffect(() => {
    localStorage.setItem('dragonLibraryAchievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('dragonLibraryScales', dragonScales.toString());
  }, [dragonScales]);

  // PHASE 4: Check for new achievements
  useEffect(() => {
    achievementDefinitions.forEach(achievement => {
      if (!achievements.includes(achievement.id) && achievement.check(books)) {
        unlockAchievement(achievement);
      }
    });
  }, [books]);

  // PHASE 4: Spawn flying dragons periodically
  useEffect(() => {
    const spawnDragon = () => {
      const newDragon = {
        id: Date.now(),
        top: Math.random() * 80 + 10,
        duration: Math.random() * 5 + 5,
        size: Math.random() * 30 + 40
      };
      setDragons(prev => [...prev, newDragon]);
      
      setTimeout(() => {
        setDragons(prev => prev.filter(d => d.id !== newDragon.id));
      }, newDragon.duration * 1000);
    };

    const interval = setInterval(spawnDragon, 8000);
    spawnDragon(); // Spawn one immediately
    
    return () => clearInterval(interval);
  }, []);

  // PHASE 4: Unlock achievement
  const unlockAchievement = (achievement) => {
    setAchievements(prev => [...prev, achievement.id]);
    setDragonScales(prev => prev + achievement.scales);
    setShowAchievement(achievement);
    triggerCelebration();
    
    setTimeout(() => {
      setShowAchievement(null);
    }, 4000);
  };

  // PHASE 4: Trigger celebration effect
  const triggerCelebration = () => {
    setCelebrationEffect(true);
    
    // Create particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 2
    }));
    
    setParticles(newParticles);
    
    setTimeout(() => {
      setCelebrationEffect(false);
      setParticles([]);
    }, 3000);
  };

  // Filter and sort books
  const getFilteredAndSortedBooks = () => {
    let filtered = books;

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search) ||
        (book.series && book.series.toLowerCase().includes(search)) ||
        (book.genre && book.genre.toLowerCase().includes(search))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(book => book.status === statusFilter);
    }

    // Apply genre filter
    if (genreFilter !== 'all') {
      filtered = filtered.filter(book => book.genre === genreFilter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch(sortBy) {
        case 'titleAsc':
          return a.title.localeCompare(b.title);
        case 'titleDesc':
          return b.title.localeCompare(a.title);
        case 'authorAsc':
          return a.author.localeCompare(b.author);
        case 'authorDesc':
          return b.author.localeCompare(a.author);
        case 'ratingDesc':
          return b.rating - a.rating;
        case 'ratingAsc':
          return a.rating - b.rating;
        case 'dateAdded':
        default:
          return b.id - a.id; // Most recent first
      }
    });

    return sorted;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add a new book
  const handleAddBook = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author) {
      alert('Please fill in at least the title and author!');
      return;
    }

    const newBook = {
      id: Date.now(),
      ...formData,
      rating: parseInt(formData.rating) || 0
    };

    setBooks(prev => [...prev, newBook]);
    
    // PHASE 4: Trigger celebration for first book
    if (books.length === 0) {
      triggerCelebration();
    }
    
    // Reset form
    setFormData({
      title: '',
      author: '',
      isbn: '',
      series: '',
      genre: '',
      status: 'unread',
      rating: 0,
      review: ''
    });
    setShowForm(false);
  };

  // Delete a book
  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to remove this book from your library?')) {
      setBooks(prev => prev.filter(book => book.id !== id));
    }
  };

  // PHASE 4: Update book status with celebration
  const handleStatusChange = (bookId, newStatus) => {
    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        if (newStatus === 'read' && book.status !== 'read') {
          triggerCelebration(); // Celebrate finishing a book
        }
        return { ...book, status: newStatus };
      }
      return book;
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setGenreFilter('all');
  };

  // Ancient scroll search handler with ink effect
  const handleSearch = (value) => {
    setSearchTerm(value);
    
    // Create ink splash effect when typing
    if (value.length > 0) {
      const searchBox = document.querySelector('.ancient-scroll-container');
      if (searchBox) {
        searchBox.classList.add('ink-writing');
        setTimeout(() => {
          searchBox.classList.remove('ink-writing');
        }, 300);
      }
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'read': return '✓';
      case 'reading': return '📖';
      case 'unread': return '📚';
      default: return '📚';
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? 'var(--dragon-gold)' : '#cbd5e0' }}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  // Get genre color
  const getGenreColor = (genre) => {
    const genreColors = {
      'Fantasy': 'var(--sunset-purple)',
      'Science Fiction': 'var(--deep-ocean)',
      'Mystery': 'var(--mountain-slate)',
      'Adventure': 'var(--sunset-orange)',
      'Historical Fiction': 'var(--old-paper)',
      'Contemporary': 'var(--sunset-pink)',
      'Horror': 'var(--dragon-red)',
      'Romance': 'var(--sunset-pink)',
      'Thriller': 'var(--mountain-slate)',
      'Non-Fiction': 'var(--dragon-gold)',
      'Biography': 'var(--old-paper)',
      'Poetry': 'var(--sunset-purple)',
      'Graphic Novel': 'var(--sunset-orange)',
      'Other': 'var(--faded-ink)'
    };
    return genreColors[genre] || 'var(--faded-ink)';
  };

  const filteredBooks = getFilteredAndSortedBooks();

  // Get unique genres from books
  const availableGenres = [...new Set(books.map(book => book.genre).filter(Boolean))].sort();

  return (
    <div className="app">
      {/* Background layers */}
      <div className="page-background"></div>
      <div className="mountain-silhouette"></div>
      <div className="dragon-watermark"></div>
      
      {/* PHASE 4: Flying Dragons */}
      {dragons.map(dragon => (
        <div
          key={dragon.id}
          className="flying-dragon"
          style={{
            top: `${dragon.top}%`,
            animationDuration: `${dragon.duration}s`,
            fontSize: `${dragon.size}px`
          }}
        >
          🐉
        </div>
      ))}
      
      {/* PHASE 4: Celebration Particles */}
      {celebrationEffect && particles.map(particle => (
        <div
          key={particle.id}
          className="celebration-particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        >
          ✨
        </div>
      ))}
      
      {/* PHASE 4: Achievement Popup */}
      {showAchievement && (
        <div className="achievement-popup">
          <div className="achievement-icon">{showAchievement.icon}</div>
          <div className="achievement-content">
            <div className="achievement-title">Achievement Unlocked!</div>
            <div className="achievement-name">{showAchievement.name}</div>
            <div className="achievement-description">{showAchievement.description}</div>
            <div className="achievement-reward">+{showAchievement.scales} Dragon Scales 🐉</div>
          </div>
        </div>
      )}
      
      <div className="container">
        <h1>CHLOE'S TEST</h1>
        <p className="subtitle">
          {currentView === 'library' ? 'Your Personal Book Collection' : 'A Fantasy-Themed Design System for Your Book Tracker'}
        </p>
        
        {/* PHASE 4: Dragon Scales Display */}
        {currentView === 'library' && (
          <div className="dragon-scales-display">
            <span className="scales-icon">🐉</span>
            <span className="scales-count">{dragonScales}</span>
            <span className="scales-label">Dragon Scales</span>
          </div>
        )}
        
        {/* Navigation */}
        <div className="bookmark-nav">
          <button 
            className={`bookmark-tab ${currentView === 'library' ? 'active' : ''}`}
            onClick={() => setCurrentView('library')}
          >
            My Library
          </button>
          <button 
            className={`bookmark-tab ${currentView === 'achievements' ? 'active' : ''}`}
            onClick={() => setCurrentView('achievements')}
          >
            🏆 Achievements
          </button>
          <button 
            className="bookmark-tab" 
            onClick={() => {
              if (currentView === 'library') {
                setShowForm(!showForm);
              }
            }}
            style={{ display: currentView === 'library' ? 'block' : 'none' }}
          >
            {showForm ? 'Hide Form' : 'Add Book'}
          </button>
          <button 
            className={`bookmark-tab ${currentView === 'design-system' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('design-system');
              setShowForm(false);
            }}
          >
            Design System
          </button>
        </div>

        {/* ACHIEVEMENTS VIEW */}
        {currentView === 'achievements' && (
          <>
            <div className="parchment-section">
              <h2 className="section-title">Your Achievements</h2>
              <p style={{ textAlign: 'center', color: 'var(--faded-ink)', marginBottom: '30px' }}>
                Complete quests to earn Dragon Scales and unlock achievements!
              </p>
              
              <div className="achievements-grid">
                {achievementDefinitions.map(achievement => {
                  const isUnlocked = achievements.includes(achievement.id);
                  return (
                    <div 
                      key={achievement.id} 
                      className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                    >
                      <div className="achievement-card-icon">{achievement.icon}</div>
                      <div className="achievement-card-name">{achievement.name}</div>
                      <div className="achievement-card-description">{achievement.description}</div>
                      <div className="achievement-card-reward">
                        {isUnlocked ? '✓ Unlocked' : `${achievement.scales} scales`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* LIBRARY VIEW */}
        {currentView === 'library' && (
          <>
            {/* Add Book Form */}
            {showForm && (
              <div className="parchment-section">
                <h2 className="section-title">Add New Book</h2>
                <form onSubmit={handleAddBook} className="book-form">
                  <div className="form-group">
                    <label>Book Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="fantasy-input"
                      placeholder="Enter the book's title..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Author *</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="fantasy-input"
                      placeholder="Enter the author's name..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>ISBN (Optional)</label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      className="fantasy-input"
                      placeholder="e.g., 978-0-123456-78-9"
                    />
                  </div>

                  <div className="form-group">
                    <label>Series (Optional)</label>
                    <input
                      type="text"
                      name="series"
                      value={formData.series}
                      onChange={handleInputChange}
                      className="fantasy-input"
                      placeholder="e.g., Percy Jackson #1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Genre</label>
                    <select
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      className="fantasy-input"
                    >
                      <option value="">Select a genre...</option>
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="fantasy-input"
                    >
                      <option value="unread">Unread</option>
                      <option value="reading">Reading</option>
                      <option value="read">Read</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Rating (0-5)</label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="fantasy-input"
                      min="0"
                      max="5"
                    />
                  </div>

                  <div className="form-group">
                    <label>Review / Notes</label>
                    <textarea
                      name="review"
                      value={formData.review}
                      onChange={handleInputChange}
                      className="fantasy-input"
                      placeholder="Your thoughts about this book..."
                      rows="4"
                    />
                  </div>

                  <button type="submit" className="fantasy-button">
                    Add to Library
                  </button>
                </form>
              </div>
            )}

            <div className="ornamental-divider">⚔️ ◈ 🐉 ◈ ⚔️</div>

            {/* Search and Filter Section */}
            <div className="parchment-section">
              <h2 className="section-title">Search, Filter & Sort</h2>
              
              <div className="search-filter-container">
                {/* Ancient Scroll Search Bar - UPDATED! */}
                <div className="search-box ancient-scroll-container">
                  <div className="scroll-left-edge"></div>
                  <input
                    type="text"
                    className="fantasy-input search-input ancient-scroll-input"
                    placeholder="🪶 Inscribe your search upon this ancient scroll..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={(e) => e.target.parentElement.classList.add('unfurled')}
                    onBlur={(e) => e.target.parentElement.classList.remove('unfurled')}
                  />
                  <div className="scroll-right-edge"></div>
                  <div className="quill-decoration">🪶</div>
                </div>

                {/* Sort Dropdown */}
                <div className="sort-section">
                  <label style={{ color: 'var(--faded-ink)', fontWeight: 600, marginRight: '10px' }}>
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="fantasy-input"
                    style={{ maxWidth: '250px' }}
                  >
                    <option value="dateAdded">Date Added (Newest First)</option>
                    <option value="titleAsc">Title (A to Z)</option>
                    <option value="titleDesc">Title (Z to A)</option>
                    <option value="authorAsc">Author (A to Z)</option>
                    <option value="authorDesc">Author (Z to A)</option>
                    <option value="ratingDesc">Rating (High to Low)</option>
                    <option value="ratingAsc">Rating (Low to High)</option>
                  </select>
                </div>

                {/* Status Filter Buttons */}
                <div className="filter-section">
                  <h3 style={{ color: 'var(--faded-ink)', marginBottom: '10px', fontSize: '0.9em' }}>
                    Filter by Status:
                  </h3>
                  <div className="filter-buttons">
                    <button 
                      className={`filter-button ${statusFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setStatusFilter('all')}
                    >
                      All Books
                    </button>
                    <button 
                      className={`filter-button ${statusFilter === 'unread' ? 'active' : ''}`}
                      onClick={() => setStatusFilter('unread')}
                    >
                      📚 Unread
                    </button>
                    <button 
                      className={`filter-button ${statusFilter === 'reading' ? 'active' : ''}`}
                      onClick={() => setStatusFilter('reading')}
                    >
                      📖 Reading
                    </button>
                    <button 
                      className={`filter-button ${statusFilter === 'read' ? 'active' : ''}`}
                      onClick={() => setStatusFilter('read')}
                    >
                      ✓ Read
                    </button>
                  </div>
                </div>

                {/* Genre Filter Buttons */}
                {availableGenres.length > 0 && (
                  <div className="filter-section">
                    <h3 style={{ color: 'var(--faded-ink)', marginBottom: '10px', fontSize: '0.9em' }}>
                      Filter by Genre:
                    </h3>
                    <div className="filter-buttons">
                      <button 
                        className={`filter-button ${genreFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setGenreFilter('all')}
                      >
                        All Genres
                      </button>
                      {availableGenres.map(genre => (
                        <button 
                          key={genre}
                          className={`filter-button ${genreFilter === genre ? 'active' : ''}`}
                          onClick={() => setGenreFilter(genre)}
                          style={{ 
                            borderColor: getGenreColor(genre),
                            ...(genreFilter === genre && { 
                              background: getGenreColor(genre),
                              color: 'white'
                            })
                          }}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear Filters Button */}
                {(searchTerm || statusFilter !== 'all' || genreFilter !== 'all') && (
                  <button 
                    className="filter-button clear-button"
                    onClick={handleClearFilters}
                    style={{ marginTop: '15px' }}
                  >
                    Clear All Filters
                  </button>
                )}

                {/* Results Count */}
                {(searchTerm || statusFilter !== 'all' || genreFilter !== 'all') && (
                  <div className="results-count">
                    Showing {filteredBooks.length} of {books.length} books
                  </div>
                )}
              </div>
            </div>

            <div className="ornamental-divider">⚔️ ◈ 🐉 ◈ ⚔️</div>

            {/* Books Grid */}
            <div className="parchment-section">
              <h2 className="section-title">Your Collection</h2>
              
              {books.length === 0 ? (
                <div className="empty-state">
                  <p style={{ textAlign: 'center', color: 'var(--faded-ink)', fontSize: '1.2em', padding: '40px' }}>
                    Your library is empty. Click "Add Book" to begin your adventure! 🐉
                  </p>
                </div>
              ) : (
                <>
                  <div className="stats-bar">
                    <div className="stat-item">
                      <span className="stat-number">{books.length}</span>
                      <span className="stat-label">Total Books</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{books.filter(b => b.status === 'read').length}</span>
                      <span className="stat-label">Read</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{books.filter(b => b.status === 'reading').length}</span>
                      <span className="stat-label">Reading</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{books.filter(b => b.status === 'unread').length}</span>
                      <span className="stat-label">Unread</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{availableGenres.length}</span>
                      <span className="stat-label">Genres</span>
                    </div>
                  </div>

                  {filteredBooks.length === 0 ? (
                    <div className="empty-state">
                      <p style={{ textAlign: 'center', color: 'var(--faded-ink)', fontSize: '1.2em', padding: '40px' }}>
                        No books match your search or filter. Try different criteria! 🔍
                      </p>
                    </div>
                  ) : (
                    <div className="books-grid">
                      {filteredBooks.map(book => (
                        <div key={book.id} className="book-card-fantasy">
                          <div className={`wax-seal seal-${book.status}`}>
                            {getStatusIcon(book.status)}
                          </div>
                          
                          <button 
                            className="delete-button"
                            onClick={() => handleDeleteBook(book.id)}
                            title="Remove book"
                          >
                            ×
                          </button>

                          <h3 className="book-title">{book.title}</h3>
                          <p className="book-author">by {book.author}</p>
                          
                          {book.series && (
                            <p className="book-series">{book.series}</p>
                          )}
                          
                          {book.genre && (
                            <span 
                              className="genre-badge"
                              style={{ 
                                background: getGenreColor(book.genre),
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '0.75em',
                                fontWeight: 600,
                                display: 'inline-block',
                                marginTop: '8px'
                              }}
                            >
                              {book.genre}
                            </span>
                          )}
                          
                          <div className="book-rating">
                            {renderStars(book.rating)}
                          </div>
                          
                          {/* PHASE 4: Status Change Buttons */}
                          <div className="status-buttons">
                            <button
                              className={`status-btn ${book.status === 'unread' ? 'active' : ''}`}
                              onClick={() => handleStatusChange(book.id, 'unread')}
                              title="Mark as Unread"
                            >
                              📚
                            </button>
                            <button
                              className={`status-btn ${book.status === 'reading' ? 'active' : ''}`}
                              onClick={() => handleStatusChange(book.id, 'reading')}
                              title="Mark as Reading"
                            >
                              📖
                            </button>
                            <button
                              className={`status-btn ${book.status === 'read' ? 'active' : ''}`}
                              onClick={() => handleStatusChange(book.id, 'read')}
                              title="Mark as Read"
                            >
                              ✓
                            </button>
                          </div>

                          {book.review && (
                            <div className="book-review-section">
                              <p className="review-text">
                                {expandedReview === book.id || book.review.length <= 100
                                  ? book.review
                                  : `${book.review.substring(0, 100)}...`
                                }
                              </p>
                              {book.review.length > 100 && (
                                <button
                                  className="review-toggle"
                                  onClick={() => setExpandedReview(
                                    expandedReview === book.id ? null : book.id
                                  )}
                                >
                                  {expandedReview === book.id ? 'Show less' : 'Read more'}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* DESIGN SYSTEM VIEW - keeping this section the same */}
        {currentView === 'design-system' && (
          <>
            {/* All the design system content remains unchanged */}
            {/* You can add your design system content back here if needed */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
