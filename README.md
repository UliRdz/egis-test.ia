
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Egis Operations – AI Innovation Document Analyst</title>

  <!-- Security/Robots -->
  <meta name="robots" content="noindex, nofollow" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="referrer" content="same-origin" />

  <!-- Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font></svg>

  <!-- External styles (preferred) -->
  styles.css

  <!-- Critical inline styles (fallback if styles.css is missing) -->
  <style>
    :root{
      --primary: #2563eb;       /* Main blue color */
      --secondary: #10b981;     /* Green accent */
      --background: #0b0e12;    /* Dark background */
      --surface: #11151b;
      --card: #141a22;
      --text: #e6edf3;
      --muted: #b6c2cf;
      --border: #223142;
      --radius: 14px;
      --shadow: 0 10px 30px rgba(0,0,0,0.35);
    }
    @media (prefers-color-scheme: light){
      :root{
        --background: #f8fafc;
        --surface: #f3f6fb;
        --card: #ffffff;
        --text: #1e293b;
        --muted: #4b5563;
        --border: #e5e7eb;
        --shadow: 0 10px 30px rgba(17,24,39,0.08);
      }
    }
    *{ box-sizing: border-box; }
    html,body{ margin:0; padding:0; background:var(--background); color:var(--text);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial;
    }
    a{ color: var(--primary); text-decoration: none; }
    .container{ max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .topbar{
      position: sticky; top: 0; z-index: 50; backdrop-filter: blur(8px) saturate(160%);
      background: linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,0));
      border-bottom: 1px solid var(--border);
    }
    .nav{
      display:flex; align-items:center; justify-content:space-between; gap:16px; padding:14px 0;
    }
    .brand{ display:flex; align-items:center; gap:12px; font-weight:700; }
    .brand-badge{ width:40px; height:40px; border-radius:12px; display:grid; place-items:center;
      background: radial-gradient(115% 115% at 0% 0%, var(--primary) 0%, #2563eb33 55%, transparent 100%);
      border:1px solid var(--border); box-shadow: var(--shadow); color:#081022; font-size:20px;
    }
    .status-dot{ width:10px; height:10px; border-radius:999px; display:inline-block; margin-left:8px; background:#f59e0b; }
    .status-dot.ok{ background:#10b981; } .status-dot.bad{ background:#ef4444; }
    .nav-links{ display:flex; gap:10px; flex-wrap:wrap; }
    .nav-links a{ padding:8px 12px; border-radius:10px; color:var(--text); border:1px solid transparent; }
    .nav-links a:hover{ background:#2563eb22; border-color: var(--border); }

    .hero{ padding: 36px 0 10px; }
    .hero-card{ background: linear-gradient(180deg, var(--card), var(--surface)); border:1px solid var(--border);
      border-radius:var(--radius); box-shadow: var(--shadow); padding:28px; display:grid; gap:12px;
    }
    .hero h1{ margin:0; font-size: clamp(22px, 4.5vw, 36px); }
    .hero p{ margin:0; color: var(--muted); }
    .tag-row{ display:flex; flex-wrap:wrap; gap:10px; }
    .tag{ padding:6px 10px; border-radius:999px; background: var(--surface); border:1px solid var(--border); color:var(--muted); font-size:13px; }

    .grid{ display:grid; gap:18px; grid-template-columns: repeat(12,1fr); }
    .col-8{ grid-column: span 8; }
    .col-4{ grid-column: span 4; }
    @media (max-width: 980px){ .col-8, .col-4{ grid-column: span 12; } }

    .panel{ background: var(--card); border:1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); }
    .panel-header{ display:flex; align-items:center; justify-content:space-between; padding:16px 18px; border-bottom: 1px solid var(--border); }
    .panel-body{ padding: 16px 18px; }

    .features{ display:grid; gap:12px; grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 780px){ .features{ grid-template-columns: 1fr; } }
    .feature{ border:1px dashed var(--border); border-radius:12px; padding:12px; background: linear-gradient(180deg, var(--surface), transparent); }

    .btn{ display:inline-flex; align-items:center; gap:8px; padding:10px 14px; border-radius:10px;
      border:1px solid var(--border); background: var(--surface); color: var(--text); text-decoration:none; font-weight:600;
    }
    .btn:hover{ background:#2563eb22; }
    .btn.primary{ background: var(--primary); color: white; border-color: transparent; }
    .btn.secondary{ background: var(--secondary); color:#062c22; border-color: transparent; }
    .btn.icon{ width:40px; height:40px; justify-content:center; padding:0; }

    /* Chat layout */
    .chat-wrap{ display:grid; grid-template-rows: auto 1fr auto; height: 560px; border-radius: var(--radius); overflow: hidden; }
    .chat-header{ padding: 12px 14px; border-bottom: 1px solid var(--border); background: var(--surface); display:flex; align-items:center; justify-content:space-between; }
    .chat-stream{ padding: 18px; overflow: auto; background: linear-gradient(180deg, var(--surface), var(--card)); }
    .msg{ max-width: 820px; margin: 0 auto 12px; display:flex; gap:12px; }
    .msg .avatar{ width:34px; height:34px; border-radius:8px; display:grid; place-items:center; background: #2563eb22; border:1px solid var(--border); }
    .msg .bubble{ flex:1; border:1px solid var(--border); border-radius:12px; background: var(--card); padding:12px; }
    .msg.user .bubble{ background: #2563eb22; border-color: #2563eb44; }
    .msg.assistant .bubble{ background: #10b98122; border-color: #10b98144; }
    .typing{ font-size: 13px; color: var(--muted); }

    .chat-input{ display:flex; gap:10px; padding: 12px; border-top: 1px solid var(--border); background: var(--surface); }
    .chat-input input[type="text"]{
      flex:1; padding:12px 14px; border-radius:10px; border:1px solid var(--border); background: var(--card); color: var(--text);
    }
    .chat-input .actions{ display:flex; gap:10px; }

    .examples{ display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; }
    .example{ padding:8px 10px; border-radius:10px; border:1px dashed var(--border); background: var(--surface); color: var(--muted); cursor:pointer; }
    .example:hover{ background:#2563eb22; color: var(--text); }

    code, pre{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    pre{ background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px; overflow: auto; }
    .kbd{ display:inline-block; background: var(--surface); border:1px solid var(--border); padding:2px 6px; border-radius:6px; font-size: 12px; }

    /* Modal */
    .modal-backdrop{ position: fixed; inset: 0; background: rgba(0,0,0,.45); display:none; z-index: 80; }
    .modal{ position: fixed; inset:0; display:none; place-items:center; z-index: 100; }
    .modal .sheet{ width: min(560px, 92vw); background: var(--card); border:1px solid var(--border);
      border-radius: var(--radius); box-shadow: var(--shadow); padding: 16px 18px;
    }

    footer{ margin: 28px 0 40px; color: var(--muted); border-top: 1px solid var(--border); padding-top: 18px; font-size: 13px; }
    .muted{ color: var(--muted); }
  </style>

  <!-- Config and chat logic -->
  config.js</script>
  chat.js</script>
</head>
<body>

  <!-- Topbar -->
  <header class="topbar">
    <div class="container nav">
      <div class="brand">
        <div class="brand-badge">🤖</div>
        <div>
          Egis Operations – AI Innovation Document Analyst
          <div class="muted" style="font-size:13px;">Professional AI-powered chat interface for analyzing innovation reports (Groq API)</div>
        </div>
      </div>
      <nav class="nav-links">
        #featuresFeatures</a>
        #chatChat</a>
        #docsDocs</a>
        #setupSetup</a>
        #supportSupport</a>
        <button id="openSettings" class="btn icon" title="Settings (API key)">⚙️</button>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="hero-card">
        <h1>Egis Operations – AI Innovation Document Analyst</h1>
        <p>A professional AI-powered chat interface for analyzing innovation reports from Egis concession sites. Built with vanilla JavaScript and integrated with Groq AI API.</p>
        <div class="tag-row">
          <span class="tag">🚀 Groq LLM (Llama 3.3 70B)</span>
          <span class="tag">📄 Document-aware (PDFs in <code>/documents</code>)</span>
          <span class="tag">🧠 Conversation memory</span>
          <span class="tag">🔐 Local API key storage</span>
        </div>
        <div class="tag-row" style="margin-top:8px;">
          #chatOpen Chat</a>
          #setupSetup Instructions</a>
          <a class="btnz.github.io/egis-test.ia/Deployed Site</a>
          <span class="muted">Status: <span id="statusDot" class="status-dot" title="Config status"></span></span>
        </div>
      </div>
    </div>
  </section>

  <!-- Main -->
  <main class="container">

    <!-- Features -->
    <section id="features" class="panel">
      <div class="panel-header">
        <h2>🚀 Features</h2>
      </div>
      <div class="panel-body">
        <div class="features">
          <div class="feature">
            <strong>AI-Powered Analysis</strong><br/>
            Uses Groq's LLM to analyze innovation reports.
          </div>
          <div class="feature">
            <strong>Structured Reporting</strong><br/>
            Generates standardized innovation reports.
          </div>
          <div class="feature">
            <strong>Modern UI</strong><br/>
            Clean, responsive design with smooth animations.
          </div>
          <div class="feature">
            <strong>Conversation Memory</strong><br/>
            Maintains context throughout the chat session.
          </div>
          <div class="feature">
            <strong>Secure Configuration</strong><br/>
            API key stored locally in browser.
          </div>
          <div class="feature">
            <strong>Document Aware</strong><br/>
            Designed to work with PDF documents in repository.
          </div>
        </div>
      </div>
    </section>

    <!-- Chat + Sidebar -->
    <section id="chat" class="grid" style="margin-top:18px;">

      <!-- Chat panel -->
      <div class="col-8 panel">
        <div class="chat-wrap">

          <div class="chat-header">
            <div>
              <strong>Chat</strong> — Innovation Report Analysis
              <div class="muted" style="font-size:13px;">Model: <code>llama-3.3-70b-versatile</code> • Temp: <code>0.7</code> • Max tokens: <code>8192</code></div>
            </div>
            <div>
              <button id="clearChat" class="btn" title="Clear conversation">🧹 Clear</button>
              <button id="openSettings2" class="btn icon" title="Settings">⚙️</button>
            </div>
          </div>

          <div id="chatStream" class="chat-stream" aria-live="polite" aria-busy="false">
            <!-- Initial hint -->
            <div class="msg assistant">
              <div class="avatar">🤖</div>
              <div class="bubble">
                <strong>Welcome!</strong> I can analyze innovation reports stored under <code>/documents</code>.
                Try one of the example prompts below or ask a question directly.
                <div class="examples">
                  <span class="example" data-q="Give me a summary of all innovation reports">General summary</span>
                  <span class="example" data-q="What are the main themes across all sites?">Themes across sites</span>
                  <span class="example" data-q="Show me the innovation report for Site A">Site A report</span>
                  <span class="example" data-q="What technological solutions were deployed at Site B?">Technologies at Site B</span>
                  <span class="example" data-q="What sustainability measures were implemented?">Sustainability</span>
                  <span class="example" data-q="List all KPIs and metrics from the reports">KPIs & metrics</span>
                  <span class="example" data-q="What lessons were learned across all projects?">Lessons learned</span>
                </div>
              </div>
            </div>
          </div>

          <div class="chat-input">
            <input id="chatInput" type="text" placeholder="Ask about innovation reports… (e.g., “Give me a summary of all innovation reports”)"
                   aria-label="Message input" />
            <div class="actions">
              <button id="sendBtn" class="btn primary">Send ▶</button>
              <button id="attachBtn" class="btn" title="Reference a PDF path (documents/…)">📎 Reference Doc</button>
            </div>
          </div>

        </div>
      </div>

      <!-- Sidebar / Docs -->
      <aside id="docs" class="col-4 panel">
        <div class="panel-header">
          <h2>📁 File Structure</h2>
        </div>
        <div class="panel-body">
          <pre><code>egis-test.ia/
├── index.html          # Main HTML structure
├── styles.css          # Modern styling
├── config.js           # Configuration management
├── chat.js             # Chat logic and API integration
├── README.md           # This file
└── documents/          # Your PDF files go here
    ├── Site_A_Innovation_Report.pdf
    ├── Site_B_Innovation_Report.pdf
    └── ... (up to 12 reports)</code></pre>

          <div class="spacer" style="height:10px;"></div>
          <h3>🔧 Setup Instructions</h3>
          <ol>
            <li><strong>Upload Files to GitHub Pages</strong><br/>
              Repository: <a href="https://github.com/ulirdz/egis-test.ia" target="_blank"/>
              Upload: <code>index.html</code>, <code>styles.css</code>, <code>config.js</code>, <code>chat.js</code>, <code>README.md</code><br/>
              Create <code>documents/</code> and upload 12 PDF reports.
            </li>
            <li><strong>Enable GitHub Pages</strong><br/>
              Settings → Pages → Source: <em>main/master</em> → Save.<br/>
              Site: <a href="https://ulirdz.github.io/.ia/https://ulirdz.github.io/egis-test.ia/</a>
            </li>
            <li><strong>Get Groq API Key</strong><br/>
              Groq Console → API Keys → Create → Copy key.
            </li>
            <li><strong>Configure the App</strong><br/>
              Open the deployed site → Click <span class="kbd">⚙️</span> → Paste key → Save → Status turns green 🟢.
            </li>
          </ol>

          <h3>🎯 Usage</h3>
          <ul>
            <li><em>General:</em> “Give me a summary of all innovation reports”, “What are the main themes across all sites?”</li>
            <li><em>Specific sites:</em> “Show me the innovation report for Site A”, “What technological solutions were deployed at Site B?”</li>
            <li><em>Topics:</em> “What sustainability measures were implemented?”, “List all KPIs”, “What lessons were learned?”</li>
          </ul>

          <h3>Report Format</h3>
          <pre><code>Title: Innovation Report – [Site Name]

1. Executive Summary
2. Innovation Initiatives
3. Implementation Details
4. Results & Impact
5. Sustainability & Scalability
6. Challenges & Lessons Learned
7. Conclusion</code></pre>

          <h3>🔒 Security Notes</h3>
          <ul>
            <li>API key stored in <code>localStorage</code> (browser only).</li>
            <li>No server — runs 100% client-side.</li>
            <li>Private — chats and API key never leave your browser.</li>
            <li>Clear data: clear browser storage to remove the key.</li>
          </ul>
        </div>
      </aside>

    </section>

    <!-- Customization / Technical / Troubleshooting -->
    <section class="grid" style="margin-top:18px;">
      <div class="col-8 panel">
        <div class="panel-header"><h2>🎨 Customization & 🛠️ Technical Details</h2></div>
        <div class="panel-body">
          <h3>Change Colors</h3>
          <pre><code>:root {
  --primary: #2563eb;        /* Main blue color */
  --secondary: #10b981;      /* Green accent */
  --background: #f8fafc;     /* Light background */
  --text: #1e293b;           /* Text color */
}</code></pre>

          <h3>Modify System Prompt</h3>
          <p>Edit <code>getSystemPrompt()</code> in <code>chat.js</code> to adjust the AI’s behavior.</p>

          <h3>Add More Documents</h3>
          <p>Upload additional PDFs to the <code>/documents</code> folder.</p>

          <h3>Technologies Used</h3>
          <ul>
            <li>Frontend: HTML5, CSS3, JavaScript (ES6+)</li>
            <li>AI Model: Groq AI API (Llama 3.3 70B)</li>
            <li>Hosting: GitHub Pages</li>
            <li>Storage: Browser <code>localStorage</code></li>
          </ul>

          <h3>API Configuration</h3>
          <pre><code>{
  model: "llama-3.3-70b-versatile",
  temperature: 0.7,
  max_tokens: 8192,
  top_p: 1
}</code></pre>

          <h3>Browser Support</h3>
          <p>Chrome/Edge (recommended), Firefox, Safari, mobile browsers</p>
        </div>
      </div>

      <div class="col-4 panel">
        <div class="panel-header"><h2>🐛 Troubleshooting</h2></div>
        <div class="panel-body">
          <h3>"API Key not configured"</h3>
          <ul>
            <li>Click <span class="kbd">⚙️</span> and enter your Groq API key.</li>
            <li>Ensure the key is complete and valid (Groq Console).</li>
          </ul>

          <h3>API Request Fails</h3>
          <ul>
            <li>Verify key and internet connection.</li>
            <li>Ensure Groq service is operational.</li>
            <li>Open browser console for detailed errors.</li>
          </ul>

          <h3>Styling Issues</h3>
          <ul>
            <li>Clear browser cache.</li>
            <li>Confirm <code>styles.css</code> is loaded.</li>
          </ul>

          <h3>Documents Not Found</h3>
          <ul>
            <li>Place PDFs in <code>/documents</code>.</li>
            <li>Check file names and case sensitivity.</li>
            <li>Verify GitHub Pages deployment is complete.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Updates & Support -->
    <section class="grid" style="margin-top:18px;">
      <div class="col-8 panel">
        <div class="panel-header"><h2>🔄 Updates & Maintenance</h2></div>
        <div class="panel-body">
          <h3>Update AI Instructions</h3>
          <ol>
            <li>Edit <code>getSystemPrompt()</code> in <code>chat.js</code>.</li>
            <li>Commit & push to GitHub.</li>
            <li>GitHub Pages will auto-update (few minutes).</li>
          </ol>
          <h3>Add New Features</h3>
          <ol>
            <li>Modify files locally; test in browser.</li>
            <li>Commit & push to GitHub.</li>
            <li>Verify deployment on GitHub Pages.</li>
          </ol>
        </div>
      </div>

      <div id="support" class="col-4 panel">
        <div class="panel-header"><h2>📞 Support & 📄 License</h2></div>
        <div class="panel-body">
          <h3>Support</h3>
          <ul>
            <li>Check troubleshooting above.</li>
            <li>Review browser console for errors.</li>
            <li>Verify files and GitHub Pages config.</li>
          </ul>
          <h3>License</h3>
          <p>This project is for internal Egis Operations use.</p>
        </div>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="container">
    <div>Deployed at: https://ulirdz.github.io/egis-test.ia/https://ulirdz.github.io/egis-test.ia/</a></div>
    <div class="muted">Last Updated: December 2025</div>
  </footer>

  <!-- Settings Modal -->
  <div id="modalBackdrop" class="modal-backdrop" aria-hidden="true"></div>
  <div id="settingsModal" class="modal" aria-hidden="true" role="dialog" aria-labelledby="settingsTitle">
    <div class="sheet">
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <h3 id="settingsTitle">⚙️ Configuration</h3>
        <button id="closeSettings" class="btn icon" aria-label="Close settings">✖</button>
      </div>
      <p class="muted">Paste your Groq API key. Stored locally in <code>localStorage</code>.</p>
      <label for="apiKeyInput"><strong>Groq API Key</strong></label>
      <input id="apiKeyInput" type="text" placeholder="gsk_..." style="width:100%; padding:10px; border-radius:10px; border:1px solid var(--border); background: var(--card); color: var(--text);" />
      <div style="display:flex; gap:10px; margin-top:12px;">
        <button id="saveConfig" class="btn primary">Save Configuration</button>
        <button id="clearConfig" class="btn">Clear</button>
      </div>
      <div class="muted" style="margin-top:10px;">Status: <span id="statusDotModal" class="status-dot" title="Config status"></span></div>
    </div>
  </div>

  <!-- Minimal glue script (UI-only; main logic in chat.js/config.js) -->
  <script>
    // Open/close settings modal
    const modal = document.getElementById('settingsModal');
    const backdrop = document.getElementById('modalBackdrop');
    const openBtn = document.getElementById('openSettings');
    const openBtn2 = document.getElementById('openSettings2');
    const closeBtn = document.getElementById('closeSettings');
    const saveBtn = document.getElementById('saveConfig');
    const clearBtn = document.getElementById('clearConfig');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const statusDot = document.getElementById('statusDot');
    const statusDotModal = document.getElementById('statusDotModal');

    function setModal(show){
      modal.style.display = show ? 'grid' : 'none';
      backdrop.style.display = show ? 'block' : 'none';
      modal.setAttribute('aria-hidden', show ? 'false':'true');
      backdrop.setAttribute('aria-hidden', show ? 'false':'true');
      if(show) apiKeyInput.focus();
    }
    [openBtn, openBtn2].forEach(btn => btn && btn.addEventListener('click', ()=> setModal(true)));
    closeBtn?.addEventListener('click', ()=> setModal(false));
    backdrop?.addEventListener('click', ()=> setModal(false));
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') setModal(false); });

    // Status indicator hooks (expects config.js to expose getApiKey/setApiKey/clearApiKey)
    function refreshStatus(){
      const hasKey = typeof window.getApiKey === 'function' && !!window.getApiKey();
      [statusDot, statusDotModal].forEach(el=>{
        if(!el) return;
        el.classList.remove('ok','bad');
        el.classList.add(hasKey ? 'ok':'bad');
        el.title = hasKey ? 'API key configured' : 'API key missing';
      });
      if(apiKeyInput && typeof window.getApiKey === 'function'){
        apiKeyInput.value = window.getApiKey() || '';
      }
    }
    function initConfigBindings(){
      saveBtn?.addEventListener('click', ()=>{
        if(typeof window.setApiKey === 'function'){
          window.setApiKey(apiKeyInput.value.trim());
        }
        refreshStatus();
        setModal(false);
      });
      clearBtn?.addEventListener('click', ()=>{
        if(typeof window.clearApiKey === 'function'){
          window.clearApiKey();
        }
        refreshStatus();
      });
      refreshStatus();
    }
    window.addEventListener('load', initConfigBindings);

    // Examples click → fill input
    document.querySelectorAll('.example').forEach(el=>{
      el.addEventListener('click', ()=>{
        const q = el.getAttribute('data-q') || el.textContent;
        document.getElementById('chatInput').value = q || '';
      });
    });

    // Chat glue (delegates to chat.js if available)
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearChatBtn = document.getElementById('clearChat');
    const chatStream = document.getElementById('chatStream');

    function appendMessage(role, text){
      const msg = document.createElement('div');
      msg.className = `msg ${role}`;
      msg.innerHTML = `
        <div class="avatar">${role==='user'?'🧑':'🤖'}</div>
        <div class="bubble">${text}</div>
      `;
      chatStream.appendChild(msg);
      chatStream.scrollTop = chatStream.scrollHeight;
    }

    async function handleSend(){
      const text = (chatInput.value || '').trim();
      if(!text) return;
      appendMessage('user', text);
      chatInput.value = '';
      chatInput.focus();

      // Delegate to chat.js if available; otherwise show a placeholder response
      if(typeof window.processMessage === 'function'){
        try{
          document.getElementById('chatStream').setAttribute('aria-busy','true');
          const reply = await window.processMessage(text);
          appendMessage('assistant', reply || 'No response.');
        }catch(err){
          appendMessage('assistant', `Error: ${err?.message || err}`);
        }finally{
          document.getElementById('chatStream').setAttribute('aria-busy','false');
        }
      }else{
        appendMessage('assistant', '🔧 The chat engine is not loaded yet. Ensure <code>chat.js</code> is present.');
      }
    }

    sendBtn?.addEventListener('click', handleSend);
    chatInput?.addEventListener('keydown', (e)=>{ if(e.key==='Enter') handleSend(); });
    clearChatBtn?.addEventListener('click', ()=>{
      chatStream.innerHTML = '';
    });

    // Attach/reference doc (simple helper: inserts suggested path)
    document.getElementById('attachBtn')?.addEventListener('click', ()=>{
      const base = 'documents/Site_A_Innovation_Report.pdf';
      chatInput.value = `${chatInput.value ? chatInput.value + ' ' : ''}(Reference: ${base})`;
      chatInput.focus();
    });
  </script>
</body>
</html>



