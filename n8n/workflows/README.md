# n8n Workflows

This directory contains n8n workflow templates for the AI-powered search engine.

## Available Workflows

### AI-Powered Search with Ollama
**File**: `ai-search-workflow.json`

This workflow provides an AI-powered search endpoint using Ollama's language models.

**Endpoints**:
- POST `/webhook/search` - Search endpoint

**Request Body**:
```json
{
  "query": "Your search query here"
}
```

**Response**:
```json
{
  "query": "Your search query",
  "response": "AI-generated response",
  "timestamp": "2025-12-25T01:37:42.175Z",
  "model": "llama2"
}
```

## Importing Workflows

1. Access n8n at http://localhost:5678
2. Log in with credentials (admin/admin by default)
3. Click "Workflows" → "Import from File"
4. Select the workflow JSON file
5. Activate the workflow

## Configuration

Make sure Ollama service is running and has the required models installed:
```bash
docker exec -it ollama-viswalstudio ollama pull llama2
```
