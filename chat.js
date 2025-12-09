/**
 * Egis AI Agent - Chat Logic and Groq API Integration
 * Handles all chat functionality and document analysis
 */

class EgisChatAgent {
    constructor() {
        this.conversationHistory = [];
        this.documents = [];
        this.systemPrompt = this.getSystemPrompt();
        this.initialize();
    }

    /**
     * Initialize the chat agent
     */
    initialize() {
        console.log('Initializing Egis Chat Agent...');
        
        // Check API configuration
        if (!config.isConfigured()) {
            this.addMessage('bot', 'Please configure your Groq API key by clicking the ⚙️ button in the bottom right corner.');
            return;
        }

        // Load documents
        this.loadDocuments();
        
        // Setup event listeners
        this.setupEventListeners();
    }

    /**
     * Get system prompt with instructions
     */
    getSystemPrompt() {
        return `You are an AI agent tasked with analyzing all documents available on the Egis Operations site https://ulirdz.github.io/egis-test.ia/. 

Your primary goal is to identify and summarize innovation-related reports from concession sites. 
When consulting the 12 PDF reports, extract key information and present it in a standardized report format.

Focus on:
- Innovation initiatives
- Technological solutions deployed
- Operational improvements
- Sustainability measures
- Lessons learned and recommendations

Always produce outputs in the following structured format:

Title: Innovation Report – [Concession Site Name]

1. Executive Summary
   Brief overview of the site and context
   Main innovation highlights

2. Innovation Initiatives
   Description of new technologies or processes
   Objectives and expected outcomes

3. Implementation Details
   Timeline and phases
   Stakeholders involved
   Resources allocated

4. Results & Impact
   Quantitative outcomes (KPIs, metrics)
   Qualitative outcomes (user experience, operational efficiency)

5. Sustainability & Scalability
   Environmental or social benefits
   Potential for replication in other sites

6. Challenges & Lessons Learned
   Obstacles encountered
   Solutions applied
   Recommendations for future projects

7. Conclusion
   Overall assessment of innovation success
   Next steps or future outlook

Usage Notes:
- If asked for a general résumé of all 12 reports, aggregate findings across sites, highlighting recurring themes (e.g. sustainability, digitalization, efficiency gains).
- If asked for a specific site, filter and present only that site's report in the same structure.
- Always keep the tone professional, concise, and analytical.
- You cannot consult external websites, only information present in your specified sources.

Available documents: The system has access to documents in the /documents folder of the repository.`;
    }

    /**
     * Load documents from repository
     */
    async loadDocuments() {
        // In a real implementation, you would fetch the list of documents from your repository
        // For now, we'll simulate this with a placeholder
        
        console.log('Loading documents from repository...');
        
        // Placeholder for document list
        // You should replace this with actual document fetching logic
        this.documents = [
            { name: 'Site_A_Innovation_Report.pdf', path: '/documents/Site_A_Innovation_Report.pdf' },
            { name: 'Site_B_Innovation_Report.pdf', path: '/documents/Site_B_Innovation_Report.pdf' },
            // Add your 12 PDF documents here
        ];
        
        console.log(`Loaded ${this.documents.length} documents`);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const input = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        
        // Send on button click
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.handleSendMessage());
        }
        
        // Send on Enter (but allow Shift+Enter for new line)
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendMessage();
                }
            });
            
            // Auto-resize textarea
            input.addEventListener('input', () => {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            });
        }
    }

    /**
     * Handle sending a message
     */
    handleSendMessage() {
        const input = document.getElementById('userInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        if (!config.isConfigured()) {
            alert('Please configure your Groq API key first (click ⚙️ button)');
            return;
        }
        
        // Clear input
        input.value = '';
        input.style.height = 'auto';
        
        // Add user message
        this.addMessage('user', message);
        
        // Process with AI
        this.processMessage(message);
    }

    /**
     * Add a message to the chat
     */
    addMessage(sender, content) {
        const messagesDiv = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (sender === 'bot') {
            contentDiv.innerHTML = `<strong>Egis AI Analyst</strong><p>${this.formatMessage(content)}</p>`;
        } else {
            contentDiv.innerHTML = `<strong>You</strong><p>${this.escapeHtml(content)}</p>`;
        }
        
        messageDiv.appendChild(contentDiv);
        messagesDiv.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        const messagesDiv = document.getElementById('messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <strong>Egis AI Analyst</strong>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    /**
     * Remove typing indicator
     */
    removeTypingIndicator() {
        const typingDiv = document.getElementById('typingIndicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    /**
     * Process message with Groq API
     */
    async processMessage(userMessage) {
        this.showTypingIndicator();
        
        try {
            // Add user message to history
            this.conversationHistory.push({
                role: 'user',
                content: userMessage
            });
            
            // Prepare messages for API
            const messages = [
                {
                    role: 'system',
                    content: this.systemPrompt
                },
                ...this.conversationHistory
            ];
            
            // Call Groq API
            const response = await this.callGroqAPI(messages);
            
            // Add assistant response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: response
            });
            
            // Remove typing indicator and show response
            this.removeTypingIndicator();
            this.addMessage('bot', response);
            
        } catch (error) {
            console.error('Error processing message:', error);
            this.removeTypingIndicator();
            this.addMessage('bot', `Error: ${error.message}. Please check your API key configuration and try again.`);
        }
    }

    /**
     * Call Groq API
     */
    async callGroqAPI(messages) {
        const apiKey = config.getApiKey();
        
        if (!apiKey) {
            throw new Error('API key not configured');
        }
        
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.7,
                max_tokens: 8192,
                top_p: 1,
                stream: false
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response from API');
        }
        
        return data.choices[0].message.content;
    }

    /**
     * Format message content (preserve line breaks, etc.)
     */
    formatMessage(content) {
        // Escape HTML
        content = this.escapeHtml(content);
        
        // Convert line breaks to <br>
        content = content.replace(/\n/g, '<br>');
        
        // Format bold text (**text**)
        content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        
        // Format italic text (*text*)
        content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        return content;
    }

    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Clear conversation history
     */
    clearHistory() {
        this.conversationHistory = [];
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = `
            <div class="message bot">
                <div class="message-content">
                    <strong>Egis AI Analyst</strong>
                    <p>Conversation cleared. How can I help you?</p>
                </div>
            </div>
        `;
    }
}

// Global functions for example buttons
function askExample(question) {
    const input = document.getElementById('userInput');
    input.value = question;
    input.focus();
}

function sendMessage() {
    if (window.chatAgent) {
        window.chatAgent.handleSendMessage();
    }
}

// Initialize chat agent when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing chat agent...');
    window.chatAgent = new EgisChatAgent();
});