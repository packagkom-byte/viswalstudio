# Testing Guide for Viswalstudio

This guide covers testing procedures for all components of the Viswalstudio platform.

## Prerequisites

Before testing, ensure:
- Docker and Docker Compose are installed
- Services are running: `docker-compose ps`
- Ollama has the llama2 model: `docker exec ollama-viswalstudio ollama list`

## 1. Docker Services Testing

### Start Services

```bash
docker-compose up -d
```

### Check Service Status

```bash
docker-compose ps
```

Expected output: All services should show "Up" status.

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f n8n
docker-compose logs -f ollama
docker-compose logs -f dashboard
```

## 2. n8n Workflow Testing

### Access n8n UI

1. Open http://localhost:5678
2. Login with credentials from `.env` (default: admin/admin)

### Import Workflow

1. Click "Workflows" → "Import from File"
2. Select `n8n/workflows/ai-search-workflow.json`
3. Click "Import"
4. Activate the workflow

### Test Webhook Manually

```bash
curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is artificial intelligence?"}'
```

Expected response:
```json
{
  "query": "What is artificial intelligence?",
  "response": "AI-generated answer...",
  "timestamp": "2025-12-25T...",
  "model": "llama2"
}
```

## 3. Ollama AI Testing

### Check Available Models

```bash
docker exec ollama-viswalstudio ollama list
```

Expected: Should show llama2 model.

### Test Direct API

```bash
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama2",
    "prompt": "Explain AI in one sentence",
    "stream": false
  }'
```

Expected: JSON response with generated text.

### Pull Additional Models

```bash
# Larger model (requires more memory)
docker exec ollama-viswalstudio ollama pull llama2:13b

# Code-specific model
docker exec ollama-viswalstudio ollama pull codellama
```

## 4. React Dashboard Testing

### Local Development

```bash
cd dashboard
npm install
npm start
```

Access at http://localhost:3000

### Production Build

```bash
cd dashboard
npm run build
```

Should create `build/` directory without errors.

### Manual UI Testing

1. **Search Functionality**:
   - Enter query in search bar
   - Click "Search" button
   - Verify loading spinner appears
   - Verify response is displayed

2. **System Status**:
   - Check n8n status indicator
   - Check Ollama status indicator
   - Verify status colors (green = online)

3. **Responsive Design**:
   - Test on mobile viewport
   - Test on tablet viewport
   - Test on desktop viewport

### API Integration Testing

Open browser console and test API calls:

```javascript
// Test search API
fetch('http://localhost:5678/webhook/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'Test query' })
})
.then(r => r.json())
.then(console.log);
```

## 5. WordPress Plugin Testing

### Installation

1. Copy `wordpress-plugin/` to WordPress:
   ```bash
   cp -r wordpress-plugin /path/to/wordpress/wp-content/plugins/viswalstudio-ai-search
   ```

2. Activate in WordPress admin:
   - Go to Plugins → Installed Plugins
   - Find "Viswalstudio AI Search"
   - Click "Activate"

### Configuration

1. Go to Settings → AI Search
2. Set n8n URL: `http://localhost:5678`
3. Set Webhook Path: `webhook/search`
4. Click "Save Settings"

### Widget Testing

1. Go to Appearance → Widgets
2. Add "AI Search" widget to sidebar
3. Visit your site
4. Test search functionality

### Shortcode Testing

1. Create a new page/post
2. Add shortcode: `[ai_search]`
3. Publish and view
4. Test search functionality

### Manual Testing Checklist

- [ ] Widget appears in sidebar
- [ ] Shortcode renders correctly
- [ ] Search input accepts text
- [ ] Submit button works
- [ ] Loading state shows
- [ ] Results display correctly
- [ ] Error messages show for failures
- [ ] Settings page saves correctly

## 6. VS Code Extension Testing

### Installation

```bash
cd vscode-extension
npm install
```

### Package Extension

```bash
npm run package
```

Creates `.vsix` file in the directory.

### Install in VS Code

1. Open VS Code
2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
3. Type "Extensions: Install from VSIX"
4. Select the generated `.vsix` file

### Test Commands

1. **Create Workflow**:
   - Ctrl+Shift+P → "Viswalstudio: Create n8n Workflow"
   - Select workflow type
   - Enter name
   - Verify JSON opens

2. **Test Webhook**:
   - Ctrl+Shift+P → "Viswalstudio: Test Webhook"
   - Enter test query
   - Verify result panel opens

3. **AI Search**:
   - Ctrl+Shift+P → "Viswalstudio: AI Search"
   - Enter query
   - Verify response panel opens

4. **Connect to n8n**:
   - Ctrl+Shift+P → "Viswalstudio: Connect to n8n"
   - Enter URL
   - Verify connection message

### Test Snippets

1. Create a new `.json` file
2. Type `n8n-workflow` and press Tab
3. Verify template is inserted
4. Test other snippets: `n8n-webhook`, `n8n-ollama`, etc.

## 7. Integration Testing

### End-to-End Search Flow

Test complete flow from UI to AI:

1. **Via Dashboard**:
   - Open http://localhost:3000
   - Enter query: "What is machine learning?"
   - Submit and verify response

2. **Via WordPress** (if installed):
   - Visit WordPress site
   - Use widget or shortcode
   - Enter query and verify response

3. **Via VS Code**:
   - Open extension
   - Run AI Search command
   - Enter query and verify response

### Cross-Component Testing

1. **Workflow Changes**:
   - Modify workflow in n8n
   - Test from dashboard
   - Verify changes reflected

2. **Model Changes**:
   - Pull different Ollama model
   - Update workflow to use new model
   - Test from all interfaces

## 8. Performance Testing

### Load Testing

```bash
# Test with multiple concurrent requests
for i in {1..10}; do
  curl -X POST http://localhost:5678/webhook/search \
    -H "Content-Type: application/json" \
    -d '{"query": "Test query '$i'"}' &
done
```

### Response Time

```bash
# Measure response time
time curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is AI?"}'
```

Typical response time: 2-10 seconds (depends on model size and query complexity)

## 9. Error Handling Testing

### Test Invalid Requests

```bash
# Empty query
curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{"query": ""}'

# Invalid JSON
curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{invalid}'

# Missing field
curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Test Service Failures

1. **Ollama Down**:
   ```bash
   docker-compose stop ollama
   # Test search - should show error
   docker-compose start ollama
   ```

2. **n8n Down**:
   ```bash
   docker-compose stop n8n
   # Test search - should show connection error
   docker-compose start n8n
   ```

## 10. Security Testing

### Test Authentication

1. Try accessing n8n without credentials
2. Verify basic auth is required
3. Test with wrong credentials

### Test Input Sanitization

```bash
# Test XSS attempts
curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{"query": "<script>alert(1)</script>"}'

# Verify response sanitizes input
```

### WordPress Security

1. Test without nonce (should fail)
2. Test with invalid nonce (should fail)
3. Test AJAX endpoint permissions

## 11. Automated Testing

### Dashboard Tests

```bash
cd dashboard
npm test
```

### Linting

```bash
# VS Code Extension
cd vscode-extension
npm run lint

# Dashboard
cd dashboard
npm run lint
```

## Test Results Documentation

After testing, document:
- [ ] All services started successfully
- [ ] n8n workflow imported and activated
- [ ] AI search returns valid responses
- [ ] Dashboard UI works correctly
- [ ] WordPress plugin functional (if tested)
- [ ] VS Code extension commands work
- [ ] Error handling works properly
- [ ] Performance is acceptable

## Troubleshooting Test Failures

### n8n Webhook Returns 404

- Verify workflow is activated
- Check webhook path in n8n
- Ensure workflow is saved

### Ollama Returns Error

- Check model is downloaded: `ollama list`
- Verify Ollama is running: `docker ps`
- Check Ollama logs: `docker logs ollama-viswalstudio`

### Dashboard Can't Connect

- Verify n8n URL in `.env`
- Check CORS settings
- Verify network connectivity

### WordPress Plugin Fails

- Check PHP error logs
- Verify n8n URL in plugin settings
- Test n8n endpoint directly with curl

## Continuous Testing

For ongoing development:

1. Test after each code change
2. Run full test suite before commits
3. Document any new test cases
4. Update test documentation

## Test Environment Reset

To reset to clean state:

```bash
# Stop all services
docker-compose down

# Remove all data (WARNING: Deletes everything)
docker-compose down -v

# Restart fresh
docker-compose up -d

# Re-pull Ollama model
docker exec ollama-viswalstudio ollama pull llama2
```

---

**Happy Testing! 🧪**
