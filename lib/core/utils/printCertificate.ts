export function printStudyCertificate(userName: string, techTitle: string, techId: string) {
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to download or print your certificate.')
    return
  }

  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Generate a mock unique verification code
  const hash = Math.abs(
    userName.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0) + 
    techId.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  ).toString(16).toUpperCase().slice(0, 10)
  const certId = `SF-${techId.toUpperCase().slice(0, 3)}-${hash}`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>StackForge Certificate - ${userName}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;600;700&family=Playfair+Display:ital,wght@1,500&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            width: 297mm;
            height: 210mm;
            box-sizing: border-box;
            background-color: #faf9f5;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .certificate-container {
            width: 277mm;
            height: 190mm;
            border: 6px double #c5a880;
            padding: 20px;
            box-sizing: border-box;
            position: relative;
            background-color: #ffffff;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }
          /* Corner Ornaments */
          .corner {
            position: absolute;
            width: 30px;
            height: 30px;
            border-color: #9d7c4d;
            border-style: solid;
            border-width: 0;
          }
          .top-left { top: 15px; left: 15px; border-top-width: 3px; border-left-width: 3px; }
          .top-right { top: 15px; right: 15px; border-top-width: 3px; border-right-width: 3px; }
          .bottom-left { bottom: 15px; left: 15px; border-bottom-width: 3px; border-left-width: 3px; }
          .bottom-right { bottom: 15px; right: 15px; border-bottom-width: 3px; border-right-width: 3px; }

          .header {
            margin-top: 15px;
            text-align: center;
          }
          .logo-text {
            font-size: 16px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #1e1b4b;
            text-transform: uppercase;
            margin: 0 0 10px 0;
          }
          .cert-title {
            font-family: 'Cinzel', serif;
            font-size: 32px;
            font-weight: 700;
            color: #9d7c4d;
            letter-spacing: 4px;
            margin: 10px 0;
            text-transform: uppercase;
          }
          .cert-subtitle {
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
            letter-spacing: 3px;
            text-transform: uppercase;
          }
          
          .recipient-section {
            text-align: center;
            margin: 10px 0;
          }
          .recipient-label {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            color: #64748b;
            font-size: 16px;
            margin-bottom: 10px;
          }
          .recipient-name {
            font-family: 'Cinzel', serif;
            font-size: 38px;
            font-weight: 800;
            color: #1e1b4b;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 8px;
            min-width: 180mm;
            display: inline-block;
            letter-spacing: 1px;
          }

          .details-section {
            text-align: center;
            max-width: 200mm;
            margin: 0 auto;
          }
          .details-text {
            font-size: 13px;
            color: #475569;
            line-height: 1.8;
          }
          .tech-name {
            font-weight: 700;
            color: #1e1b4b;
          }

          .footer-section {
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 0 40px;
            box-sizing: border-box;
            margin-bottom: 15px;
          }
          .signature-box {
            width: 65mm;
            text-align: center;
          }
          .signature-line {
            border-bottom: 1px solid #cbd5e1;
            margin-bottom: 8px;
            height: 35px;
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 18px;
            color: #1e1b4b;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }
          .signature-title {
            font-size: 10px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .seal-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .gold-seal {
            width: 70px;
            height: 70px;
            background: radial-gradient(circle, #e6c594 0%, #b89150 100%);
            border-radius: 50%;
            position: relative;
            box-shadow: 0 4px 10px rgba(184, 145, 80, 0.3);
            border: 2px solid #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .seal-inner {
            width: 58px;
            height: 58px;
            border: 1px dashed #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Cinzel', serif;
            font-size: 9px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 0.5px;
            text-align: center;
          }

          .verification-box {
            position: absolute;
            bottom: 12px;
            left: 20px;
            font-size: 8px;
            color: #94a3b8;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div className="certificate-container">
          <!-- Corner decorations -->
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>

          <!-- Header -->
          <div className="header">
            <div className="logo-text">StackForge Academy</div>
            <div className="cert-title">Certificate of Completion</div>
            <div className="cert-subtitle">Syllabus Mastery Achievement</div>
          </div>

          <!-- Recipient -->
          <div className="recipient-section">
            <div className="recipient-label">This credential is proudly presented to</div>
            <div className="recipient-name">${userName}</div>
          </div>

          <!-- Description -->
          <div className="details-section">
            <p className="details-text">
              for successfully completing the rigorous online learning program and demonstrating comprehensive core syllabus mastery in <span className="tech-name">${techTitle}</span>. Having completed all curriculum sections, milestone projects, and code verification checkpoints.
            </p>
          </div>

          <!-- Footer Signs & Seal -->
          <div className="footer-section">
            <div className="signature-box">
              <div className="signature-line" style="font-size: 14px;">${dateStr}</div>
              <div className="signature-title">Date of Issuance</div>
            </div>

            <div className="seal-box">
              <div className="gold-seal">
                <div className="seal-inner">STACK<br>FORGE</div>
              </div>
            </div>

            <div className="signature-box">
              <div className="signature-line">StackForge Engine</div>
              <div className="signature-title">Authorized Verifier</div>
            </div>
          </div>

          <!-- Verification Code -->
          <div className="verification-box">
            VERIFICATION ID: ${certId} &nbsp;|&nbsp; STATUS: LOCAL_VERIFIED
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 600);
          }
        </script>
      </body>
    </html>
  `

  printWindow.document.open()
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
