import axios from 'axios';

const N8N_URL = process.env.REACT_APP_N8N_URL || 'http://localhost:5678';
const OLLAMA_URL = process.env.REACT_APP_OLLAMA_URL || 'http://localhost:11434';
const WEBHOOK_PATH = 'webhook/search';

export const searchWithAI = async (query) => {
  try {
    const response = await axios.post(`${N8N_URL}/${WEBHOOK_PATH}`, {
      query: query
    });
    return response.data;
  } catch (error) {
    console.error('AI Search error:', error);
    throw new Error(error.response?.data?.message || 'Failed to connect to AI search service');
  }
};

export const getSystemStatus = async () => {
  const status = {
    n8n: 'offline',
    ollama: 'offline'
  };

  // Check n8n by testing the webhook endpoint
  try {
    // Use webhook endpoint instead of root URL to bypass auth
    await axios.post(`${N8N_URL}/webhook-test/health`, {}, { 
      timeout: 5000,
      validateStatus: (status) => status === 404 || status === 200 // 404 means n8n is running but workflow doesn't exist
    });
    status.n8n = 'online';
  } catch (error) {
    // If we get a network error, n8n is offline
    // If we get 404, n8n is online but workflow doesn't exist
    if (error.response && error.response.status === 404) {
      status.n8n = 'online';
    } else {
      status.n8n = 'offline';
    }
  }

  // Check Ollama
  try {
    await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 5000 });
    status.ollama = 'online';
  } catch (error) {
    status.ollama = 'offline';
  }

  return status;
};
