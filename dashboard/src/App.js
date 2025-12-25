import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="search-section">
          <h1>AI-Powered Search</h1>
          <p className="subtitle">Ask anything and get intelligent responses powered by Ollama</p>
          <SearchBar onSearch={handleSearch} onLoadingChange={handleLoadingChange} />
          <SearchResults results={searchResults} loading={loading} />
        </div>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
