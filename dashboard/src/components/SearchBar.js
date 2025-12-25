import React, { useState } from 'react';
import './SearchBar.css';
import { searchWithAI } from '../services/api';

function SearchBar({ onSearch, onLoadingChange }) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }

    onLoadingChange(true);
    
    try {
      const results = await searchWithAI(query);
      onSearch(results);
    } catch (error) {
      console.error('Search error:', error);
      onSearch({ error: error.message || 'Search failed' });
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Ask AI anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
