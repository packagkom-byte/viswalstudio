#!/bin/bash

# Viswalstudio Setup Script
# This script initializes the Viswalstudio platform

set -e

echo "🚀 Starting Viswalstudio Setup..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose found"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created."
    echo "⚠️  SECURITY WARNING: Default credentials are admin/admin"
    echo "   Please change these in .env before deploying to production!"
else
    echo "✅ .env file already exists"
fi
echo ""

# Start Docker containers
echo "🐳 Starting Docker containers..."
docker-compose up -d
echo "✅ Docker containers started"
echo ""

# Wait for services to be ready
echo "⏳ Waiting for services to initialize (30 seconds)..."
sleep 30
echo ""

# Pull Ollama model
echo "🤖 Pulling Ollama llama2 model..."
docker exec ollama-viswalstudio ollama pull llama2
echo "✅ Ollama model downloaded"
echo ""

# Display service URLs
echo "✨ Setup complete! Services are running at:"
echo ""
echo "  🔄 n8n Workflow:      http://localhost:5678"
echo "     Login: admin / admin"
echo ""
echo "  🤖 Ollama AI:         http://localhost:11434"
echo ""
echo "  📊 React Dashboard:   http://localhost:3000"
echo ""
echo "📋 Next Steps:"
echo ""
echo "  1. Import n8n workflow:"
echo "     - Go to http://localhost:5678"
echo "     - Login with admin/admin"
echo "     - Import n8n/workflows/ai-search-workflow.json"
echo "     - Activate the workflow"
echo ""
echo "  2. Test the AI search:"
echo "     - Visit http://localhost:3000"
echo "     - Enter a query in the search bar"
echo ""
echo "  3. Install WordPress plugin (optional):"
echo "     - Copy wordpress-plugin/ to your WordPress plugins directory"
echo "     - Activate and configure in Settings → AI Search"
echo ""
echo "  4. Install VS Code extension (optional):"
echo "     - cd vscode-extension && npm install && npm run package"
echo "     - Install the .vsix file in VS Code"
echo ""
echo "🎉 Happy searching with AI!"
