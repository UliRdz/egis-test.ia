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
        return `You are an AI analyst and assistant specialized in Egis Operations innovation reports, you need to answer basic questions about the contained files in the /documents directory. How ever, if asked you can produce individual reports, 
        a **structured, professional report** in Markdown following this exact format:
        
        # Innovation Report – [Site Name]
        
        ## 1. Executive Summary
        - Brief overview of the site and context
        - Main innovation highlights
        
        ## 2. Innovation Initiatives
        - List new technologies or processes
        - Objectives and expected outcomes
        
        ## 3. Implementation Details
        - Timeline and phases
        - Stakeholders involved
        - Resources allocated
        
        ## 4. Results & Impact
        - Quantitative KPIs (use bullet points)
        - Qualitative outcomes (efficiency, user experience)
        
        ## 5. Best Practices by Theme/Domain
        - Sustainability
        - Health & Safety 
        - Intelligent Systems
        - Operational Excellence
      
        ## 6. Sustainability & Scalability
        - Environmental/social benefits
        - Replication potential

        ## 7. Challenges & Lessons Learned
        - Obstacles encountered
        - Solutions applied
        
        ## 8. Conclusion
        - Overall assessment
        - Future outlook
        
        **Rules:**
        - Keep tone professional and concise, always review the structure and format before generating in the chat interface.
        - If summarizing multiple reports, aggregate recurring themes.
        - Do NOT output raw text; always follow the above structure.
        - Do NOT include "|" in your responses, abd always start with a Capital Letter the fisrt word of each sentence.
        Available documents: The system has access to documents in the /documents folder of the repository, You cannot consult external websites, only information present in your specified sources.
        
        Example:
        # Innovation Report – Grand-Paris Water & Energy
        
        ## 1. Executive Summary
        The Smart Integrated Operations Center (SIOC) is a fully digitized, AI-driven hub integrating SCADA, IoT sensors, predictive maintenance, and sustainability dashboards.
        
        ## 4. Results & Impact
        - Water loss reduced by 22%
        - CO₂ emissions cut by 18%
        - Asset availability ↑ 30%`;
    }

    /**
     * Load documents from repository
     */
    async loadDocuments() {
        console.log('Loading documents from repository...');
        
        const documentList = [
            { name: 'AUS024, Nepa, Australia', path: 'documents/AUS024, Nepa, Australia.pdf' },
            { name: 'GBR006, M25, UK', path: 'documents/GBR006, M25, UK.pdf' },
            { name: 'MEX008, Golfo Centro, Mexico', path: 'documents/MEX008, Golfo Centro , Mexico.pdf' },
            { name: 'POR001, A24 EROP, June PORTUGAL', path: 'documents/POR001 A24 EROP June PORTUGAL.pdf' },
            { name: 'POR001, A24 EROP, Nov PORTUGAL', path: 'documents/POR001 A24 EROP Nov PORTUGAL.pdf' },
            { name: 'GER001, Autobahnplus A8, Germany', path: 'documents/GER001 Autobahnplus A8 Germany.pdf' },
            { name: 'FRA013, Routalis A88, France', path: 'documents/FRA013 Routalis A88 France.pdf' },
            { name: 'POL001, AESA, POLAND', path: 'documents/POL001 AESA POLAND.pdf' },
            { name: 'AUT001, A5/S1O/S1W BONAVENTURA SERVICES, AUSTRIA', path: 'documents/AUT001, A5, S1O, S1W AUSTRIA BONAVENTURA SERVICES.pdf' },
            { name: 'KAZ003, NATIONAL EXPRESSWAY 2 (NE-2), Kazakhstan', path: 'documents/KAZ003 NATIONAL EXPRESSWAY 2 (NE-2), Kazakhstan.pdf' },
            { name: 'CRO002, VIA4, CROATIA', path: 'documents/CRO002 VIA4 CROATIA.pdf' },
            { name: 'UAE005, Waagner-Biro, United Arab Emirates', path: 'documents/UAE005, United Arab Emirates, Waagner-Biro.pdf' }
        ];
        
        this.documents = [];
        
        // Show loading message
        this.addMessage('bot', 'Loading documents from repository... This may take a moment.');
        
        for (const doc of documentList) {
            try {
                console.log(`Loading: ${doc.name}`);
                const text = await this.extractTextFromPDF(doc.path);
                this.documents.push({
                    name: doc.name,
                    content: text
                });
                console.log(`✓ Loaded: ${doc.name} (${text.length} characters)`);
            } catch (error) {
                console.error(`✗ Failed to load ${doc.name}:`, error);
            }
        }
        
        console.log(`Successfully loaded ${this.documents.length} documents`);
        this.addMessage('bot', `Successfully loaded ${this.documents.length} documents. How can I help you analyze them?`);
    }
    async extractTextFromPDF(pdfPath) {
            try {
                const pdf = await pdfjsLib.getDocument(pdfPath).promise;
                let fullText = '';
                
                // Extract text from all pages
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n\n';
                }
                
                return fullText.trim();
            } catch (error) {
                console.error(`Error extracting text from ${pdfPath}:`, error);
                throw error;
            }
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
            // Prepare document context
            let documentContext = '\n\n## Available Documents:\n';
            this.documents.forEach(doc => {
                // Limit each document to first 3000 characters to avoid token limits
                const excerpt = doc.content.substring(0, 3000);
                documentContext += `\n### ${doc.name}\n${excerpt}...\n`;
            });

            // Prepare messages for API with document context
            const messages = [
                {
                    role: 'system',
                    content: this.systemPrompt + documentContext
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
                model: 'openai/gpt-oss-120b',
                messages: messages,
                temperature: 0.7,
                max_tokens: 7900,
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
        content = this.convertMarkdownTables(content);
        
        // Convert line breaks to <br>
        content = content.replace(/\n/g, '<br>');

        // Add Egis logo to bullet points (lines starting with *)
        content = content.replace(/^\*\s/gm, '<img src="documents/egis.png" alt="Egis Logo" style="height:20px; vertical-align:middle; margin-right:5px;">');
        
        // Format bold text (**text**)
        content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        
        // Format italic text (*text*)
        content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        // Add Egis logo to bullet points (lines starting with -)
        content = content.replace(/^-\s/gm, '<img src="documents/egis.png" alt="Egis Logo" style="height:20px; vertical-align:middle; margin-right:5px;">');
        
        // Add Egis logo to numbered lists (lines starting with number.)
        content = content.replace(/^(\d+)\.\s/gm, '<img src="documents/egis.png" alt="Egis Logo" style="height:20px; vertical-align:middle; margin-right:5px;">$1. ');
        
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
    // helper: turn blocks of "| … |" lines into a proper table
    convertMarkdownTables(text) {
        const lines = text.split('\n');
        let inTable = false, result = '';
        lines.forEach((line, idx) => {
            if (line.trim().startsWith('|')) {
                if (!inTable) {
                    inTable = true;
                    result += '<table class="markdown-table">';
                }
                const cells = line.trim().replace(/^\||\|$/g, '').split('|');
                result += '<tr>';
                cells.forEach(cell => result += `<td>${cell.trim()}</td>`);
                result += '</tr>';
                const next = lines[idx+1] || '';
                if (!next.trim().startsWith('|')) {
                    result += '</table>';
                    inTable = false;
                }
            } else {
                if (inTable) {
                    result += '</table>';
                    inTable = false;
                }
                result += line + '\n';
            }
        });
        if (inTable) result += '</table>';
        return result;
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







