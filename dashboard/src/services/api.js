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

  // Check n8n - try to access the main URL without auth
  // Since we can't authenticate, we check if we get a 401 (unauthorized) which means n8n is running
  try {
    await axios.get(N8N_URL, { 
      timeout: 5000,
      validateStatus: (status) => status === 401 || status === 200
    });
    status.n8n = 'online';
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 401 means n8n is running but requires auth - that's good!
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
