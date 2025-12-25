# Viswalstudio AI Search - WordPress Plugin

AI-powered search integration using n8n and Ollama for WordPress.

## Features

- AI-powered search using Ollama language models
- Integration with n8n workflow automation
- WordPress widget for sidebar placement
- Shortcode support for page/post integration
- AJAX-powered search interface
- Customizable search endpoint

## Installation

1. Copy the `wordpress-plugin` directory to your WordPress `wp-content/plugins/` directory
2. Rename it to `viswalstudio-ai-search`
3. Activate the plugin through the 'Plugins' menu in WordPress
4. Configure the plugin settings under Settings → AI Search

## Configuration

1. Go to Settings → AI Search in WordPress admin
2. Set your n8n instance URL (default: http://localhost:5678)
3. Set the webhook path (default: webhook/search)
4. Save settings

## Usage

### Widget

1. Go to Appearance → Widgets
2. Add the "AI Search" widget to your desired sidebar
3. Customize the title if needed

### Shortcode

Add the following shortcode to any page or post:

```
[ai_search]
```

With custom attributes:

```
[ai_search placeholder="Ask me anything..." button_text="Search"]
```

## Requirements

- WordPress 5.0 or higher
- PHP 7.2 or higher
- Running n8n instance with AI search workflow
- Ollama service with language models

## API Endpoint

The plugin communicates with your n8n webhook endpoint:

**Request:**
```
POST http://your-n8n-url/webhook/search
Content-Type: application/json

{
  "query": "Your search query"
}
```

**Response:**
```json
{
  "query": "Your search query",
  "response": "AI-generated response",
  "timestamp": "2025-12-25T01:37:42.175Z",
  "model": "llama2"
}
```

## License

MIT
