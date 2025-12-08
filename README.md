<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Egis Operations – Internal Repository (Copilot Test)</title>

  <!-- SEO / Security -->
  <meta name="robots" content="noindex, nofollow" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="referrer" content="same-origin" />

  <!-- Favicon (optional) -->
  data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔒</text></svg>

  <!-- Fonts (system stack for reliability) -->
  <style>
    :root{
      --bg: #0b0e12;
      --bg-soft: #11151b;
      --card: #141a22;
      --text: #e6edf3;
      --muted: #b6c2cf;
      --accent: #00b894;        /* Change accent to brand color if needed */
      --accent-weak: #00b89422;
      --border: #233043;
      --warning: #ffcf33;
      --danger: #ff6b6b;
      --link: #62afff;
      --shadow: 0 10px 30px rgba(0,0,0,0.35);
      --radius: 14px;
    }
    @media (prefers-color-scheme: light){
      :root{
        --bg: #f5f7fb;
        --bg-soft: #f7f9fc;
        --card: #ffffff;
        --text: #0f172a;
        --muted: #4b5563;
        --accent: #0ea5e9;
        --accent-weak: #0ea5e922;
        --border: #e5e7eb;
        --link: #2563eb;
        --shadow: 0 10px 30px rgba(17,24,39,0.08);
      }
    }

    *{ box-sizing: border-box; }
    html, body{
      margin: 0; padding: 0;
      background: var(--bg);
      color: var(--text);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      line-height: 1.6;
    }

    /* Layout */
    .container{ max-width: 1080px; margin: 0 auto; padding: 0 24px; }

    /* Topbar */
    .topbar{
      position: sticky; top: 0; z-index: 50;
      backdrop-filter: saturate(160%) blur(8px);
      background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0));
      border-bottom: 1px solid var(--border);
    }
    .nav{
      display: flex; align-items: center; justify-content: space-between;
      gap: 16px; padding: 14px 24px;
    }
    .brand{
      display:flex; align-items:center; gap:12px; font-weight: 700; letter-spacing: .2px;
    }
    .brand-badge{
      width: 36px; height: 36px; border-radius: 10px;
      background: radial-gradient(115% 115% at 0% 0%, var(--accent) 0%, var(--accent-weak) 60%, transparent 100%);
      border: 1px solid var(--border);
      display:grid; place-items:center;
      color:#082018; font-size: 18px; box-shadow: var(--shadow);
    }
    .nav a{
      color: var(--text); text-decoration: none; font-weight: 600;
      padding: 8px 12px; border-radius: 10px;
    }
    .nav a:hover{ background: var(--accent-weak); color: var(--text); }

    /* Hero */
    .hero{
      padding: 48px 0 10px;
    }
    .hero-card{
      background: linear-gradient(180deg, var(--card), var(--bg-soft));
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 28px;
      display: grid; gap: 14px;
    }
    .hero h1{
      margin: 0; font-size: clamp(22px, 4.2vw, 34px);
      letter-spacing: .3px;
    }
    .tag-row{ display:flex; flex-wrap:wrap; gap:10px; }
    .tag{
      display:inline-flex; align-items:center; gap:8px;
      padding: 6px 10px; border-radius: 999px;
      background: var(--bg-soft); border: 1px solid var(--border);
      color: var(--muted); font-size: 13px;
    }

    /* Section blocks */
    .grid{
      display: grid; gap: 18px;
      grid-template-columns: repeat(12, 1fr);
    }
    .col-8{ grid-column: span 8; }
    .col-4{ grid-column: span 4; }
    @media (max-width: 980px){
      .col-8, .col-4{ grid-column: span 12; }
    }

    .card{
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 22px;
    }
    .card h2{
      margin: 0 0 6px; font-size: 20px;
    }
    .card p{ margin: 0 0 10px; color: var(--muted); }

    .list{
      display:grid; gap: 10px; margin-top: 8px;
    }
    .list li{
      list-style: none;
      display:flex; align-items:center; justify-content:space-between; gap:14px;
      padding: 12px;
      border: 1px dashed var(--border);
      border-radius: 12px;
      background: linear-gradient(180deg, var(--bg-soft), transparent);
    }
    .list .meta{
      display:flex; align-items:center; gap:12px; min-width: 0;
    }
    .badge{
      display:inline-flex; align-items:center; justify-content:center;
      width: 28px; height: 28px; border-radius: 8px;
      background: var(--accent-weak); color: var(--accent); font-weight: 700;
      border: 1px solid var(--border);
      flex: 0 0 28px;
    }
    .label{
      font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .sub{
      color: var(--muted); font-size: 12px;
    }

    .btn-row{ display:flex; flex-wrap:wrap; gap: 10px; }
    .btn{
      display:inline-flex; align-items:center; gap:10px;
      padding: 10px 14px; border-radius: 10px; font-weight: 600;
      border: 1px solid var(--border); text-decoration: none;
      color: var(--text); background: var(--bg-soft);
    }
    .btn:hover{ background: var(--accent-weak); }
    .btn.primary{
      background: var(--accent); color: #062c22; border-color: transparent;
    }
    .btn.primary:hover{ filter: brightness(1.04); }

    /* Alert styles */
    .alert{
      background: linear-gradient(180deg, #1a1f27, #12161c);
      border: 1px solid var(--border);
      border-left: 4px solid var(--warning);
      border-radius: var(--radius);
      padding: 16px 18px;
      display: grid; gap: 8px;
    }
    .alert.danger{ border-left-color: var(--danger); }

    /* Footer */
    footer{
      margin: 28px 0 40px;
      color: var(--muted);
      border-top: 1px solid var(--border);
      padding-top: 18px;
      font-size: 13px;
    }

    /* Utilities */
    .muted{ color: var(--muted); }
    .spacer-12{ height: 12px; }
    .spacer-20{ height: 20px; }
  </style>
</head>
<body>

  <!-- Top navigation -->
  <div class="topbar">
    <div class="container nav">
      <div class="brand">
        <div class="brand-badge">🔒</div>
        <div>
          Egis Operations — Internal Repository
          <div class="sub">Copilot Agent Development (Test Page)</div>
        </div>
      </div>
      <nav class="nav">
        <a href="#purposea>
        #usageUsage</a>
        #notesNotes</a>
        #reportsReports</a>
        #legalLegal</a>
      </nav>
    </div>
  </div>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="hero-card">
        <h1>Internal Access Only: Copilot Agent Development &amp; Consultation</h1>
        <p class="muted">This page hosts exclusive Egis Operations documents strictly for AI agent testing, prototyping, and integration activities. Not intended for public distribution or commercial use.</p>
        <div class="tag-row">
          <span class="tag">🔐 Confidential</span>
          <span class="tag">🧪 Test Repository</span>
          <span class="tag">🤖 Copilot Integration</span>
          <span class="tag">📄 Restricted Documents</span>
        </div>
        <div class="spacer-12"></div>
        <div class="btn-row">
          #reportsBrowse Reports</a>
          #usageView Usage Guidelines</a>
          #legalLegal &amp; Confidentiality</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Main content grid -->
  <section class="container">
    <div class="grid">

      <!-- Left column: purpose & guidelines -->
      <div class="col-8">

        <div id="purpose" class="card">
          <h2>🔒 Purpose of this Repository</h2>
          <p>This site contains exclusive company documents from Egis Operations. The sole reason for uploading these files here is to enable Copilot agent development and consultation. They are not intended for public distribution, commercial use, or external sharing.</p>
          <div class="alert">
            <strong>Reminder:</strong> Internal use only. Access limited to authorized users supporting Copilot integration and testing.
          </div>
        </div>

        <div id="usage" class="card">
          <h2>⚙️ Usage Guidelines</h2>
          <ul class="list">
            <li>
              <div class="meta">
                <div class="badge">1</div>
                <div>
                  <div class="label">Internal AI Agent Development</div>
                  <div class="sub">Documents provided strictly for Copilot-related workflows.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">2</div>
                <div>
                  <div class="label">Authorized Access Only</div>
                  <div class="sub">Limit availability to users who require Copilot integration.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">3</div>
                <div>
                  <div class="label">No Redistribution</div>
                  <div class="sub">Do not copy, publish, or share outside project scope.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">4</div>
                <div>
                  <div class="label">Respect Confidentiality &amp; IP</div>
                  <div class="sub">Any consultation must comply with confidentiality and IP rights.</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div id="notes" class="card">
          <h2>📌 Important Notes</h2>
          <ul class="list">
            <li>
              <div class="meta">
                <div class="badge">•</div>
                <div>
                  <div class="label">Not a Public Archive</div>
                  <div class="sub">Exists solely to make documents accessible to Copilot for testing and prototyping.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">•</div>
                <div>
                  <div class="label">Sensitive Content</div>
                  <div class="sub">Files may include proprietary information belonging to Egis Operations.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">•</div>
                <div>
                  <div class="label">Strictly Prohibited</div>
                  <div class="sub">Unauthorized use or disclosure of these documents is strictly prohibited.</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div id="reports" class="card">
          <h2>📚 Reports (Direct Links)</h2>
          <p class="muted">All links open in a new tab. Use clean, direct URLs whenever possible.</p>
          <ul class="list">
            <li>
              <div class="meta">
                <div class="badge">1</div>
                <div class="label">Report 1</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/20241220_GER001_a+S_Innovation%20Report_04-2024.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">2</div>
                <div class="label">Report 2</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/250630_EgisPT-InnovationReport_S1.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">3</div>
                <div class="label">Report 3</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/251107_EgisPT-InnovationReport_S2.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">4</div>
                <div class="label">Report 4</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/A88%20-%20France%202025%20Innovation%20report%20Q1.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">5</div>
                <div class="label">Report 5</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/AESA%20-%20Poland%20Innovation%20Report%202025.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">6</div>
                <div class="label">Report 6</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/BB_COW_Innovatio_report_2025.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">7</div>
                <div class="label">Report 7</div>
              </div>
              <!-- Note: spaces in URL may require encoding if issues occur -->
             <a href="https://ulirdz.github.io/egis-test.ia/MEX Egis Infraestructura -Innovation Report v1 - 2025H2.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">8</div>
                <div class="label">Report 8</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/OM Signature_Innovation report - M25 (December 2025).pdf" target="_blank">Consulter le rapport PDF</a>
            <li>
              <div class="meta">
                <div class="badge">9</div>
                <div class="label">Report 9</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/OM Signature_Innovation report _Australia.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">10</div>
                <div class="label">Report 10</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/OM Signature_Innovation report_EIMK - Kasakhstan.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">11</div>
                <div class="label">Report 11</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/VIA4 - Croatia INNOVATION REPORT 10.2025 - ATTACHMENT 1.pdf" target="_blank">Consulter le rapport PDF</a>
            </li>
            <li>
              <div class="meta">
                <div class="badge">12</div>
                <div class="label">Report 12</div>
              </div>
              <a href="https://ulirdz.github.io/egis-test.ia/Waagner-Biro Technical Competency Centre, O&M Signature_Innovation report dated 24 Nov 2025.pdf" target="_blank">Consulter le rapport PDF</a>  </li>
          </ul>
        </div>

      </div>

      <!-- Right column: recommended practices & legal -->
      <div class="col-4">

        <div class="card">
          <h2>✅ Recommended Practices</h2>
          <ul class="list">
            <li>
              <div class="meta">
                <div class="badge">✓</div>
                <div>
                  <div class="label">Use Clean, Direct URLs</div>
                  <div class="sub">Avoid query strings; keep minimal path depth.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">✓</div>
                <div>
                  <div class="label">Remove When Done</div>
                  <div class="sub">Delete files once no longer required for development.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">✓</div>
                <div>
                  <div class="label">Secure Local Backup</div>
                  <div class="sub">This repo is not a permanent hosting solution.</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div id="legal" class="card">
          <h2>⚖️ Legal Disclaimer &amp; Confidentiality Notice</h2>
          <div class="alert danger">
            <strong>Property of Egis Operations.</strong> Uploaded solely to enable Copilot agent development and consultation.
          </div>
          <p><strong>By accessing or using these files, you agree:</strong></p>
          <ul class="list">
            <li>
              <div class="meta">
                <div class="badge">1</div>
                <div>
                  <div class="label">Confidentiality</div>
                  <div class="sub">Materials may be proprietary/sensitive. Unauthorized disclosure, reproduction, or distribution is prohibited.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">2</div>
                <div>
                  <div class="label">Limited Use</div>
                  <div class="sub">Consultation only within Copilot agent development scope; commercial use requires prior written consent.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">3</div>
                <div>
                  <div class="label">No Liability</div>
                  <div class="sub">Egis Operations assumes no responsibility for misuse or misinterpretation; users must comply with laws and internal policies.</div>
                </div>
              </div>
            </li>
            <li>
              <div class="meta">
                <div class="badge">4</div>
                <div>
                  <div class="label">Termination of Access</div>
                  <div class="sub">Access may be revoked without notice upon suspected misuse or breach.</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </section>

  <footer class="container">
    <div>© <span id="year"></span> Egis Operations — Internal Use Only</div>
    <div class="sub">This page is a temporary, test-oriented interface to support Copilot agent development.</div>
  </footer>

  <script>
    // Set dynamic year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Optional: warn when link contains unencoded spaces (for clean URLs best practice)
    document.querySelectorAll('a[target="_blank"]').forEach(a=>{
      if(a.href.includes(' ')){
        a.title = 'Tip: This URL contains spaces. Consider URL-encoding spaces as %20 for reliability.';
      }
    });
  </script>
</body>
</html>



