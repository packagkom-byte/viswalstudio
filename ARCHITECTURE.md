# Viswalstudio Architecture

This document describes the architecture of the Viswalstudio AI-powered search platform.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Viswalstudio Platform                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    React     │  │  WordPress   │  │   VS Code    │      │
│  │  Dashboard   │  │   Plugin     │  │  Extension   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                    ┌───────▼────────┐                        │
│                    │  n8n Workflow  │                        │
│                    │   Automation   │                        │
│                    └───────┬────────┘                        │
│                            │                                 │
│                    ┌───────▼────────┐                        │
│                    │     Ollama     │                        │
│                    │   AI Models    │                        │
│                    └────────────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. React Dashboard (Port 3000)

**Purpose**: Web-based user interface for AI search and system monitoring

**Technology Stack**:
- React 18
- Axios for API calls
- Chart.js for analytics (future)

**Key Features**:
- AI search interface
- System status monitoring
- Real-time results display

**Files**:
- `dashboard/src/App.js` - Main application
- `dashboard/src/components/` - React components
- `dashboard/src/services/api.js` - API integration

### 2. n8n Workflow Automation (Port 5678)

**Purpose**: Workflow automation and AI request orchestration

**Technology Stack**:
- n8n workflow engine
- Docker container

**Key Features**:
- Webhook endpoints
- AI request routing
- Response formatting

**Files**:
- `n8n/workflows/ai-search-workflow.json` - Main AI search workflow

**Workflow Flow**:
1. Receive webhook request
2. Extract query from request body
3. Send to Ollama API
4. Format response
5. Return to client

### 3. Ollama AI Service (Port 11434)

**Purpose**: AI language model inference

**Technology Stack**:
- Ollama runtime
- LLaMA 2 model (default)

**Key Features**:
- Model inference
- Multiple model support
- Local execution (no cloud dependency)

**API Endpoints**:
- `/api/generate` - Generate text
- `/api/tags` - List available models

### 4. WordPress Plugin

**Purpose**: Integrate AI search into WordPress sites

**Technology Stack**:
- PHP 7.2+
- WordPress API
- jQuery

**Key Features**:
- Widget for sidebars
- Shortcode support
- Admin settings page
- AJAX search

**Files**:
- `wordpress-plugin/viswalstudio-ai-search.php` - Main plugin file
- `wordpress-plugin/includes/` - Plugin classes
- `wordpress-plugin/assets/` - CSS and JavaScript

**Integration Flow**:
1. User submits search query
2. AJAX request to WordPress admin-ajax.php
3. PHP makes request to n8n webhook
4. Response displayed to user

### 5. VS Code Extension

**Purpose**: Development tools for n8n workflows

**Technology Stack**:
- Node.js
- VS Code Extension API
- Axios

**Key Features**:
- Workflow templates
- Code snippets
- Webhook testing
- AI search integration

**Files**:
- `vscode-extension/src/extension.js` - Main extension
- `vscode-extension/snippets/` - Code snippets

## Data Flow

### AI Search Request Flow

```
User → Interface (Dashboard/WP/VSCode)
  ↓
HTTP POST Request
  ↓
n8n Webhook (localhost:5678/webhook/search)
  ↓
n8n Workflow Processing
  ↓
Ollama API (localhost:11434/api/generate)
  ↓
AI Model Inference
  ↓
Response Formatting
  ↓
Return to User Interface
```

### Request/Response Format

**Request**:
```json
{
  "query": "User's search query"
}
```

**Response**:
```json
{
  "query": "User's search query",
  "response": "AI-generated answer",
  "timestamp": "ISO 8601 timestamp",
  "model": "llama2"
}
```

## Docker Architecture

### Services

1. **n8n**: Workflow automation
   - Image: `n8nio/n8n:latest`
   - Volumes: Workflow data, credentials
   - Network: viswalstudio-network

2. **Ollama**: AI model server
   - Image: `ollama/ollama:latest`
   - Volumes: Model storage
   - Network: viswalstudio-network

3. **Dashboard**: React frontend
   - Build: Custom Dockerfile
   - Volumes: Source code (development)
   - Network: viswalstudio-network

### Network

All services communicate through a Docker bridge network `viswalstudio-network`, enabling service-to-service communication using container names.

## Security Considerations

1. **Authentication**:
   - n8n protected with basic auth
   - WordPress admin required for plugin settings

2. **Data Privacy**:
   - All AI processing is local (no cloud)
   - No data sent to external services

3. **Network Security**:
   - Services isolated in Docker network
   - Only necessary ports exposed

## Scalability

### Current Architecture
- Single-instance Docker deployment
- Suitable for development and small deployments

### Future Improvements
- Load balancing for n8n
- Multiple Ollama instances
- Redis for caching
- Database for search history

## Extension Points

1. **New AI Models**: Add models to Ollama
2. **Custom Workflows**: Create new n8n workflows
3. **Additional Integrations**: Slack, Discord, etc.
4. **Analytics**: Add tracking and metrics
5. **Authentication**: Add user management

## Development Workflow

1. **Local Development**:
   - Docker Compose for services
   - Hot reload for React dashboard
   - n8n UI for workflow editing

2. **Testing**:
   - Manual testing via dashboard
   - Webhook testing via curl/Postman
   - VS Code extension testing

3. **Deployment**:
   - Docker Compose production configuration
   - Environment variable management
   - Volume persistence for data

## Performance Considerations

1. **Ollama**:
   - Model size affects memory usage
   - GPU acceleration recommended for production

2. **n8n**:
   - Webhook timeout configuration
   - Concurrent execution limits

3. **Dashboard**:
   - Lazy loading for components
   - API request debouncing

## Monitoring

### Health Checks

- n8n: HTTP GET to root URL
- Ollama: HTTP GET to `/api/tags`
- Dashboard: Built-in status checks

### Logging

- Docker Compose logs
- n8n workflow execution logs
- Ollama request logs

## Future Architecture

Planned improvements:
- Kubernetes deployment
- API Gateway
- Authentication service
- Analytics pipeline
- Multi-tenant support
