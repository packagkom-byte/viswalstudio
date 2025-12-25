# Viswalstudio n8n Integration - VS Code Extension

VS Code extension for developing n8n workflows with AI-powered search integration using Ollama.

## Features

- **Workflow Creation**: Quick commands to create n8n workflow templates
- **AI Search**: Integrated AI search powered by Ollama
- **Webhook Testing**: Test your n8n webhooks directly from VS Code
- **Code Snippets**: Predefined snippets for n8n nodes and workflows
- **Configuration**: Easy connection to your n8n and Ollama instances

## Commands

Access commands via Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- `Viswalstudio: Create n8n Workflow` - Create a new workflow from template
- `Viswalstudio: Test Webhook` - Test a webhook endpoint
- `Viswalstudio: Connect to n8n` - Configure n8n connection
- `Viswalstudio: AI Search` - Perform AI-powered search

## Snippets

Type these prefixes in JSON files to insert n8n node templates:

- `n8n-webhook` - Webhook node
- `n8n-http` - HTTP Request node
- `n8n-ollama` - Ollama AI request node
- `n8n-code` - Code node
- `n8n-respond` - Respond to Webhook node
- `n8n-workflow` - Complete workflow template

## Configuration

Configure the extension via VS Code settings:

```json
{
  "viswalstudio.n8nUrl": "http://localhost:5678",
  "viswalstudio.ollamaUrl": "http://localhost:11434",
  "viswalstudio.webhookPath": "webhook/search"
}
```

## Installation

### From Source

1. Clone the repository
2. Navigate to `vscode-extension` directory
3. Run `npm install`
4. Run `npm run package` to create `.vsix` file
5. Install the `.vsix` file in VS Code

### Manual Installation

1. Copy the `vscode-extension` folder to your VS Code extensions directory:
   - Windows: `%USERPROFILE%\.vscode\extensions`
   - macOS/Linux: `~/.vscode/extensions`
2. Restart VS Code

## Requirements

- VS Code 1.75.0 or higher
- Node.js 14.0 or higher
- Running n8n instance
- Running Ollama instance

## Usage Example

1. Open Command Palette
2. Run `Viswalstudio: Create n8n Workflow`
3. Select "AI Search Workflow"
4. Enter a name for your workflow
5. The workflow JSON will open in a new editor
6. Save the file and import it into n8n

## Development

```bash
cd vscode-extension
npm install
npm run lint
```

## License

MIT
