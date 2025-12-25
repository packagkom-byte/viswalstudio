# Viswalstudio - Quick Start Guide

Get up and running with the AI-powered search platform in 5 minutes!

## Prerequisites Check

Before starting, verify you have:

```bash
# Check Docker
docker --version
# Should show: Docker version 20.10 or higher

# Check Docker Compose
docker-compose --version
# Should show: docker-compose version 1.29 or higher
```

If not installed, visit:
- Docker: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/

## Installation (5 Steps)

### Step 1: Clone Repository

```bash
git clone https://github.com/packagkom-byte/viswalstudio.git
cd viswalstudio
```

### Step 2: Run Setup Script

```bash
chmod +x setup.sh
./setup.sh
```

This script will:
- ✅ Create configuration files
- ✅ Start all Docker services
- ✅ Download AI models
- ✅ Display service URLs

**Estimated time**: 5-10 minutes (depending on download speed)

### Step 3: Import n8n Workflow

1. Open http://localhost:5678 in your browser
2. Login with: `admin` / `admin`
3. Click **"Workflows"** → **"Import from File"**
4. Navigate to `n8n/workflows/ai-search-workflow.json`
5. Click **"Import"**
6. Click **"Active"** toggle to enable the workflow

### Step 4: Test AI Search

Open http://localhost:3000 and try searching:
- "What is artificial intelligence?"
- "Explain machine learning"
- "What is Docker?"

### Step 5: Explore Components

**React Dashboard**: http://localhost:3000
- Modern web interface
- Real-time AI search
- System status monitoring

**n8n Workflow**: http://localhost:5678
- Workflow automation
- Customize AI processing
- Add new integrations

**Ollama API**: http://localhost:11434
- Direct AI model access
- Multiple model support

## Quick Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Check status
docker-compose ps

# Test API
curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is AI?"}'
```

## Optional Components

### WordPress Plugin

Install the AI search plugin in WordPress:

1. Copy plugin to WordPress:
   ```bash
   cp -r wordpress-plugin /path/to/wordpress/wp-content/plugins/viswalstudio-ai-search
   ```

2. Activate in WordPress admin

3. Configure: **Settings** → **AI Search**

4. Use widget or shortcode `[ai_search]`

### VS Code Extension

Add n8n workflow tools to VS Code:

1. Open VS Code
2. Install the extension:
   ```bash
   cd vscode-extension
   npm install
   npm run package
   ```

3. Install `.vsix` file in VS Code

4. Use commands:
   - `Ctrl+Shift+P` → "Viswalstudio: AI Search"
   - `Ctrl+Shift+P` → "Viswalstudio: Create n8n Workflow"

## Troubleshooting

### Port Already in Use

If ports are taken, edit `docker-compose.yml`:

```yaml
services:
  n8n:
    ports:
      - "5679:5678"  # Change 5678 to another port
```

### Ollama Model Missing

```bash
docker exec ollama-viswalstudio ollama pull llama2
```

### Can't Access Services

Check if services are running:

```bash
docker-compose ps
```

All should show "Up". If not:

```bash
docker-compose logs [service-name]
```

## Next Steps

1. **Customize Workflows**: Edit workflows in n8n
2. **Add More Models**: Try different Ollama models
3. **Integrate WordPress**: Add search to your site
4. **Develop Extensions**: Use VS Code extension for workflows
5. **Read Documentation**: Check ARCHITECTURE.md and TESTING.md

## Getting Help

- **Documentation**: Check component README files
- **Testing Guide**: See TESTING.md
- **Architecture**: Read ARCHITECTURE.md
- **Issues**: https://github.com/packagkom-byte/viswalstudio/issues

## What You Just Built

✨ **Congratulations!** You now have:

- 🤖 AI-powered search engine
- 🔄 Workflow automation platform
- 📊 Modern React dashboard
- 🔌 WordPress integration (optional)
- 💻 VS Code development tools (optional)
- 🐳 Fully containerized stack

All running **100% locally** with no cloud dependencies!

---

**Total Setup Time**: ~5-10 minutes

**Start searching with AI now**: http://localhost:3000

**Happy Coding! 🚀**
