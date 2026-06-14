"use strict";exports.id=2445,exports.ids=[2445],exports.modules={12445:(e,t,n)=>{n.r(t),n.d(t,{reactNotes:()=>a});let a=[{id:"react-rendering",title:"Chapter 1: React State & The Virtual DOM",content:"React coordinates DOM updates by maintaining a virtual copy of the DOM in memory. When a component's state or props modify, React creates a new virtual tree, compares it with the old virtual tree (diffing), and pushes only the differences to the real browser DOM (reconciliation).",codeSnippet:{code:`import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      {/* Updating state schedules a virtual DOM re-render */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,language:"javascript"},summary:"Never mutate state variables directly. Always invoke the state setter function to inform React to queue virtual tree comparisons.",quizQuestions:[{id:"react-vdom-q1",question:"What is the Virtual DOM in React?",options:["A browser API for faster rendering","An in-memory representation of the UI that React compares before updating the real DOM","A CSS framework for virtual scrolling","A server-side rendering engine"],correctIndex:1,explanation:"React maintains a lightweight virtual tree in memory. Diffing this tree against the previous version determines minimal real DOM updates."},{id:"react-vdom-q2",question:"What happens when you call setCount(count + 1) in a functional component?",options:["The DOM updates immediately and synchronously","React schedules a re-render with the new state value","The variable count is mutated in place","Nothing until the component unmounts"],correctIndex:1,explanation:"State setters queue an update. React batches updates and re-renders the component with the new state."},{id:"react-vdom-q3",question:"Why should you never mutate state directly in React?",options:["It causes syntax errors","React cannot detect the change and will not re-render","It only works in class components","It improves performance"],correctIndex:1,explanation:"React relies on referential equality checks. Mutating state in place bypasses change detection."},{id:"react-vdom-q4",question:"What is reconciliation in React?",options:["Merging two React apps into one","The process of comparing virtual DOM trees and applying minimal updates to the real DOM","Combining Redux and Context API","Error recovery after a crash"],correctIndex:1,explanation:"Reconciliation is React's diffing algorithm that determines the most efficient way to update the browser DOM."}]},{id:"react-hooks",title:"Chapter 2: Optimization with useMemo & useCallback",content:"React components re-render by default when their parents re-render. To prevent redundant heavy computations and preserve referential integrity of handler callbacks, use `useMemo` (memoizes a calculation result) and `useCallback` (memoizes a function instance).",codeSnippet:{code:`import { useState, useMemo, useCallback } from 'react';

export function HeavyComputation({ items }) {
  const [search, setSearch] = useState("");

  // Memoize heavy filtration computation
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(search));
  }, [items, search]);

  // Memoize function to prevent re-creating reference on each render
  const handleClear = useCallback(() => {
    setSearch("");
  }, []);

  return (
    <input value={search} onChange={e => setSearch(e.target.value)} />
  );
}`,language:"javascript"},summary:"Do not optimize prematurely. Use useMemo/useCallback when rendering lists, passing functions to memoized child components, or when dependencies trigger nested hooks.",quizQuestions:[{id:"react-memo-q1",question:"What does useMemo return?",options:["A memoized function reference","A memoized computed value that only recalculates when dependencies change","A cached DOM node","A promise that resolves with the result"],correctIndex:1,explanation:"useMemo caches the result of an expensive computation and returns it unless a dependency changes."},{id:"react-memo-q2",question:"When should you use useCallback?",options:["To memoize any variable","To preserve a stable function reference across re-renders","To replace useState entirely","Only in class components"],correctIndex:1,explanation:"useCallback returns a memoized callback, useful when passing functions to React.memo-wrapped child components."},{id:"react-memo-q3",question:"What is a common pitfall with useMemo and useCallback?",options:["They cannot be used with TypeScript","Overusing them when the computation is cheap adds unnecessary complexity","They always improve performance regardless of use case","They prevent all re-renders globally"],correctIndex:1,explanation:"Premature optimization with these hooks adds overhead. Use them when profiling shows a real benefit."}]}]}};