"use strict";exports.id=2194,exports.ids=[2194],exports.modules={84820:(e,t,o)=>{o.r(t),o.d(t,{nodejsNotes:()=>s});let s=[{id:"node-eventloop",title:"Chapter 1: The Event Loop & Non-Blocking IO",content:"Node.js uses a single-threaded event loop to handle concurrent client requests. Rather than spawning threads for database queries or file accesses, Node offloads blocking system operations to the operating system kernel or a background thread pool (libuv). When the task finishes, it posts a callback to the queue to be executed on the main thread.",codeSnippet:{code:`const fs = require('fs');

console.log("1. Starting Program");

// Offloaded file operation
fs.readFile('largefile.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("3. File content loaded");
});

console.log("2. Reached bottom of script");
// Output: 1, 2, and then 3.`,language:"javascript"},summary:"Write non-blocking asynchronous APIs. Never block the event loop with heavy calculations (e.g. infinite loops, huge JSON.parse), as it stalls all other clients request channels."}]}};