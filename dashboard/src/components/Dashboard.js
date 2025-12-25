import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { getSystemStatus } from '../services/api';

function Dashboard() {
  const [status, setStatus] = useState({
    n8n: 'checking',
    ollama: 'checking'
  });

  useEffect(() => {
    checkSystemStatus();
  }, []);

  const checkSystemStatus = async () => {
    const statusData = await getSystemStatus();
    setStatus(statusData);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return '🟢';
      case 'offline':
        return '🔴';
      default:
        return '🟡';
    }
  };

  return (
    <div className="dashboard">
      <h2>System Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🔄</div>
          <h3>n8n Workflow</h3>
          <div className="status">
            {getStatusIcon(status.n8n)} {status.n8n}
          </div>
          <p className="card-description">Workflow automation platform</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🤖</div>
          <h3>Ollama AI</h3>
          <div className="status">
            {getStatusIcon(status.ollama)} {status.ollama}
          </div>
          <p className="card-description">AI language model service</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>Analytics</h3>
          <div className="status">🟢 Active</div>
          <p className="card-description">Search analytics and insights</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⚙️</div>
          <h3>Configuration</h3>
          <div className="status">🟢 Ready</div>
          <p className="card-description">System configuration</p>
        </div>
      </div>

      <div className="info-section">
        <h3>Quick Links</h3>
        <ul className="link-list">
          <li>
            <a href={process.env.REACT_APP_N8N_URL || 'http://localhost:5678'} target="_blank" rel="noopener noreferrer">
              🔗 Open n8n Dashboard
            </a>
          </li>
          <li>
            <a href="/docs" target="_blank" rel="noopener noreferrer">
              📚 View Documentation
            </a>
          </li>
          <li>
            <a href="https://github.com/packagkom-byte/viswalstudio" target="_blank" rel="noopener noreferrer">
              💻 GitHub Repository
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
