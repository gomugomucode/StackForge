(()=>{var e={};e.id=6693,e.ids=[6693],e.modules={20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},55315:e=>{"use strict";e.exports=require("path")},37495:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,pages:()=>d,routeModule:()=>x,tree:()=>c});var s=r(3003),a=r(14293),i=r(66550),n=r.n(i),l=r(86979),o={};for(let e in l)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);r.d(t,o);let c=["",{children:["certificates",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,75452)),"C:\\Users\\Anupam Baral\\Desktop\\clone\\app\\certificates\\[id]\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,66877)),"C:\\Users\\Anupam Baral\\Desktop\\clone\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,52075,23)),"next/dist/client/components/not-found-error"]}],d=["C:\\Users\\Anupam Baral\\Desktop\\clone\\app\\certificates\\[id]\\page.tsx"],p={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/certificates/[id]/page",pathname:"/certificates/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},7501:(e,t,r)=>{Promise.resolve().then(r.bind(r,70629))},70629:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>f});var s=r(68819),a=r(17266),i=r(35047),n=r(90434),l=r(86333),o=r(9015),c=r(79635),d=r(32933),p=r(3869);r(81954);var x=r(38957),m=r(38266),u=r(95037);function f(){let e=(0,i.useParams)().technology||"",t=e.toLowerCase(),[r,f]=(0,a.useState)(null),[h,b]=(0,a.useState)(!0),[g,y]=(0,a.useState)((0,x.vW)()),[v,w]=(0,a.useState)(!1),[j,N]=(0,a.useState)(g),k=(0,a.useMemo)(()=>{if(!r)return 0;let e=r.roadmap,s=e.phases.reduce((e,t)=>e+t.topics.length,0),a=(0,x.Im)(t),i=Object.keys(a).filter(t=>a[t]&&e.phases.some(e=>e.topics.some(e=>e.name===t))).length;return s>0?Math.round(i/s*100):0},[r,t]),C=(0,a.useMemo)(()=>r?r.roadmap.phases.reduce((e,t)=>e+t.topics.length,0):0,[r]),S=(0,a.useMemo)(()=>{if(!r)return 0;let e=(0,x.Im)(t);return Object.keys(e).filter(t=>e[t]&&r.roadmap.phases.some(e=>e.topics.some(e=>e.name===t))).length},[r,t]),P=()=>{j.trim()&&((0,x.b4)(j.trim()),y(j.trim()),w(!1))};if(h)return(0,s.jsx)(u.v,{});if(!r)return(0,s.jsxs)("div",{className:"py-24 text-center",children:[(0,s.jsx)("h2",{className:"text-2xl font-bold text-text-primary mb-2",children:"Technology Not Found"}),(0,s.jsxs)("p",{className:"text-text-secondary mb-6",children:["We couldn't find a learning path for \"",e,'".']}),(0,s.jsx)(n.default,{href:"/dashboard",className:"text-accent-purple font-semibold hover:underline",children:"Go to Dashboard"})]});let A=r.roadmap.overview.title,z=100===k,D=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});return(0,s.jsxs)("div",{className:"max-w-4xl mx-auto space-y-6 py-6 select-text",children:[(0,s.jsx)(m.SEOHead,{title:`Syllabus Certificate for ${A} — StackForge`,description:`Claim or view your study certificate of completion for the ${A} learning track.`}),(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsx)(n.default,{href:`/roadmap/${t}`,className:"p-2 bg-background-card/50 border border-border/20 rounded-xl hover:bg-background-card/80 transition-colors text-text-secondary hover:text-text-primary",children:(0,s.jsx)(l.Z,{className:"w-4 h-4"})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"text-[10px] font-bold text-accent-purple uppercase tracking-wider",children:"Credentials Portal"}),(0,s.jsxs)("h1",{className:"text-xl font-bold text-text-primary",children:[A," Certificate"]})]})]}),!z&&(0,s.jsxs)("div",{className:"glass p-8 rounded-3xl border border-border/20 space-y-6 text-center max-w-xl mx-auto mt-6",children:[(0,s.jsx)("div",{className:"w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/5",children:(0,s.jsx)(o.Z,{className:"w-8 h-8"})}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)("h3",{className:"text-lg font-bold text-text-primary",children:"Certificate Locked"}),(0,s.jsxs)("p",{className:"text-sm text-text-secondary leading-relaxed",children:["To unlock the digital study certification for ",(0,s.jsx)("span",{className:"font-semibold text-text-primary",children:A}),", you must complete 100% of the learning syllabus."]})]}),(0,s.jsxs)("div",{className:"bg-background/40 border border-border/10 p-5 rounded-2xl space-y-3 max-w-sm mx-auto",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center text-xs font-bold",children:[(0,s.jsx)("span",{className:"text-text-secondary",children:"Current Progress"}),(0,s.jsxs)("span",{className:"text-accent-purple",children:[k,"%"]})]}),(0,s.jsx)("div",{className:"w-full h-2.5 bg-border/20 rounded-full overflow-hidden",children:(0,s.jsx)("div",{className:"h-full bg-gradient-to-r from-accent-purple to-accent-cyan",style:{width:`${k}%`}})}),(0,s.jsxs)("div",{className:"text-[10px] text-text-secondary flex justify-between",children:[(0,s.jsxs)("span",{children:[S," topics completed"]}),(0,s.jsxs)("span",{children:[C-S," topics remaining"]})]})]}),(0,s.jsx)("div",{className:"pt-2",children:(0,s.jsx)(n.default,{href:`/roadmap/${t}`,className:"inline-flex px-6 py-3 bg-accent-purple hover:bg-accent-purple/95 text-white text-sm font-bold rounded-2xl shadow-lg shadow-accent-purple/15 transition-all",children:"Continue Study Roadmap"})})]}),z&&(0,s.jsx)("div",{className:"space-y-8 animate-fadeIn",children:g?(0,s.jsxs)("div",{className:"space-y-6",children:[(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-4 p-5 glass rounded-2xl",children:[v?(0,s.jsxs)("div",{className:"flex items-center gap-2 w-full sm:w-auto",children:[(0,s.jsx)("input",{type:"text",value:j,onChange:e=>N(e.target.value),placeholder:"Enter full name",className:"px-3 py-1.5 bg-background border border-border/40 rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:border-accent-purple"}),(0,s.jsx)("button",{onClick:P,className:"p-2 bg-accent-purple text-white rounded-xl hover:bg-accent-purple/90 transition-colors",children:(0,s.jsx)(d.Z,{className:"w-3.5 h-3.5"})})]}):(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"text-xs text-text-secondary",children:"Certificate for:"}),(0,s.jsx)("strong",{className:"text-sm text-text-primary",children:g}),(0,s.jsx)("button",{onClick:()=>{N(g),w(!0)},className:"text-xs text-accent-purple hover:underline flex items-center gap-1 font-semibold",children:"Change Name"})]}),(0,s.jsx)("div",{className:"flex gap-3 w-full sm:w-auto",children:(0,s.jsxs)("button",{onClick:()=>{z&&g&&function(e,t,r){let s=window.open("","_blank");if(!s){alert("Please allow popups to download or print your certificate.");return}let a=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),i=Math.abs(e.split("").reduce((e,t)=>(e<<5)-e+t.charCodeAt(0),0)+r.split("").reduce((e,t)=>(e<<5)-e+t.charCodeAt(0),0)).toString(16).toUpperCase().slice(0,10),n=`SF-${r.toUpperCase().slice(0,3)}-${i}`,l=`
    <!DOCTYPE html>
    <html>
      <head>
        <title>StackForge Certificate - ${e}</title>
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
            <div className="recipient-name">${e}</div>
          </div>

          <!-- Description -->
          <div className="details-section">
            <p className="details-text">
              for successfully completing the rigorous online learning program and demonstrating comprehensive core syllabus mastery in <span className="tech-name">${t}</span>. Having completed all curriculum sections, milestone projects, and code verification checkpoints.
            </p>
          </div>

          <!-- Footer Signs & Seal -->
          <div className="footer-section">
            <div className="signature-box">
              <div className="signature-line" style="font-size: 14px;">${a}</div>
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
            VERIFICATION ID: ${n} &nbsp;|&nbsp; STATUS: LOCAL_VERIFIED
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
  `;s.document.open(),s.document.write(l),s.document.close()}(g,A,t)},className:"flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-accent-purple hover:bg-accent-purple/95 text-white text-xs font-bold rounded-xl shadow-md transition-all",children:[(0,s.jsx)(p.Z,{className:"w-4 h-4"})," Download / Print PDF"]})})]}),(0,s.jsxs)("div",{className:"p-4 sm:p-8 bg-white border-8 border-double border-[#c5a880] rounded-2xl relative shadow-xl text-center text-[#1e1b4b] overflow-hidden select-none aspect-[1.414/1] max-w-3xl mx-auto flex flex-col justify-between py-10 sm:py-16",children:[(0,s.jsx)("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/[0.02] border-4 border-dashed border-amber-500/[0.03] rounded-full pointer-events-none"}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)("div",{className:"text-[11px] font-black uppercase tracking-[3px] text-[#1e1b4b]",children:"StackForge Academy"}),(0,s.jsx)("h2",{className:"font-serif text-2xl sm:text-4xl text-[#9d7c4d] tracking-[2px] uppercase",children:"Certificate of Completion"}),(0,s.jsx)("div",{className:"text-[9px] font-semibold text-slate-400 uppercase tracking-[2px]",children:"Syllabus Mastery Achievement"})]}),(0,s.jsxs)("div",{className:"space-y-2 py-4",children:[(0,s.jsx)("div",{className:"font-serif italic text-sm text-slate-500",children:"This credential is proudly presented to"}),(0,s.jsx)("div",{className:"font-serif text-2xl sm:text-4xl font-bold border-b border-slate-200 pb-2 inline-block px-10 max-w-full truncate",children:g})]}),(0,s.jsxs)("p",{className:"text-xs text-slate-500 max-w-lg mx-auto leading-relaxed px-4",children:["for successfully completing the rigorous online learning program and demonstrating comprehensive core syllabus mastery in ",(0,s.jsx)("span",{className:"font-bold text-[#1e1b4b]",children:A}),". Having completed all curriculum sections, milestone projects, and code verification checkpoints."]}),(0,s.jsxs)("div",{className:"flex items-end justify-between px-6 sm:px-12 pt-6",children:[(0,s.jsxs)("div",{className:"w-[120px] text-center",children:[(0,s.jsx)("div",{className:"border-b border-slate-300 pb-1 text-slate-800 text-[10px] font-bold",children:D}),(0,s.jsx)("div",{className:"text-[8px] text-slate-400 uppercase tracking-wider mt-1",children:"Date of Issuance"})]}),(0,s.jsxs)("div",{className:"w-14 h-14 rounded-full bg-gradient-to-br from-[#e6c594] to-[#b89150] shadow-md flex items-center justify-center text-white text-[8px] font-black tracking-wider leading-tight",children:["STACK",(0,s.jsx)("br",{}),"FORGE"]}),(0,s.jsxs)("div",{className:"w-[120px] text-center",children:[(0,s.jsx)("div",{className:"border-b border-slate-300 pb-1 text-slate-800 text-[10px] font-serif italic",children:"StackForge Engine"}),(0,s.jsx)("div",{className:"text-[8px] text-slate-400 uppercase tracking-wider mt-1",children:"Authorized Verifier"})]})]})]})]}):(0,s.jsxs)("div",{className:"glass p-6 rounded-3xl border border-accent-purple/20 space-y-4 max-w-md mx-auto text-center",children:[(0,s.jsx)("div",{className:"w-12 h-12 bg-accent-purple/10 text-accent-purple rounded-xl flex items-center justify-center mx-auto",children:(0,s.jsx)(c.Z,{className:"w-6 h-6"})}),(0,s.jsxs)("div",{className:"space-y-1",children:[(0,s.jsx)("h3",{className:"font-bold text-text-primary text-base",children:"Enter Name on Certificate"}),(0,s.jsx)("p",{className:"text-xs text-text-secondary",children:"Please enter your legal name as it should appear on your study certificate of completion."})]}),(0,s.jsxs)("div",{className:"flex gap-2",children:[(0,s.jsx)("input",{type:"text",placeholder:"e.g. Anupam Baral",value:j,onChange:e=>N(e.target.value),className:"flex-1 px-3 py-2 bg-background border border-border/30 rounded-xl text-xs focus:outline-none focus:border-accent-purple text-text-primary"}),(0,s.jsx)("button",{onClick:P,className:"px-4 py-2 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-xl text-xs font-bold transition-all",children:"Create"})]})]})})]})}},95037:(e,t,r)=>{"use strict";r.d(t,{v:()=>n});var s=r(68819),a=r(30058),i=r(49163);function n(){return(0,s.jsx)("div",{className:"min-h-[70vh] w-full flex flex-col items-center justify-center bg-transparent",children:(0,s.jsxs)("div",{className:"relative flex flex-col items-center",children:[(0,s.jsx)("div",{className:"absolute w-24 h-24 rounded-full bg-accent-purple/10 dark:bg-accent-purple/20 blur-xl animate-pulse"}),(0,s.jsx)(a.E.div,{animate:{rotate:360},transition:{repeat:1/0,duration:1.5,ease:"linear"},className:"w-16 h-16 rounded-full border-4 border-t-accent-purple border-r-accent-cyan border-b-transparent border-l-transparent"}),(0,s.jsx)("div",{className:"absolute top-3.5 w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-purple/20",children:(0,s.jsx)(i.Z,{className:"w-5 h-5 text-white animate-pulse"})}),(0,s.jsx)(a.E.div,{initial:{opacity:.6},animate:{opacity:[.4,1,.4]},transition:{duration:2,repeat:1/0,ease:"easeInOut"},className:"mt-6 text-sm font-semibold tracking-wide text-text-secondary dark:text-text-primary uppercase",children:"Loading StackForge..."})]})})}},86333:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(68784).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},32933:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(68784).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},9015:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(68784).Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},3869:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(68784).Z)("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]])},79635:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(68784).Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},35047:(e,t,r)=>{"use strict";var s=r(77389);r.o(s,"useParams")&&r.d(t,{useParams:function(){return s.useParams}}),r.o(s,"useRouter")&&r.d(t,{useRouter:function(){return s.useRouter}}),r.o(s,"useSearchParams")&&r.d(t,{useSearchParams:function(){return s.useSearchParams}})},75452:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{default:()=>e});var a=r(71851);let e=(await (0,a.createProxy)(String.raw`C:\Users\Anupam Baral\Desktop\clone\app\certificates\[id]\page.tsx`)).default;s()}catch(e){s(e)}},1)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[2424,4603,6762,7936],()=>r(37495));module.exports=s})();