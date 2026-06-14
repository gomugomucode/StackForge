"use strict";exports.id=4963,exports.ids=[4963],exports.modules={24963:(e,t,s)=>{s.r(t),s.d(t,{typescriptNotes:()=>r});let r=[{id:"ts-generics",title:"Chapter 1: Mastering Generics",content:"Generics allow you to write reusable, flexible code that works with a variety of types rather than a single type, while still maintaining static safety.",codeSnippet:{code:`// Generic interface for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Reusable generic function
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = getFirstElement([10, 20, 30]); // TypeScript knows num is number
const str = getFirstElement(["A", "B"]);    // TypeScript knows str is string`,language:"typescript"},summary:"Generics act as type parameters. Use them to make interfaces and classes adaptable to different payload schemas."}]}};