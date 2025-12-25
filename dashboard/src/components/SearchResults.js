import React from 'react';
import './SearchResults.css';

function SearchResults({ results, loading }) {
  if (loading) {
    return (
      <div className="search-results">
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching with AI...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  if (results.error) {
    return (
      <div className="search-results">
        <div className="error">
          <h3>Error</h3>
          <p>{results.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="result-card">
        <div className="result-header">
          <h3>AI Response</h3>
          {results.model && <span className="model-badge">{results.model}</span>}
        </div>
        <div className="result-query">
          <strong>Query:</strong> {results.query}
        </div>
        <div className="result-response">
          {results.response || results.answer || 'No response received'}
        </div>
        {results.timestamp && (
          <div className="result-meta">
            <span>⏱️ {new Date(results.timestamp).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
