(()=>{var e={};e.id=2383,e.ids=[2383],e.modules={20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},55315:e=>{"use strict";e.exports=require("path")},46884:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>l.a,__next_app__:()=>p,pages:()=>d,routeModule:()=>u,tree:()=>c});var a=r(3003),s=r(14293),n=r(66550),l=r.n(n),o=r(86979),i={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(i[e]=()=>o[e]);r.d(t,i);let c=["",{children:["playground",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,47633)),"C:\\Users\\Anupam Baral\\Desktop\\clone\\app\\playground\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,66877)),"C:\\Users\\Anupam Baral\\Desktop\\clone\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,52075,23)),"next/dist/client/components/not-found-error"]}],d=["C:\\Users\\Anupam Baral\\Desktop\\clone\\app\\playground\\page.tsx"],p={require:r,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/playground/page",pathname:"/playground",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},32403:(e,t,r)=>{Promise.resolve().then(r.bind(r,99273))},99273:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>$});var a=r(68819),s=r(17266),n=r(44550),l=r(54689),o=r(31215),i=r(76993),c=r(94893),d=r(6343),p=r(43145),u=r(941);let x={javascript:`// StackForge Playground — JavaScript
function greet(name) {
  return \`Hello, \${name}! Welcome to StackForge.\`;
}

// Try it out:
console.log(greet('Developer'));

// Fibonacci example
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

for (let i = 0; i <= 10; i++) {
  console.log(\`fib(\${i}) = \${fib(i)}\`);
}`,typescript:`// StackForge Playground — TypeScript (transpiled to JS)
interface User {
  name: string;
  level: number;
  xp: number;
}

function levelUp(user: User): User {
  const newXP = user.xp + 100;
  const newLevel = Math.floor(newXP / 500) + 1;
  return { ...user, xp: newXP, level: newLevel };
}

const dev: User = { name: 'Developer', level: 1, xp: 0 };
const leveled = levelUp(dev);
console.log(\`\${leveled.name} is now Level \${leveled.level} with \${leveled.xp} XP!\`);`,html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playground Preview</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; margin: 0;
      background: linear-gradient(135deg, #1e1b4b, #0f172a);
      color: white;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; padding: 2rem;
      text-align: center; backdrop-filter: blur(10px);
    }
    h1 { background: linear-gradient(135deg, #a78bfa, #22d3ee);
         -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    button {
      background: #7c3aed; color: white; border: none;
      padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;
      font-size: 1rem; margin-top: 1rem; transition: 0.2s;
    }
    button:hover { background: #6d28d9; transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="card">
    <h1>StackForge Playground</h1>
    <p>Edit this HTML/CSS/JS and see live results!</p>
    <button onclick="this.textContent='🎉 Clicked!'">Click Me</button>
  </div>
</body>
</html>`,css:`/* StackForge Playground — CSS Demo */
/* Pair with the HTML panel */

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  padding: 2rem;
  border-radius: 1rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
}`,python:`# StackForge Playground — Python
# Note: Python runs locally — copy this code to run it

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

data = [64, 34, 25, 12, 22, 11, 90]
print("Original:", data)
sorted_data = bubble_sort(data.copy())
print("Sorted:", sorted_data)

# Generator example
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print("Fibonacci:", list(fibonacci(10)))`,go:`// StackForge Playground — Go
// Note: Go runs locally — copy this code to run it
package main

import "fmt"

func factorial(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n-1)
}

func main() {
    for i := 0; i <= 10; i++ {
        fmt.Printf("%d! = %d\\n", i, factorial(i))
    }
}`,rust:`// StackForge Playground — Rust  
// Note: Rust runs locally — copy this code to run it
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    let sum: i32 = numbers.iter().sum();
    let even: Vec<&i32> = numbers.iter().filter(|&&x| x % 2 == 0).collect();
    let doubled: Vec<i32> = numbers.iter().map(|&x| x * 2).collect();
    
    println!("Numbers: {:?}", numbers);
    println!("Sum: {}", sum);
    println!("Even: {:?}", even);
    println!("Doubled: {:?}", doubled);
}`},h="stackforge-snippets";function m(){try{let e=localStorage.getItem(h);return e?JSON.parse(e):[]}catch{return[]}}function b(e,t,r,a=!1){let s={id:Math.random().toString(36).slice(2,10),title:e,language:t,code:r,is_public:a,share_token:Math.random().toString(36).slice(2,12)+Date.now().toString(36),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},n=m();return localStorage.setItem(h,JSON.stringify([s,...n].slice(0,50))),s}function g({code:e,onChange:t}){let r=(0,s.useRef)(null),n=(0,s.useRef)(null),l=e.split("\n"),o=(0,s.useCallback)(()=>{r.current&&n.current&&(n.current.scrollTop=r.current.scrollTop)},[]),i=(0,s.useCallback)(a=>{let s=a.currentTarget;if("Tab"===a.key){a.preventDefault();let n=s.selectionStart,l=s.selectionEnd;t(e.substring(0,n)+"  "+e.substring(l)),requestAnimationFrame(()=>{r.current&&(r.current.selectionStart=n+2,r.current.selectionEnd=n+2)})}let n={"{":"}","(":")","[":"]",'"':'"',"'":"'"};if(n[a.key]&&!a.ctrlKey&&!a.metaKey){let l=s.selectionStart,o=s.selectionEnd;l===o&&(a.preventDefault(),t(e.substring(0,l)+a.key+n[a.key]+e.substring(o)),requestAnimationFrame(()=>{r.current&&(r.current.selectionStart=l+1,r.current.selectionEnd=l+1)}))}},[e,t]);return(0,a.jsxs)("div",{className:"relative flex h-full overflow-hidden bg-[#0d1117] select-none",children:[(0,a.jsxs)("div",{ref:n,className:"flex-none w-12 overflow-hidden pointer-events-none py-4 pr-3 text-right text-xs leading-6 text-[#6e7681] bg-[#0d1117] border-r border-white/[0.06]","aria-hidden":"true",children:[l.map((e,t)=>(0,a.jsx)("div",{className:"h-6",children:t+1},t)),(0,a.jsx)("div",{className:"h-16"})]}),(0,a.jsx)("textarea",{ref:r,value:e,onChange:e=>t(e.target.value),onKeyDown:i,onScroll:o,className:"flex-1 resize-none bg-transparent text-[#e6edf3] outline-none py-4 px-4 text-sm leading-6 caret-[#a78bfa] select-text",style:{fontFamily:"'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace"},spellCheck:!1,autoCorrect:"off",autoCapitalize:"off",autoComplete:"off","aria-label":"Code editor",placeholder:"Write your code here..."})]})}var f=r(32130),y=r(30361),w=r(69669),v=r(48998),j=r(98091);let k={log:"text-[#e6edf3]",warn:"text-[#f0c040]",error:"text-[#ff7b72]",info:"text-[#79c0ff]"},N={log:"  ",warn:"⚠ ",error:"✖ ",info:"ℹ "};function S({result:e,isRunning:t,onClear:r}){return(0,a.jsxs)("div",{className:"flex flex-col h-full bg-[#0d1117] border-t border-white/[0.06]",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#161b22]",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(f.Z,{className:"w-3.5 h-3.5 text-[#6e7681]"}),(0,a.jsx)("span",{className:"text-xs font-bold text-[#6e7681] uppercase tracking-wider",children:"Console Output"}),e&&!t&&(0,a.jsxs)("div",{className:"flex items-center gap-1.5 ml-3",children:[e.success?(0,a.jsx)(y.Z,{className:"w-3 h-3 text-emerald-400"}):(0,a.jsx)(w.Z,{className:"w-3 h-3 text-red-400"}),(0,a.jsx)("span",{className:`text-[10px] font-bold ${e.success?"text-emerald-400":"text-red-400"}`,children:e.success?"Completed":"Error"}),(0,a.jsx)(v.Z,{className:"w-3 h-3 text-[#6e7681] ml-1"}),(0,a.jsxs)("span",{className:"text-[10px] text-[#6e7681]",children:[e.duration,"ms"]})]})]}),e&&(0,a.jsx)("button",{onClick:r,className:"p-1 text-[#6e7681] hover:text-white transition-colors rounded",title:"Clear output",children:(0,a.jsx)(j.Z,{className:"w-3.5 h-3.5"})})]}),(0,a.jsx)("div",{className:"flex-1 overflow-y-auto p-4 font-mono text-sm leading-6",children:t?(0,a.jsxs)("div",{className:"flex items-center gap-2 text-accent-cyan",children:[(0,a.jsx)("span",{className:"inline-flex gap-1",children:[0,1,2].map(e=>(0,a.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce",style:{animationDelay:`${.15*e}s`}},e))}),(0,a.jsx)("span",{className:"text-xs text-[#6e7681]",children:"Executing..."})]}):e?0===e.entries.length?(0,a.jsx)("p",{className:"text-[#6e7681] text-xs italic",children:"No output produced."}):(0,a.jsx)("div",{className:"space-y-0.5",children:e.entries.map((e,t)=>(0,a.jsxs)("div",{className:`flex gap-2 text-xs ${k[e.type]}`,children:[(0,a.jsx)("span",{className:"text-[#6e7681] select-none flex-none",children:N[e.type]}),(0,a.jsx)("pre",{className:"whitespace-pre-wrap break-all",children:e.message})]},t))}):(0,a.jsxs)("p",{className:"text-[#6e7681] text-xs italic",children:["Press ",(0,a.jsx)("kbd",{className:"px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono",children:"▶ Run"})," to execute your code."]})})]})}let C=Object.entries({javascript:{label:"JavaScript",color:"#f7df1e",icon:"JS",runnable:!0},typescript:{label:"TypeScript",color:"#3178c6",icon:"TS",runnable:!0},html:{label:"HTML/CSS/JS",color:"#e34f26",icon:"HTML",runnable:!0},css:{label:"CSS",color:"#264de4",icon:"CSS",runnable:!1},python:{label:"Python",color:"#3776ab",icon:"PY",runnable:!1},go:{label:"Go",color:"#00add8",icon:"GO",runnable:!1},rust:{label:"Rust",color:"#ce412b",icon:"RS",runnable:!1}});function Z({value:e,onChange:t}){return(0,a.jsx)("div",{className:"flex items-center gap-1.5 flex-wrap",children:C.map(([r,s])=>{let n=r===e;return(0,a.jsxs)("button",{onClick:()=>t(r),className:["flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",n?"text-white shadow-lg scale-105":"text-[#6e7681] hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"].join(" "),style:n?{backgroundColor:s.color+"22",border:`1px solid ${s.color}55`,color:s.color}:{},title:s.label,children:[(0,a.jsx)("span",{className:"w-5 h-5 rounded flex items-center justify-center text-[9px] font-black",style:{backgroundColor:s.color+"33",color:s.color},children:s.icon}),s.label,!s.runnable&&(0,a.jsx)("span",{className:"text-[9px] opacity-60 ml-0.5",children:"(local)"})]},r)})})}var P=r(94019),M=r(54014),_=r(32933),T=r(43810);function D({code:e,language:t,title:r,onClose:n}){let[l,o]=(0,s.useState)(r),[c,d]=(0,s.useState)(null),[p,u]=(0,s.useState)(!1),[x,h]=(0,s.useState)(!1),m=async()=>{var r;h(!0),d((r=b(l||"Untitled",t,e,!0).share_token,`${window.location.origin}/playground/s/${r}`)),h(!1)},g=async()=>{c&&(await navigator.clipboard.writeText(c),u(!0),setTimeout(()=>u(!1),2e3))};return(0,a.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",children:(0,a.jsxs)("div",{className:"w-full max-w-md bg-[#161b22] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between px-6 py-4 border-b border-white/[0.08]",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(i.Z,{className:"w-4 h-4 text-accent-purple"}),(0,a.jsx)("h2",{className:"text-sm font-bold text-white",children:"Share Snippet"})]}),(0,a.jsx)("button",{onClick:n,className:"p-1 text-[#6e7681] hover:text-white rounded transition-colors",children:(0,a.jsx)(P.Z,{className:"w-4 h-4"})})]}),(0,a.jsx)("div",{className:"p-6 space-y-4",children:c?(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsx)("p",{className:"text-xs text-emerald-400 font-medium",children:"✓ Snippet saved! Share this link:"}),(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsx)("input",{type:"text",value:c,readOnly:!0,className:"flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-xl text-xs text-[#e6edf3] font-mono outline-none"}),(0,a.jsxs)("button",{onClick:g,className:"px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] rounded-xl text-sm transition-all flex items-center gap-1.5 text-white",children:[p?(0,a.jsx)(_.Z,{className:"w-4 h-4 text-emerald-400"}):(0,a.jsx)(T.Z,{className:"w-4 h-4"}),p?"Copied!":"Copy"]})]})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"text-xs text-[#6e7681] font-medium block mb-1.5",children:"Snippet Title"}),(0,a.jsx)("input",{type:"text",value:l,onChange:e=>o(e.target.value),className:"w-full px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-xl text-sm text-white outline-none focus:border-accent-purple/50 transition-colors",placeholder:"e.g. Fibonacci Algorithm"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl",children:[(0,a.jsx)(M.Z,{className:"w-4 h-4 text-accent-cyan flex-none"}),(0,a.jsx)("p",{className:"text-xs text-[#6e7681]",children:"This snippet will be saved locally and shareable via a unique URL."})]}),(0,a.jsx)("button",{onClick:m,disabled:x,className:"w-full py-3 bg-accent-purple hover:bg-accent-purple/90 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all",children:x?"Generating Link...":"Generate Share Link"})]})})]})})}var E=r(38266),L=r(88129),R=r(30058);function $(){let{language:e,setLanguage:t,code:r,setCode:h,result:f,isRunning:y,title:w,setTitle:v,runCode:j,clearOutput:k,iframeRef:N}=function(e="javascript"){let[t,r]=(0,s.useState)(e),[a,n]=(0,s.useState)(x[e]),[l,o]=(0,s.useState)(null),[i,c]=(0,s.useState)(!1),[d,p]=(0,s.useState)([]),[u,h]=(0,s.useState)("Untitled Snippet"),m=(0,s.useRef)(null),b=(0,s.useRef)(null),g=(0,s.useCallback)(async()=>{c(!0),o(null);let e=performance.now();if("html"===t){let t=performance.now()-e;o({success:!0,entries:[{type:"log",message:"\uD83C\uDF10 HTML preview rendered below.",timestamp:Date.now()}],duration:t}),c(!1);return}if(!["javascript","typescript"].includes(t)){let r=performance.now()-e;o({success:!1,entries:[{type:"warn",message:`⚠️ ${t.charAt(0).toUpperCase()+t.slice(1)} cannot run in-browser. Copy the code and run it in your local environment.`,timestamp:Date.now()}],duration:r}),c(!1);return}let r=[],s=!1;await new Promise(e=>{let n=setTimeout(()=>{s||(r.push({type:"error",message:"⏱ Execution timed out after 5 seconds.",timestamp:Date.now()}),s=!0,e())},5e3),l=t=>{t.data?.source==="stackforge-playground"&&("done"===t.data.type?(s=!0,clearTimeout(n),window.removeEventListener("message",l),e()):t.data.type&&void 0!==t.data.message&&r.push({type:t.data.type,message:t.data.message,timestamp:Date.now()}))};window.addEventListener("message",l),b.current=()=>{clearTimeout(n),window.removeEventListener("message",l)};let o="typescript"===t?a.replace(/:\s*(string|number|boolean|void|any|unknown|never|undefined|null|object)\b/g,"").replace(/interface\s+\w+\s*\{[^}]*\}/g,"").replace(/<[A-Za-z]+>/g,"").replace(/\bas\s+\w+/g,""):a,i=`<!DOCTYPE html><html><head></head><body><script>
(function() {
  const _send = (type, ...args) => {
    const message = args.map(a => {
      try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
      catch { return String(a); }
    }).join(' ');
    window.parent.postMessage({ source: 'stackforge-playground', type, message }, '*');
  };
  window.console = {
    log: (...a) => _send('log', ...a),
    warn: (...a) => _send('warn', ...a),
    error: (...a) => _send('error', ...a),
    info: (...a) => _send('info', ...a),
  };
  window.onerror = (msg, src, line, col) => {
    _send('error', \`Line \${line}:\${col} — \${msg}\`);
    window.parent.postMessage({ source: 'stackforge-playground', type: 'done' }, '*');
    return true;
  };
  try {
    ${o}
  } catch (e) {
    _send('error', e.message);
  } finally {
    window.parent.postMessage({ source: 'stackforge-playground', type: 'done' }, '*');
  }
})();
</script></body></html>`;m.current&&(m.current.srcdoc=i)});let n=performance.now()-e;o({success:!r.some(e=>"error"===e.type),entries:r,duration:Math.round(n)}),c(!1)},[a,t]);return{language:t,setLanguage:r,code:a,setCode:n,result:l,isRunning:i,testCases:d,addTestCase:(0,s.useCallback)(e=>{p(t=>[...t,{...e,id:Math.random().toString(36).slice(2)}])},[]),removeTestCase:(0,s.useCallback)(e=>{p(t=>t.filter(t=>t.id!==e))},[]),title:u,setTitle:h,runCode:g,clearOutput:(0,s.useCallback)(()=>o(null),[]),iframeRef:m}}("javascript"),[C,P]=(0,s.useState)(!1),[M,_]=(0,s.useState)(!1),[T,$]=(0,s.useState)(!1),[q,F]=(0,s.useState)("output"),O=m(),U="html"===e;return(0,a.jsxs)("div",{className:"flex flex-col h-screen bg-[#0d1117] overflow-hidden",children:[(0,a.jsx)(E.SEOHead,{title:"Code Playground — StackForge Academy",description:"Write, run, and share code snippets in JavaScript, TypeScript, HTML, Python, Go, and Rust."}),(0,a.jsx)("iframe",{ref:N,title:"Code execution sandbox",className:"hidden",sandbox:"allow-scripts"}),(0,a.jsxs)("div",{className:"flex items-center gap-3 px-4 py-3 bg-[#161b22] border-b border-white/[0.08] flex-none flex-wrap",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mr-2",children:[(0,a.jsx)("div",{className:"w-7 h-7 rounded-lg bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center",children:(0,a.jsx)(n.Z,{className:"w-4 h-4 text-accent-purple"})}),(0,a.jsx)("span",{className:"text-xs font-black text-white hidden sm:block",children:"Playground"})]}),(0,a.jsx)("input",{type:"text",value:w,onChange:e=>v(e.target.value),className:"flex-none w-40 px-2.5 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-white outline-none focus:border-accent-purple/40 transition-colors",placeholder:"Untitled Snippet"}),(0,a.jsx)("div",{className:"flex-1 min-w-0",children:(0,a.jsx)(Z,{value:e,onChange:e=>{t(e),k()}})}),(0,a.jsxs)("div",{className:"flex items-center gap-2 flex-none",children:[(0,a.jsx)("button",{onClick:()=>{h(x[e]),k()},className:"p-2 text-[#6e7681] hover:text-white rounded-lg hover:bg-white/[0.06] transition-all",title:"Reset to template",children:(0,a.jsx)(l.Z,{className:"w-4 h-4"})}),(0,a.jsxs)("button",{onClick:()=>{b(w,e,r,!1),_(!0),setTimeout(()=>_(!1),2e3)},className:"flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all",style:M?{borderColor:"#22c55e",color:"#22c55e",background:"#22c55e11"}:{borderColor:"rgba(255,255,255,0.12)",color:"#8b949e",background:"rgba(255,255,255,0.04)"},children:[(0,a.jsx)(o.Z,{className:"w-3.5 h-3.5"}),M?"Saved!":"Save"]}),(0,a.jsxs)("button",{onClick:()=>P(!0),className:"flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#8b949e] bg-white/[0.04] border border-white/[0.08] rounded-lg hover:border-accent-cyan/30 hover:text-accent-cyan transition-all",children:[(0,a.jsx)(i.Z,{className:"w-3.5 h-3.5"}),"Share"]}),(0,a.jsxs)("button",{onClick:j,disabled:y,className:"flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-accent-purple hover:bg-accent-purple/90 disabled:opacity-50 rounded-lg shadow-lg shadow-accent-purple/20 transition-all",children:[(0,a.jsx)(c.Z,{className:"w-3.5 h-3.5"}),y?"Running...":"Run"]})]})]}),(0,a.jsxs)("div",{className:"flex flex-1 min-h-0 overflow-hidden",children:[(0,a.jsx)(L.M,{children:T&&(0,a.jsxs)(R.E.div,{initial:{width:0,opacity:0},animate:{width:220,opacity:1},exit:{width:0,opacity:0},className:"border-r border-white/[0.06] bg-[#0d1117] overflow-y-auto flex-none",children:[(0,a.jsx)("div",{className:"p-3 border-b border-white/[0.06]",children:(0,a.jsx)("p",{className:"text-xs font-bold text-[#6e7681] uppercase tracking-wider",children:"Saved Snippets"})}),0===O.length?(0,a.jsx)("p",{className:"p-4 text-xs text-[#6e7681] italic",children:"No saved snippets yet."}):(0,a.jsx)("div",{className:"p-2 space-y-1",children:O.map(e=>(0,a.jsxs)("button",{onClick:()=>{h(e.code),t(e.language),v(e.title)},className:"w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/[0.06] transition-colors group",children:[(0,a.jsx)("p",{className:"text-xs font-semibold text-[#e6edf3] group-hover:text-white truncate",children:e.title}),(0,a.jsxs)("p",{className:"text-[10px] text-[#6e7681]",children:[e.language," \xb7 ",new Date(e.created_at).toLocaleDateString()]})]},e.id))})]})}),(0,a.jsx)("button",{onClick:()=>$(!T),className:"flex-none w-6 bg-[#161b22] border-r border-white/[0.06] hover:bg-white/[0.04] transition-colors flex items-center justify-center",title:T?"Hide snippets":"Show snippets",children:(0,a.jsx)(d.Z,{className:"w-3 h-3 text-[#6e7681] rotate-90"})}),(0,a.jsxs)("div",{className:"flex flex-col flex-1 min-w-0 min-h-0",children:[(0,a.jsx)("div",{className:"flex-1 min-h-0 overflow-hidden",children:(0,a.jsx)(g,{code:r,language:e,onChange:h})}),(0,a.jsx)("div",{className:"h-56 flex-none border-t border-white/[0.06] flex flex-col",children:U?(0,a.jsxs)("div",{className:"flex flex-col h-full",children:[(0,a.jsx)("div",{className:"flex border-b border-white/[0.06] bg-[#161b22]",children:["output","preview"].map(e=>(0,a.jsx)("button",{onClick:()=>F(e),className:`px-4 py-2 text-xs font-bold transition-colors capitalize ${q===e?"text-white border-b-2 border-accent-purple":"text-[#6e7681] hover:text-white"}`,children:"preview"===e?"\uD83C\uDF10 Preview":"⬛ Console"},e))}),"output"===q?(0,a.jsx)(S,{result:f,isRunning:y,onClear:k}):(0,a.jsx)("iframe",{srcDoc:r,title:"HTML Preview",className:"flex-1 w-full bg-white",sandbox:"allow-scripts"},r)]}):(0,a.jsx)(S,{result:f,isRunning:y,onClear:k})})]})]}),(0,a.jsxs)("button",{onClick:()=>$(!T),className:"fixed bottom-6 left-6 flex items-center gap-2 px-3 py-2 bg-[#161b22] border border-white/[0.1] rounded-xl text-xs text-[#8b949e] hover:text-white shadow-xl transition-all sm:hidden",children:[(0,a.jsx)(p.Z,{className:"w-3.5 h-3.5"}),"Snippets",(0,a.jsx)(u.Z,{className:`w-3.5 h-3.5 transition-transform ${T?"rotate-180":""}`})]}),C&&(0,a.jsx)(D,{code:r,language:e,title:w,onClose:()=>P(!1)})]})}},38266:(e,t,r)=>{"use strict";function a({title:e,description:t,image:r="/og-image.png",url:a,type:s="website"}){return null}r.d(t,{SEOHead:()=>a}),r(17266)},43145:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("Braces",[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",key:"ezmyqa"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",key:"e1hn23"}]])},32933:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},941:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]])},30361:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},69669:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]])},48998:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},44550:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]])},43810:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},54014:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]])},94893:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]])},54689:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]])},31215:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]])},32130:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]])},98091:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(68784).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},47633:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{default:()=>e});var s=r(71851);let e=(await (0,s.createProxy)(String.raw`C:\Users\Anupam Baral\Desktop\clone\app\playground\page.tsx`)).default;a()}catch(e){a(e)}},1)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[2424,4603,6762],()=>r(46884));module.exports=a})();