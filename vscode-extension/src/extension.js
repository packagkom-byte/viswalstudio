const vscode = require('vscode');
const axios = require('axios');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Viswalstudio n8n Integration is now active');

    // Create n8n Workflow command
    let createWorkflow = vscode.commands.registerCommand('viswalstudio.createWorkflow', async function () {
        const workflowType = await vscode.window.showQuickPick([
            'AI Search Workflow',
            'Data Processing Workflow',
            'Custom Workflow'
        ], {
            placeHolder: 'Select workflow type'
        });

        if (!workflowType) {
            return;
        }

        const workflowName = await vscode.window.showInputBox({
            prompt: 'Enter workflow name',
            placeHolder: 'my-workflow'
        });

        if (!workflowName) {
            return;
        }

        let workflowTemplate = getWorkflowTemplate(workflowType, workflowName);
        
        const doc = await vscode.workspace.openTextDocument({
            content: JSON.stringify(workflowTemplate, null, 2),
            language: 'json'
        });
        
        await vscode.window.showTextDocument(doc);
        vscode.window.showInformationMessage(`Created ${workflowType}: ${workflowName}`);
    });

    // Test Webhook command
    let testWebhook = vscode.commands.registerCommand('viswalstudio.testWebhook', async function () {
        const config = vscode.workspace.getConfiguration('viswalstudio');
        const n8nUrl = config.get('n8nUrl');
        const webhookPath = config.get('webhookPath');

        const testQuery = await vscode.window.showInputBox({
            prompt: 'Enter test query',
            placeHolder: 'What is AI?'
        });

        if (!testQuery) {
            return;
        }

        try {
            vscode.window.showInformationMessage('Testing webhook...');
            
            const response = await axios.post(`${n8nUrl}/${webhookPath}`, {
                query: testQuery
            });

            const panel = vscode.window.createWebviewPanel(
                'webhookResult',
                'Webhook Test Result',
                vscode.ViewColumn.One,
                {}
            );

            panel.webview.html = getWebviewContent(response.data);
            
        } catch (error) {
            vscode.window.showErrorMessage(`Webhook test failed: ${error.message}`);
        }
    });

    // Connect to n8n command
    let connectN8n = vscode.commands.registerCommand('viswalstudio.connectN8n', async function () {
        const config = vscode.workspace.getConfiguration('viswalstudio');
        const currentUrl = config.get('n8nUrl');

        const newUrl = await vscode.window.showInputBox({
            prompt: 'Enter n8n URL',
            value: currentUrl,
            placeHolder: 'http://localhost:5678'
        });

        if (newUrl) {
            await config.update('n8nUrl', newUrl, vscode.ConfigurationTarget.Global);
            
            try {
                await axios.get(newUrl);
                vscode.window.showInformationMessage(`Connected to n8n at ${newUrl}`);
            } catch (error) {
                vscode.window.showWarningMessage(`Could not connect to ${newUrl}. Please verify the URL.`);
            }
        }
    });

    // AI Search command
    let aiSearch = vscode.commands.registerCommand('viswalstudio.aiSearch', async function () {
        const config = vscode.workspace.getConfiguration('viswalstudio');
        const n8nUrl = config.get('n8nUrl');
        const webhookPath = config.get('webhookPath');

        const query = await vscode.window.showInputBox({
            prompt: 'Ask AI anything',
            placeHolder: 'Enter your question...'
        });

        if (!query) {
            return;
        }

        try {
            const response = await axios.post(`${n8nUrl}/${webhookPath}`, {
                query: query
            });

            const panel = vscode.window.createWebviewPanel(
                'aiSearchResult',
                'AI Search Result',
                vscode.ViewColumn.Beside,
                {}
            );

            panel.webview.html = getAISearchWebviewContent(response.data);
            
        } catch (error) {
            vscode.window.showErrorMessage(`AI Search failed: ${error.message}`);
        }
    });

    context.subscriptions.push(createWorkflow, testWebhook, connectN8n, aiSearch);
}

function getWorkflowTemplate(type, name) {
    const baseTemplate = {
        name: name,
        nodes: [],
        connections: {},
        active: false,
        settings: { executionOrder: "v1" },
        versionId: "1",
        id: name.toLowerCase().replace(/\s+/g, '-'),
        meta: { instanceId: "viswalstudio" },
        tags: []
    };

    if (type === 'AI Search Workflow') {
        baseTemplate.nodes = [
            {
                parameters: {
                    httpMethod: "POST",
                    path: "search",
                    responseMode: "responseNode",
                    options: {}
                },
                id: "webhook-node",
                name: "Webhook",
                type: "n8n-nodes-base.webhook",
                typeVersion: 1,
                position: [250, 300]
            },
            {
                parameters: {
                    url: "http://ollama:11434/api/generate",
                    requestMethod: "POST",
                    jsonParameters: true,
                    bodyParametersJson: "={{ { \\\"model\\\": \\\"llama2\\\", \\\"prompt\\\": \\\"{{ $json.body.query }}\\\", \\\"stream\\\": false } }}"
                },
                id: "ollama-node",
                name: "Ollama AI",
                type: "n8n-nodes-base.httpRequest",
                typeVersion: 4.1,
                position: [450, 300]
            },
            {
                parameters: {
                    respondWith: "json",
                    responseBody: "={{ $json }}",
                    options: {}
                },
                id: "respond-node",
                name: "Respond",
                type: "n8n-nodes-base.respondToWebhook",
                typeVersion: 1,
                position: [650, 300]
            }
        ];
        baseTemplate.connections = {
            "Webhook": { "main": [[{ "node": "Ollama AI", "type": "main", "index": 0 }]] },
            "Ollama AI": { "main": [[{ "node": "Respond", "type": "main", "index": 0 }]] }
        };
    }

    return baseTemplate;
}

function getWebviewContent(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Webhook Result</title>
        <style>
            body { padding: 20px; font-family: Arial, sans-serif; }
            pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
        </style>
    </head>
    <body>
        <h2>Webhook Test Result</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    </body>
    </html>`;
}

function getAISearchWebviewContent(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Search Result</title>
        <style>
            body { padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; }
            .query { background: #e3f2fd; padding: 10px; border-radius: 5px; margin-bottom: 15px; }
            .response { background: #f4f4f4; padding: 15px; border-radius: 5px; }
            .meta { color: #666; font-size: 0.9em; margin-top: 10px; }
        </style>
    </head>
    <body>
        <h2>AI Search Result</h2>
        <div class="query"><strong>Query:</strong> ${data.query}</div>
        <div class="response">${data.response || data.answer || 'No response'}</div>
        <div class="meta">Model: ${data.model || 'N/A'} | Time: ${data.timestamp || new Date().toISOString()}</div>
    </body>
    </html>`;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
