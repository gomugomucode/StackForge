(()=>{var e={};e.id=9151,e.ids=[9151],e.modules={20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},55315:e=>{"use strict";e.exports=require("path")},54157:(e,t,i)=>{"use strict";i.r(t),i.d(t,{GlobalError:()=>r.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>h,tree:()=>l});var s=i(3003),n=i(14293),a=i(66550),r=i.n(a),o=i(86979),d={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);i.d(t,d);let l=["",{children:["notes",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(i.bind(i,76519)),"C:\\Users\\Anupam Baral\\Desktop\\clone\\app\\notes\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(i.bind(i,66877)),"C:\\Users\\Anupam Baral\\Desktop\\clone\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(i.t.bind(i,52075,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\Anupam Baral\\Desktop\\clone\\app\\notes\\page.tsx"],p={require:i,loadChunk:()=>Promise.resolve()},h=new s.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/notes/page",pathname:"/notes",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},50407:(e,t,i)=>{Promise.resolve().then(i.bind(i,3679)),Promise.resolve().then(i.bind(i,82617)),Promise.resolve().then(i.bind(i,38266)),Promise.resolve().then(i.t.bind(i,79404,23))},3679:(e,t,i)=>{"use strict";i.d(t,{Button:()=>l});var s=i(68819),n=i(30058),a=i(90434);let r={primary:"bg-gradient-to-r from-accent-purple to-accent-violet text-white shadow-lg shadow-accent-purple/25 hover:shadow-accent-purple/40 disabled:opacity-50 disabled:pointer-events-none",secondary:"glass text-text-primary hover:border-black/10 dark:hover:border-white/12 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] disabled:opacity-50 disabled:pointer-events-none",ghost:"text-text-secondary hover:text-text-primary hover:bg-black/[0.03] dark:hover:bg-white/[0.04] disabled:opacity-50 disabled:pointer-events-none",outline:"border border-accent-purple/40 text-accent-purple hover:bg-accent-purple/10 hover:border-accent-purple/60 disabled:opacity-50 disabled:pointer-events-none"},o={sm:"px-4 py-2 text-sm",md:"px-6 py-2.5 text-sm",lg:"px-8 py-3 text-base"},d={whileHover:{scale:1.02,y:-1},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25}};function l({children:e,variant:t="primary",size:i="md",href:l,className:c="",onClick:p,type:h="button",ariaLabel:m,disabled:u}){let g=`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 ${r[t]} ${o[i]} ${c}`;return l?(0,s.jsx)(n.E.div,{...d,className:"inline-flex",children:(0,s.jsx)(a.default,{href:l,className:g,"aria-label":m,children:e})}):(0,s.jsx)(n.E.button,{type:h,className:g,onClick:p,"aria-label":m,disabled:u,...d,children:e})}},38266:(e,t,i)=>{"use strict";function s({title:e,description:t,image:i="/og-image.png",url:s,type:n="website"}){return null}i.d(t,{SEOHead:()=>s}),i(17266)},82617:(e,t,i)=>{"use strict";i.d(t,{Card:()=>o,SectionHeader:()=>r});var s=i(68819),n=i(30058),a=i(48087);function r({badge:e,title:t,highlight:i,description:r,align:o="center",className:d=""}){return(0,s.jsxs)(a.FadeIn,{className:`max-w-3xl mb-12 md:mb-16 ${"center"===o?"text-center mx-auto":"text-left"} ${d}`,children:[e&&(0,s.jsx)(n.E.span,{initial:{opacity:0,scale:.9},whileInView:{opacity:1,scale:1},viewport:{once:!0},className:"inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider glass text-accent-purple",children:e}),(0,s.jsxs)("h2",{className:"text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-text-primary mb-4 leading-tight",children:[t,i&&(0,s.jsxs)(s.Fragment,{children:[" ",(0,s.jsx)("span",{className:"gradient-text",children:i})]})]}),r&&(0,s.jsx)("p",{className:"text-text-secondary text-base md:text-lg leading-relaxed",children:r})]})}function o({children:e,className:t="",hover:i=!0,glow:n="none"}){return(0,s.jsx)("div",{className:`gradient-border rounded-2xl p-6 md:p-8 glass-card ${i?"card-hover hover:border-black/10 dark:hover:border-white/10":""} ${"purple"===n?"glow-purple":"cyan"===n?"glow-cyan":""} ${t}`,children:e})}},76519:(e,t,i)=>{"use strict";i.a(e,async(e,s)=>{try{i.r(t),i.d(t,{default:()=>g});var n=i(89351),a=i(45580),r=i(43357),o=i(23783),d=i(635),l=i(66884),c=i(71854),p=i(25326),h=i(49743),m=i(69277),u=e([l,c,p]);[l,c,p]=u.then?(await u)():u;let x=[{slug:"javascript",title:"JavaScript Study Notes",desc:"Variables scope, Array operations, functional loops, Event Loop, closures, and Promises."},{slug:"python",title:"Python Reference Notes",desc:"Python syntax lists, comprehensions, decorators, *args/**kwargs, virtual environments, and exceptions."},{slug:"react",title:"React Hooks & Virtual DOM",desc:"Virtual DOM render cycles, useState/useEffect hooks, useMemo/useCallback performance, and custom hook definitions."},{slug:"nodejs",title:"Node.js Backend Notes",desc:"Event Loop callbacks model, File System (fs), Buffers, Streams pipelines, and Express REST APIs."},{slug:"typescript",title:"TypeScript Typing Notes",desc:"Static checks, interface definitions, Generics, and TS configurations compiler options."},{slug:"git",title:"Git & Command Operations",desc:"Repository initialization, branches creation, merge conflicts resolving, and rebasing history."},{slug:"docker",title:"Docker Containers Blueprint",desc:"Writing Dockerfile instructions, volumes data mapping, container ports binding, and docker-compose."},{slug:"aws",title:"AWS Cloud Services Notes",desc:"VPC network boundaries, IAM permissions roles, EC2 virtual instances, Lambda serverless, and S3 buckets."}];function g(){let e=async e=>{let t=await (0,h.kp)(e);t&&(0,m.v)(e,t)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.R,{title:"Developer Study Guides & Core Concepts Notes",description:"Comprehensive programming study guides with illustrations, summaries, and code snippets."}),(0,n.jsx)("div",{className:"py-16 md:py-24",children:(0,n.jsxs)("div",{className:"container mx-auto px-4 sm:px-6 lg:px-8",children:[(0,n.jsx)(c.M,{badge:"Study Notes",title:"Syllabus Chapters",highlight:"& Core Guides",description:"Deepen your technical understanding. Read chapters, copy code templates, and review summaries."}),(0,n.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto",children:x.map(t=>(0,n.jsxs)(c.Z,{className:"flex flex-col justify-between h-full",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"w-11 h-11 rounded-xl bg-accent-purple/10 flex items-center justify-center mb-4",children:(0,n.jsx)(r.Z,{className:"w-5 h-5 text-accent-purple"})}),(0,n.jsx)("h3",{className:"text-xl font-bold text-text-primary mb-2",children:t.title}),(0,n.jsx)("p",{className:"text-text-secondary text-sm leading-relaxed mb-6",children:t.desc})]}),(0,n.jsxs)("div",{className:"flex items-center justify-between mt-auto",children:[(0,n.jsxs)(p.z,{onClick:()=>e(t.slug),variant:"ghost",size:"sm",className:"gap-1.5",children:[(0,n.jsx)(o.Z,{className:"w-3.5 h-3.5"})," PDF"]}),(0,n.jsxs)(a.default,{href:`/learn/${t.slug}?tab=notes`,className:"inline-flex items-center gap-1 text-sm font-semibold text-accent-purple hover:text-accent-violet transition-colors",children:["Read Guide ",(0,n.jsx)(d.Z,{className:"w-4 h-4"})]})]})]},t.slug))})]})})]})}s()}catch(e){s(e)}})},25326:(e,t,i)=>{"use strict";i.a(e,async(e,s)=>{try{i.d(t,{z:()=>e});var n=i(71851);let e=(await (0,n.createProxy)(String.raw`C:\Users\Anupam Baral\Desktop\clone\components\ui\Button.tsx`)).Button;s()}catch(e){s(e)}},1)},66884:(e,t,i)=>{"use strict";i.a(e,async(e,s)=>{try{i.d(t,{R:()=>e});var n=i(71851);let e=(await (0,n.createProxy)(String.raw`C:\Users\Anupam Baral\Desktop\clone\components\ui\SEOHead.tsx`)).SEOHead;s()}catch(e){s(e)}},1)},71854:(e,t,i)=>{"use strict";i.a(e,async(e,s)=>{try{i.d(t,{M:()=>a,Z:()=>r});var n=i(71851);let e=await (0,n.createProxy)(String.raw`C:\Users\Anupam Baral\Desktop\clone\components\ui\SectionHeader.tsx`),a=e.SectionHeader,r=e.Card;s()}catch(e){s(e)}},1)},69277:(e,t,i)=>{"use strict";function s(e,t){let i=window.open("","_blank");if(!i){alert("Please allow popups to download the PDF.");return}let s=e.charAt(0).toUpperCase()+e.slice(1),n=t.roadmap.overview,a=t.roadmap.phases,r=t.projects,o=t.cheatsheet,d=`
    <!DOCTYPE html>
    <html>
      <head>
        <title>StackForge - ${s} Roadmap</title>
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

        <h1>Complete ${s} Roadmap</h1>
        <div class="tech-badge">Interactive Syllabus & Study Guide</div>

        <div class="panel" style="margin-bottom: 24px;">
          <div class="panel-title">Overview</div>
          <p style="margin: 0; font-size: 14px; color: #334155;">${n.whatIsIt}</p>
        </div>

        <div class="grid">
          <div class="panel">
            <div class="panel-title">Why Learn It</div>
            <div class="panel-val" style="font-size: 13px; font-weight: normal; color: #334155;">${n.whyLearnIt}</div>
          </div>
          <div class="panel">
            <div class="panel-title">Career Opportunities</div>
            <div class="panel-val" style="font-size: 13px; font-weight: normal; color: #334155;">${n.careerOpportunities}</div>
          </div>
          <div class="panel">
            <div class="panel-title">Salary Benchmark</div>
            <div class="panel-val" style="color: #7c3aed;">${n.salaryInfo}</div>
          </div>
          <div class="panel">
            <div class="panel-title">Industry Demand</div>
            <div class="panel-val" style="color: #0891b2;">${n.industryDemand}</div>
          </div>
        </div>

        <div class="section-title">Learning Roadmap</div>
        ${a.map(e=>`
          <div class="phase-card">
            <div class="phase-header">
              <h3 class="phase-title">${e.title}</h3>
            </div>
            <div class="phase-desc">${e.description}</div>
            <div class="topic-grid">
              ${e.topics.map(e=>`
                <div class="topic-item">
                  <div class="topic-name">${e.name}</div>
                  ${e.description?`<div class="topic-desc">${e.description}</div>`:""}
                  ${e.resources&&e.resources.length>0?`
                    <div class="topic-resources">Resources: ${e.resources.join(", ")}</div>
                  `:""}
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}

        ${r&&r.length>0?`
          <div class="section-title">Recommended Hands-on Projects</div>
          ${r.map(e=>`
            <div class="project-card">
              <div class="project-title">${e.title} <span class="project-diff">(${e.difficulty})</span></div>
              <p style="margin: 4px 0 8px 0; font-size: 13px; color: #475569;">${e.description}</p>
              <div style="font-size: 12px; font-weight: 600; color: #334155;">Skills: ${e.skillsLearned.join(", ")}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Structure:</div>
              <div class="code-box">${e.sourceCodeStructure}</div>
            </div>
          `).join("")}
        `:""}

        ${o&&o.length>0?`
          <div class="section-title">Quick Reference Cheatsheet</div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
            <thead>
              <tr style="background-color: #f1f5f9; text-align: left;">
                <th style="padding: 10px; border: 1px solid #cbd5e1;">Command/Syntax</th>
                <th style="padding: 10px; border: 1px solid #cbd5e1;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${o.slice(0,8).map(e=>`
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;">${e.command}</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569;">${e.description}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        `:""}

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
  `;i.document.open(),i.document.write(d),i.document.close()}i.d(t,{v:()=>s})},49743:(e,t,i)=>{"use strict";i.d(t,{kp:()=>n});let s={javascript:async()=>{let[e,t,s,n,a,r]=await Promise.all([i.e(2947).then(i.bind(i,72947)).then(e=>e.javascriptRoadmap),i.e(5172).then(i.bind(i,75172)).then(e=>e.javascriptNotes),i.e(32).then(i.bind(i,60032)).then(e=>e.javascriptCheatsheet),i.e(4171).then(i.bind(i,64171)).then(e=>e.javascriptInterviews),i.e(1960).then(i.bind(i,41960)).then(e=>e.javascriptProjects),i.e(3298).then(i.bind(i,73298)).then(e=>e.javascriptResourceData)]);return{id:"javascript",roadmap:e,notes:t,cheatsheet:s,interviews:n,projects:a,resources:r}},python:async()=>{let[e,t,s,n,a,r]=await Promise.all([i.e(2561).then(i.bind(i,22561)).then(e=>e.pythonRoadmap),i.e(8622).then(i.bind(i,98622)).then(e=>e.pythonNotes),i.e(1735).then(i.bind(i,21735)).then(e=>e.pythonCheatsheet),i.e(7734).then(i.bind(i,17734)).then(e=>e.pythonInterviews),i.e(1203).then(i.bind(i,21203)).then(e=>e.pythonProjects),i.e(6034).then(i.bind(i,86034)).then(e=>e.pythonResourceData)]);return{id:"python",roadmap:e,notes:t,cheatsheet:s,interviews:n,projects:a,resources:r}},react:async()=>{let[e,t,s,n,a,r]=await Promise.all([i.e(9725).then(i.bind(i,59725)).then(e=>e.reactRoadmap),i.e(2445).then(i.bind(i,12445)).then(e=>e.reactNotes),i.e(2905).then(i.bind(i,32905)).then(e=>e.reactCheatsheet),i.e(2225).then(i.bind(i,32225)).then(e=>e.reactInterviews),i.e(8407).then(i.bind(i,18407)).then(e=>e.reactProjects),i.e(6103).then(i.bind(i,16103)).then(e=>e.reactResourceData)]);return{id:"react",roadmap:e,notes:t,cheatsheet:s,interviews:n,projects:a,resources:r}},nodejs:async()=>{let[e,t,s,n,a,r]=await Promise.all([i.e(1729).then(i.bind(i,91729)).then(e=>e.nodejsRoadmap),i.e(2194).then(i.bind(i,84820)).then(e=>e.nodejsNotes),i.e(6648).then(i.bind(i,26648)).then(e=>e.nodejsCheatsheet),i.e(6155).then(i.bind(i,56155)).then(e=>e.nodejsInterviews),i.e(4553).then(i.bind(i,84553)).then(e=>e.nodejsProjects),i.e(1947).then(i.bind(i,41947)).then(e=>e.nodejsResourceData)]);return{id:"nodejs",roadmap:e,notes:t,cheatsheet:s,interviews:n,projects:a,resources:r}},typescript:async()=>{let[e,t,s,n,a,r]=await Promise.all([i.e(5950).then(i.bind(i,45950)).then(e=>e.typescriptRoadmap),i.e(5638).then(i.bind(i,35638)).then(e=>e.typescriptNotes),i.e(4455).then(i.bind(i,74455)).then(e=>e.typescriptCheatsheet),i.e(6141).then(i.bind(i,86141)).then(e=>e.typescriptInterviews),i.e(5171).then(i.bind(i,5171)).then(e=>e.typescriptProjects),i.e(7077).then(i.bind(i,37077)).then(e=>e.typescriptResourceData)]);return{id:"typescript",roadmap:e,notes:t,cheatsheet:s,interviews:n,projects:a,resources:r}},git:async()=>{let[e,t,s,n,a,r]=await Promise.all([i.e(7513).then(i.bind(i,7513)).then(e=>e.gitRoadmap),i.e(7792).then(i.bind(i,57792)).then(e=>e.gitNotes),i.e(7679).then(i.bind(i,77679)).then(e=>e.gitCheatsheet),i.e(1329).then(i.bind(i,1329)).then(e=>e.gitInterviews),i.e(9920).then(i.bind(i,59920)).then(e=>e.gitProjects),i.e(9029).then(i.bind(i,69029)).then(e=>e.gitResourceData)]);return{id:"git",roadmap:e,notes:t,cheatsheet:s,interviews:n,projects:a,resources:r}},docker:async()=>{let[e,t,s,n,a,r]=await Promise.all([i.e(126).then(i.bind(i,60126)).then(e=>e.dockerRoadmap),i.e(4638).then(i.bind(i,34638)).then(e=>e.dockerNotes),i.e(5614).then(i.bind(i,15614)).then(e=>e.dockerCheatsheet),i.e(8573).then(i.bind(i,78573)).then(e=>e.dockerInterviews),i.e(1500).then(i.bind(i,31500)).then(e=>e.dockerProjects),i.e(4565).then(i.bind(i,24565)).then(e=>e.dockerResourceData)]);return{id:"docker",roadmap:e,notes:t,cheatsheet:s,interviews:n,projects:a,resources:r}},aws:async()=>{let[e,t,s,n,a,r]=await Promise.all([i.e(7420).then(i.bind(i,57420)).then(e=>e.awsRoadmap),i.e(1875).then(i.bind(i,91875)).then(e=>e.awsNotes),i.e(2329).then(i.bind(i,52329)).then(e=>e.awsCheatsheet),i.e(6565).then(i.bind(i,86565)).then(e=>e.awsInterviews),i.e(6965).then(i.bind(i,36965)).then(e=>e.awsProjects),i.e(6714).then(i.bind(i,86714)).then(e=>e.awsResourceData)]);return{id:"aws",roadmap:e,notes:t,cheatsheet:s,interviews:n,projects:a,resources:r}}};async function n(e){let t=s[e.toLowerCase()];if(t)return t()}},59643:(e,t,i)=>{"use strict";i.d(t,{Z:()=>d});var s=i(22052);let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),a=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim();var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let o=(0,s.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:n,className:o="",children:d,iconNode:l,...c},p)=>(0,s.createElement)("svg",{ref:p,...r,width:t,height:t,stroke:e,strokeWidth:n?24*Number(i)/Number(t):i,className:a("lucide",o),...c},[...l.map(([e,t])=>(0,s.createElement)(e,t)),...Array.isArray(d)?d:[d]])),d=(e,t)=>{let i=(0,s.forwardRef)(({className:i,...r},d)=>(0,s.createElement)(o,{ref:d,iconNode:t,className:a(`lucide-${n(e)}`,i),...r}));return i.displayName=`${e}`,i}},635:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});let s=(0,i(59643).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},43357:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});let s=(0,i(59643).Z)("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]])},23783:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});let s=(0,i(59643).Z)("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]])},45580:(e,t,i)=>{"use strict";i.d(t,{default:()=>n.a});var s=i(40266),n=i.n(s)},40266:(e,t,i)=>{"use strict";let{createProxy:s}=i(71851);e.exports=s("C:\\Users\\Anupam Baral\\Desktop\\clone\\node_modules\\next\\dist\\client\\link.js")}};var t=require("../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),s=t.X(0,[2424,4603,6762],()=>i(54157));module.exports=s})();