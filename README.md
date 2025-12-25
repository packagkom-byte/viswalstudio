# Viswalstudio

**n8n AI-powered search engine with Ollama integration, WordPress plugin, and VS Code extension. Docker-based workflow automation platform with React dashboard.**

## 🚀 Features

- **AI-Powered Search**: Intelligent search using Ollama language models
- **n8n Workflow Automation**: Customizable workflows for AI processing
- **WordPress Integration**: Plugin for adding AI search to WordPress sites
- **VS Code Extension**: Development tools for n8n workflows
- **React Dashboard**: Modern web interface for search and system monitoring
- **Docker-based**: Easy deployment with Docker Compose

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- WordPress 5.0+ (for WordPress plugin)
- VS Code (for extension)

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/packagkom-byte/viswalstudio.git
cd viswalstudio
```

### 2. Run Setup Script

```bash
chmod +x setup.sh
./setup.sh
```

This will:
- Create `.env` configuration file
- Start Docker containers (n8n, Ollama, Dashboard)
- Download Ollama AI models
- Display service URLs

### 3. Manual Setup (Alternative)

```bash
# Copy environment variables
cp .env.example .env

# Start services
docker-compose up -d

# Download AI model
docker exec -it ollama-viswalstudio ollama pull llama2
```

### 4. Import n8n Workflow

1. Access n8n at http://localhost:5678
2. Login with credentials (admin/admin by default)
3. Go to Workflows → Import from File
4. Select `n8n/workflows/ai-search-workflow.json`
5. Activate the workflow

## 📦 Components

### n8n Workflow Automation

AI-powered search workflow that processes queries using Ollama.

**Location**: `n8n/workflows/`

**Documentation**: [n8n/workflows/README.md](n8n/workflows/README.md)

### WordPress Plugin

Integrates AI search into WordPress sites via widget or shortcode.

**Location**: `wordpress-plugin/`

**Documentation**: [wordpress-plugin/README.md](wordpress-plugin/README.md)

**Installation**:
1. Copy `wordpress-plugin/` to `wp-content/plugins/viswalstudio-ai-search/`
2. Activate in WordPress admin
3. Configure under Settings → AI Search

**Usage**:
- Widget: Add "AI Search" widget to sidebar
- Shortcode: `[ai_search]` in posts/pages

### VS Code Extension

Development extension for creating and testing n8n workflows.

**Location**: `vscode-extension/`

**Documentation**: [vscode-extension/README.md](vscode-extension/README.md)

**Installation**:
```bash
cd vscode-extension
npm install
npm run package
# Install the generated .vsix file in VS Code
```

**Commands**:
- `Viswalstudio: Create n8n Workflow`
- `Viswalstudio: Test Webhook`
- `Viswalstudio: AI Search`

### React Dashboard

Modern web interface for AI search and system monitoring.

**Location**: `dashboard/`

**Local Development**:
```bash
cd dashboard
npm install
npm start
```

**Production Build**:
```bash
cd dashboard
npm run build
```

## 🔧 Configuration

### n8n Configuration

Edit `.env` file:
```env
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=admin
N8N_HOST=localhost
N8N_PORT=5678
```

### Ollama Models

Available models:
- `llama2` (recommended)
- `llama2:13b` (larger, more accurate)
- `codellama` (for code-related queries)

Pull additional models:
```bash
docker exec -it ollama-viswalstudio ollama pull llama2:13b
```

### React Dashboard

Configure API endpoints in `.env`:
```env
REACT_APP_N8N_URL=http://localhost:5678
REACT_APP_OLLAMA_URL=http://localhost:11434
```

## 📖 API Reference

### AI Search Endpoint

**Endpoint**: `POST http://localhost:5678/webhook/search`

**Request**:
```json
{
  "query": "What is artificial intelligence?"
}
```

**Response**:
```json
{
  "query": "What is artificial intelligence?",
  "response": "AI-generated answer...",
  "timestamp": "2025-12-25T01:37:42.175Z",
  "model": "llama2"
}
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a specific service
docker-compose restart n8n

# Remove all data (WARNING: This deletes all data)
docker-compose down -v
```

## 🧪 Testing

### Test n8n Webhook

```bash
curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is AI?"}'
```

### Test Ollama Directly

```bash
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama2",
    "prompt": "What is AI?",
    "stream": false
  }'
```

## 🔒 Security

- Change default n8n credentials in `.env`
- Use HTTPS in production
- Restrict Docker port exposure for production deployments
- Keep Ollama models updated
- Regular security audits of WordPress plugin

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### n8n not accessible

```bash
docker-compose logs n8n
# Check if port 5678 is available
```

### Ollama model not found

```bash
docker exec -it ollama-viswalstudio ollama list
docker exec -it ollama-viswalstudio ollama pull llama2
```

### Dashboard connection errors

1. Verify services are running: `docker-compose ps`
2. Check environment variables in `.env`
3. Ensure CORS is configured correctly

### WordPress plugin not working

1. Check plugin settings under Settings → AI Search
2. Verify n8n URL is accessible from WordPress server
3. Check WordPress error logs

## 📚 Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Ollama Documentation](https://github.com/ollama/ollama)
- [React Documentation](https://react.dev/)
- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)

## 🌟 Features Roadmap

- [ ] Multi-model support
- [ ] Search history and analytics
- [ ] User authentication
- [ ] API rate limiting
- [ ] Advanced workflow templates
- [ ] Mobile app integration
- [ ] Slack/Discord bot integration

## 💬 Support

For issues and questions:
- GitHub Issues: https://github.com/packagkom-byte/viswalstudio/issues
- Documentation: Check component-specific README files

---

**Built with ❤️ using n8n, Ollama, React, and WordPress**