import type { FullTechData } from '../../data/db'

export function printTechRoadmapPdf(tech: string, data: FullTechData) {
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to download the PDF.')
    return
  }

  const title = tech.charAt(0).toUpperCase() + tech.slice(1)
  const overview = data.roadmap.overview
  const phases = data.roadmap.phases
  const projects = data.projects
  const cheatsheet = data.cheatsheet

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>StackForge - ${title} Roadmap</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            color: #0f172a;
            margin: 0;
            padding: 40px;
            line-height: 1.5;
            background-color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #7c3aed;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo-area {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .logo-icon {
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #7c3aed 0%, #0891b2 100%);
            border-radius: 8px;
          }
          .logo-text {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
          }
          .tagline {
            font-size: 12px;
            color: #64748b;
            text-align: right;
          }
          h1 {
            font-size: 32px;
            font-weight: 800;
            margin: 0 0 10px 0;
            color: #0f172a;
          }
          .tech-badge {
            display: inline-block;
            background-color: rgba(124, 58, 237, 0.1);
            color: #7c3aed;
            font-weight: 600;
            font-size: 12px;
            padding: 4px 12px;
            border-radius: 20px;
            margin-bottom: 20px;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          .panel {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            background-color: #f8fafc;
            page-break-inside: avoid;
          }
          .panel-title {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            color: #64748b;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
          }
          .panel-val {
            font-size: 16px;
            font-weight: 600;
            color: #0f172a;
          }
          .section-title {
            font-size: 20px;
            font-weight: 700;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 6px;
            margin-top: 40px;
            margin-bottom: 20px;
            color: #1e1b4b;
            page-break-after: avoid;
          }
          .phase-card {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            background-color: #ffffff;
            page-break-inside: avoid;
          }
          .phase-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }
          .phase-title {
            font-size: 18px;
            font-weight: 700;
            color: #7c3aed;
            margin: 0;
          }
          .phase-desc {
            font-size: 13px;
            color: #64748b;
            margin-bottom: 16px;
          }
          .topic-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .topic-item {
            border-left: 3px solid #0891b2;
            padding-left: 12px;
            margin-bottom: 6px;
          }
          .topic-name {
            font-weight: 600;
            font-size: 14px;
            color: #0f172a;
          }
          .topic-desc {
            font-size: 12px;
            color: #475569;
            margin: 2px 0 4px 0;
          }
          .topic-resources {
            font-size: 11px;
            color: #7c3aed;
            font-weight: 500;
          }
          .project-card {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
            background-color: #f8fafc;
            page-break-inside: avoid;
          }
          .project-title {
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 4px;
          }
          .project-diff {
            font-size: 11px;
            font-weight: 600;
            color: #d97706;
            text-transform: uppercase;
          }
          .code-box {
            font-family: 'JetBrains Mono', monospace;
            background-color: #0f172a;
            color: #f8fafc;
            padding: 12px;
            border-radius: 8px;
            font-size: 11px;
            white-space: pre-wrap;
            margin-top: 8px;
          }
          .recommendation-box {
            background-color: rgba(5, 150, 105, 0.05);
            border: 1px dashed #059669;
            border-radius: 12px;
            padding: 20px;
            margin-top: 40px;
            page-break-inside: avoid;
          }
          .recommendation-title {
            color: #059669;
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 8px;
          }
          .footer {
            margin-top: 60px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-area">
            <div class="logo-icon"></div>
            <div class="logo-text">StackForge</div>
          </div>
          <div class="tagline">Master Code. Build Faster.<br>https://stackforge.dev</div>
        </div>

        <h1>Complete ${title} Roadmap</h1>
        <div class="tech-badge">Interactive Syllabus & Study Guide</div>

        <div class="panel" style="margin-bottom: 24px;">
          <div class="panel-title">Overview</div>
          <p style="margin: 0; font-size: 14px; color: #334155;">${overview.whatIsIt}</p>
        </div>

        <div class="grid">
          <div class="panel">
            <div class="panel-title">Why Learn It</div>
            <div class="panel-val" style="font-size: 13px; font-weight: normal; color: #334155;">${overview.whyLearnIt}</div>
          </div>
          <div class="panel">
            <div class="panel-title">Career Opportunities</div>
            <div class="panel-val" style="font-size: 13px; font-weight: normal; color: #334155;">${overview.careerOpportunities}</div>
          </div>
          <div class="panel">
            <div class="panel-title">Salary Benchmark</div>
            <div class="panel-val" style="color: #7c3aed;">${overview.salaryInfo}</div>
          </div>
          <div class="panel">
            <div class="panel-title">Industry Demand</div>
            <div class="panel-val" style="color: #0891b2;">${overview.industryDemand}</div>
          </div>
        </div>

        <div class="section-title">Learning Roadmap</div>
        ${phases.map((phase: any) => `
          <div class="phase-card">
            <div class="phase-header">
              <h3 class="phase-title">${phase.title}</h3>
            </div>
            <div class="phase-desc">${phase.description}</div>
            <div class="topic-grid">
              ${phase.topics.map((topic: any) => `
                <div class="topic-item">
                  <div class="topic-name">${topic.name}</div>
                  ${topic.description ? `<div class="topic-desc">${topic.description}</div>` : ''}
                  ${topic.resources && topic.resources.length > 0 ? `
                    <div class="topic-resources">Resources: ${topic.resources.join(', ')}</div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        ${projects && projects.length > 0 ? `
          <div class="section-title">Recommended Hands-on Projects</div>
          ${projects.map((proj: any) => `
            <div class="project-card">
              <div class="project-title">${proj.title} <span class="project-diff">(${proj.difficulty})</span></div>
              <p style="margin: 4px 0 8px 0; font-size: 13px; color: #475569;">${proj.description}</p>
              <div style="font-size: 12px; font-weight: 600; color: #334155;">Skills: ${proj.skillsLearned.join(', ')}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Structure:</div>
              <div class="code-box">${proj.sourceCodeStructure}</div>
            </div>
          `).join('')}
        ` : ''}

        ${cheatsheet && cheatsheet.length > 0 ? `
          <div class="section-title">Quick Reference Cheatsheet</div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
            <thead>
              <tr style="background-color: #f1f5f9; text-align: left;">
                <th style="padding: 10px; border: 1px solid #cbd5e1;">Command/Syntax</th>
                <th style="padding: 10px; border: 1px solid #cbd5e1;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${cheatsheet.slice(0, 8).map((item: any) => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;">${item.command}</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569;">${item.description}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}

        <div class="recommendation-box">
          <div class="recommendation-title">StackForge Expert Recommendations</div>
          <p style="margin: 0; font-size: 13px; color: #064e3b; leading-relaxed: 1.6;">
            1. <strong>Learn by coding:</strong> Avoid visual lecture loops. Write code for every phase topic immediately.<br>
            2. <strong>Build projects:</strong> Real skill is gained by handling errors during development setups.<br>
            3. <strong>Practice interviews:</strong> Test your core concepts by answering standard questions regularly.
          </p>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} StackForge. All rights reserved. Created dynamically using StackForge Academy printer.</p>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
        </script>
      </body>
    </html>
  `

  printWindow.document.open()
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
