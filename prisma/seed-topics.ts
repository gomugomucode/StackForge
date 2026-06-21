/**
 * StackForge Academy — Learning Content Seed Script
 * 
 * Seeds the database with structured, production-quality learning content.
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed-topics.ts
 * Or via: npx tsx prisma/seed-topics.ts
 * 
 * Content covers JavaScript fundamentals with full:
 * - TopicContent (overview, syntax, explanation, best practices, common mistakes)
 * - TopicExamples (3+ per topic with code, output, and explanation)
 * - Challenges (2-3 per topic with hints, solutions, expected output)
 * - Quizzes (10 questions per topic)
 * - InterviewQuestions (5+ per topic with difficulty ratings and company frequency)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── JAVASCRIPT TOPICS ───────────────────────────────────────────────────

const jsTopics = [
  // ──────────────────────────────────────────
  // TOPIC 1: Variables & Data Types
  // ──────────────────────────────────────────
  {
    slug: "variables-and-data-types",
    technology: "javascript",
    title: "Variables & Data Types",
    description:
      "Learn how JavaScript stores and manages data through variables (var, let, const) and understand primitive vs reference data types.",
    difficulty: "beginner",
    estimatedTime: 45,
    prerequisites: [],
    nextTopics: ["operators-and-expressions", "functions"],
    content: {
      overview:
        "Variables are containers that store data values in memory. JavaScript provides three keywords for declaring variables: `var` (function-scoped, legacy), `let` (block-scoped, reassignable), and `const` (block-scoped, not reassignable). JavaScript has seven primitive types: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, and `null`, plus the `object` reference type.",
      syntax: `// Variable declarations
let age = 25;           // block-scoped, reassignable
const name = "Alice";   // block-scoped, constant reference
var legacy = true;      // function-scoped (avoid in modern JS)

// Primitive types
let str = "hello";       // string
let num = 42;            // number
let big = 9007199254740991n; // bigint
let bool = true;         // boolean
let undef = undefined;   // undefined
let sym = Symbol("id");  // symbol
let empty = null;        // null (intentional absence)

// Reference type
let obj = { key: "value" };
let arr = [1, 2, 3];`,
      explanation:
        "The key difference between `let`/`const` and `var` is scoping. `let` and `const` are block-scoped — they only exist within the nearest enclosing `{}` block. `var` is function-scoped and is hoisted to the top of its function. `const` prevents reassignment of the variable binding, but does NOT make objects immutable — you can still modify properties of a `const` object. Primitive types are stored by value (copied on assignment), while reference types (objects, arrays, functions) are stored by reference (multiple variables can point to the same object in memory).",
      bestPractices: [
        "Use `const` by default; only use `let` when you need to reassign the variable.",
        "Never use `var` in modern JavaScript — it has confusing hoisting and scoping behavior.",
        "Use descriptive, camelCase variable names: `userAge` instead of `x` or `a`.",
        "Declare variables as close to their first use as possible.",
        "Use `===` (strict equality) instead of `==` to avoid type coercion bugs.",
      ],
      commonMistakes: [
        "Using `var` instead of `let`/`const`, which leads to unintentional hoisting and scope leaks.",
        "Assuming `const` makes objects immutable — `const obj = {}; obj.key = 'value'` is valid.",
        "Forgetting that `typeof null` returns `'object'` (a historical JavaScript bug).",
        "Not understanding that `NaN !== NaN` — use `Number.isNaN()` to check for NaN.",
        "Confusing `undefined` (variable declared but not assigned) with `null` (intentionally empty).",
      ],
    },
    examples: [
      {
        title: "Block Scoping with let vs var",
        code: `function scopeDemo() {
  if (true) {
    var varVariable = "I'm function-scoped";
    let letVariable = "I'm block-scoped";
  }
  console.log(varVariable);  // Accessible
  // console.log(letVariable); // ReferenceError!
}
scopeDemo();`,
        output: "I'm function-scoped",
        explanation:
          "`var` is hoisted to the function scope, so it's accessible outside the `if` block. `let` is confined to the `if` block and throws a ReferenceError if accessed outside.",
      },
      {
        title: "const with Objects — Mutable Properties",
        code: `const user = { name: "Alice", age: 25 };
user.age = 26;           // ✅ Allowed — modifying a property
user.email = "a@b.com";  // ✅ Allowed — adding a property
console.log(user);
// user = {};             // ❌ TypeError — cannot reassign const`,
        output: '{ name: "Alice", age: 26, email: "a@b.com" }',
        explanation:
          "`const` prevents reassignment of the variable itself, but the object it points to is still mutable. To make an object truly immutable, use `Object.freeze()`.",
      },
      {
        title: "Type Checking with typeof",
        code: `console.log(typeof "hello");    // "string"
console.log(typeof 42);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (historical bug)
console.log(typeof {});         // "object"
console.log(typeof []);         // "object" (arrays are objects)
console.log(typeof function(){}); // "function"`,
        output: `string
number
boolean
undefined
object
object
object
function`,
        explanation:
          "`typeof` returns a string indicating the type of the operand. Note the quirks: `typeof null` returns `'object'` (a well-known bug that can never be fixed for backward compatibility), and arrays also return `'object'`. Use `Array.isArray()` to check for arrays.",
      },
    ],
    challenges: [
      {
        title: "Swap Two Variables Without a Third",
        description:
          "Given two variables `a = 5` and `b = 10`, swap their values without using a temporary variable. Use destructuring assignment.",
        difficulty: "beginner",
        hints: [
          "JavaScript supports array destructuring: `[x, y] = [y, x]`",
          "This works because the right side is evaluated before assignment",
        ],
        solution: `let a = 5;
let b = 10;
[a, b] = [b, a];
console.log(a, b);`,
        expectedOutput: "10 5",
      },
      {
        title: "Deep Clone an Object",
        description:
          "Create a function `deepClone(obj)` that returns a deep copy of the input object. The clone should not share any references with the original. Test with nested objects.",
        difficulty: "intermediate",
        hints: [
          "The spread operator `{...obj}` only does a shallow copy",
          "Consider using `structuredClone()` (modern) or `JSON.parse(JSON.stringify())`",
          "JSON method has limitations: it cannot clone functions, undefined, or circular references",
        ],
        solution: `function deepClone(obj) {
  return structuredClone(obj);
}

const original = { name: "Alice", address: { city: "NYC" } };
const clone = deepClone(original);
clone.address.city = "LA";
console.log(original.address.city);
console.log(clone.address.city);`,
        expectedOutput: `NYC
LA`,
      },
    ],
    quizzes: [
      {
        title: "Variables & Data Types Quiz",
        description: "Test your understanding of JavaScript variables and data types.",
        difficulty: "beginner",
        questions: [
          {
            question: "What is the output of `typeof null`?",
            options: ['"null"', '"undefined"', '"object"', '"boolean"'],
            answer: '"object"',
            explanation: "This is a well-known JavaScript bug. `typeof null` returns 'object' due to how JavaScript was originally implemented.",
            difficulty: "beginner",
          },
          {
            question: "Which keyword declares a block-scoped variable that cannot be reassigned?",
            options: ["var", "let", "const", "static"],
            answer: "const",
            explanation: "`const` creates a block-scoped binding that cannot be reassigned. Note: objects declared with const can still have their properties modified.",
            difficulty: "beginner",
          },
          {
            question: "What happens when you try to access a `let` variable before its declaration?",
            options: ["Returns undefined", "Returns null", "Throws ReferenceError", "Returns 0"],
            answer: "Throws ReferenceError",
            explanation: "`let` and `const` variables exist in a 'Temporal Dead Zone' from the start of the block until their declaration. Accessing them before declaration throws a ReferenceError.",
            difficulty: "intermediate",
          },
          {
            question: "Which of these is NOT a primitive type in JavaScript?",
            options: ["symbol", "bigint", "array", "undefined"],
            answer: "array",
            explanation: "Arrays are reference types (objects) in JavaScript. The seven primitives are: string, number, bigint, boolean, undefined, symbol, and null.",
            difficulty: "beginner",
          },
          {
            question: "What is the result of `NaN === NaN`?",
            options: ["true", "false", "undefined", "TypeError"],
            answer: "false",
            explanation: "NaN is the only JavaScript value that is not equal to itself. Use `Number.isNaN()` to check for NaN.",
            difficulty: "intermediate",
          },
          {
            question: "What does `const arr = [1,2,3]; arr.push(4);` do?",
            options: ["Throws TypeError", "Creates a new array", "Adds 4 to arr successfully", "Returns undefined"],
            answer: "Adds 4 to arr successfully",
            explanation: "`const` prevents reassignment of the variable, but the array it references is still mutable. You can modify its contents.",
            difficulty: "beginner",
          },
          {
            question: "Which statement about `var` is TRUE?",
            options: ["Block-scoped", "Function-scoped and hoisted", "Cannot be redeclared", "Introduced in ES6"],
            answer: "Function-scoped and hoisted",
            explanation: "`var` is function-scoped (not block-scoped) and is hoisted to the top of its function scope. It was the original variable keyword before `let` and `const` in ES6.",
            difficulty: "beginner",
          },
          {
            question: "What is the value of `x` after: `let x; console.log(x);`?",
            options: ["null", "0", "undefined", '""'],
            answer: "undefined",
            explanation: "Variables declared with `let` without an initializer are automatically set to `undefined`.",
            difficulty: "beginner",
          },
          {
            question: "What does `typeof function(){}` return?",
            options: ['"object"', '"function"', '"undefined"', '"callable"'],
            answer: '"function"',
            explanation: "Functions are technically objects in JavaScript, but `typeof` has a special case that returns 'function' for callable objects.",
            difficulty: "intermediate",
          },
          {
            question: "What is the difference between `==` and `===`?",
            options: [
              "No difference",
              "`==` checks value only; `===` checks value and type",
              "`===` is faster",
              "`==` is deprecated",
            ],
            answer: "`==` checks value only; `===` checks value and type",
            explanation: "`==` (loose equality) performs type coercion before comparison. `===` (strict equality) compares both value and type without coercion. Always prefer `===`.",
            difficulty: "beginner",
          },
        ],
      },
    ],
    interviews: [
      {
        question: "What is the difference between `var`, `let`, and `const`?",
        answer:
          "`var` is function-scoped and hoisted (initialized to `undefined`). `let` is block-scoped, hoisted but not initialized (Temporal Dead Zone). `const` is block-scoped, hoisted but not initialized, and cannot be reassigned. Use `const` by default, `let` when reassignment is needed, and never `var`.",
        difficulty: "beginner",
        tags: ["variables", "scope", "hoisting"],
        companyFrequency: 95,
      },
      {
        question: "Explain the Temporal Dead Zone (TDZ) in JavaScript.",
        answer:
          "The TDZ is the region between the start of a block scope and the point where a `let` or `const` variable is declared. During this zone, the variable exists but cannot be accessed — any attempt throws a ReferenceError. This prevents the confusing behavior of `var` hoisting where variables are accessible (as `undefined`) before their declaration.",
        difficulty: "intermediate",
        tags: ["hoisting", "scope", "TDZ"],
        companyFrequency: 70,
      },
      {
        question: "What is the difference between primitive and reference types?",
        answer:
          "Primitive types (string, number, boolean, null, undefined, symbol, bigint) are stored directly in the variable — when assigned to another variable, the value is copied. Reference types (objects, arrays, functions) store a pointer to the data in heap memory — when assigned to another variable, both variables point to the same object. This is why modifying one variable's object affects the other.",
        difficulty: "intermediate",
        tags: ["types", "memory", "references"],
        companyFrequency: 85,
      },
      {
        question: "Why does `typeof null` return 'object'?",
        answer:
          "This is a historical bug in JavaScript's original implementation. In the first version of JavaScript, values were stored as a type tag and a value. Objects had a type tag of 0, and `null` was represented as the NULL pointer (0x00). Because `typeof` checked the type tag, `null` was incorrectly identified as an object. This bug cannot be fixed because it would break existing code across the web.",
        difficulty: "advanced",
        tags: ["typeof", "null", "history"],
        companyFrequency: 60,
      },
      {
        question: "How would you check if a variable is an array?",
        answer:
          "Use `Array.isArray(value)` — it's the most reliable method. `typeof` returns `'object'` for arrays, so it's not useful. `instanceof Array` works but can fail across different frames/iframes because each frame has its own `Array` constructor. `Array.isArray()` works reliably in all contexts.",
        difficulty: "beginner",
        tags: ["arrays", "type-checking"],
        companyFrequency: 75,
      },
    ],
  },

  // ──────────────────────────────────────────
  // TOPIC 2: Functions
  // ──────────────────────────────────────────
  {
    slug: "functions",
    technology: "javascript",
    title: "Functions",
    description:
      "Master function declarations, expressions, arrow functions, closures, and higher-order functions in JavaScript.",
    difficulty: "beginner",
    estimatedTime: 60,
    prerequisites: ["variables-and-data-types"],
    nextTopics: ["arrays-and-methods", "objects-and-prototypes"],
    content: {
      overview:
        "Functions are reusable blocks of code that perform a specific task. JavaScript supports multiple ways to define functions: function declarations (hoisted), function expressions (not hoisted), arrow functions (concise syntax, lexical `this`), and immediately invoked function expressions (IIFE). Functions are first-class citizens in JavaScript — they can be assigned to variables, passed as arguments, and returned from other functions.",
      syntax: `// Function Declaration (hoisted)
function greet(name) {
  return "Hello, " + name;
}

// Function Expression (not hoisted)
const greet = function(name) {
  return "Hello, " + name;
};

// Arrow Function (ES6+)
const greet = (name) => "Hello, " + name;

// Default Parameters
const greet = (name = "World") => "Hello, " + name;

// Rest Parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);

// IIFE (Immediately Invoked Function Expression)
(function() {
  console.log("Runs immediately!");
})();`,
      explanation:
        "Function declarations are hoisted — you can call them before their definition in the code. Function expressions and arrow functions are NOT hoisted. Arrow functions have a critical difference: they do not have their own `this` binding. They inherit `this` from the enclosing lexical scope. This makes them ideal for callbacks but unsuitable as object methods. Closures occur when a function retains access to variables from its outer scope even after the outer function has returned. Higher-order functions are functions that take other functions as arguments or return functions.",
      bestPractices: [
        "Keep functions small and focused — each function should do one thing well.",
        "Use arrow functions for callbacks and short expressions.",
        "Use function declarations for top-level named functions (they're hoisted and have clearer stack traces).",
        "Always provide default values for optional parameters.",
        "Use destructuring in function parameters for cleaner object arguments: `function({ name, age })`.",
      ],
      commonMistakes: [
        "Using arrow functions as object methods — `this` won't refer to the object.",
        "Forgetting that arrow functions cannot be used as constructors (no `new` keyword).",
        "Creating closures inside loops with `var` — all iterations share the same variable.",
        "Not returning a value from functions that should return one (implicitly returns `undefined`).",
        "Overusing anonymous functions, making debugging harder due to missing names in stack traces.",
      ],
    },
    examples: [
      {
        title: "Closures — Creating Private State",
        code: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount());`,
        output: "2",
        explanation:
          "The `createCounter` function returns an object whose methods close over the `count` variable. Even after `createCounter` finishes executing, the returned methods retain access to `count` through closure. The variable is private — it cannot be accessed directly from outside.",
      },
      {
        title: "Higher-Order Functions — compose()",
        code: `const compose = (...fns) => (x) =>
  fns.reduceRight((acc, fn) => fn(acc), x);

const double = (x) => x * 2;
const addOne = (x) => x + 1;
const square = (x) => x * x;

const transform = compose(square, addOne, double);
console.log(transform(3)); // double(3)=6, addOne(6)=7, square(7)=49`,
        output: "49",
        explanation:
          "`compose` takes multiple functions and returns a new function that applies them right-to-left. This is a fundamental pattern in functional programming. The input `3` goes through `double → addOne → square`.",
      },
      {
        title: "Arrow Functions and this",
        code: `const obj = {
  name: "Alice",
  // Regular method — 'this' refers to obj
  greetRegular: function() {
    return "Hi, I'm " + this.name;
  },
  // Arrow method — 'this' is inherited (NOT obj)
  greetArrow: () => {
    return "Hi, I'm " + this.name; // 'this' is the outer scope
  },
};

console.log(obj.greetRegular());
console.log(obj.greetArrow());`,
        output: `Hi, I'm Alice
Hi, I'm undefined`,
        explanation:
          "Arrow functions don't have their own `this`. In `greetArrow`, `this` refers to the enclosing scope (likely `window` or `global`), not the `obj`. Use regular functions for object methods.",
      },
    ],
    challenges: [
      {
        title: "Implement a Memoize Function",
        description:
          "Create a function `memoize(fn)` that caches the results of expensive function calls. If called again with the same arguments, it should return the cached result instead of recomputing.",
        difficulty: "intermediate",
        hints: [
          "Use a Map or object to store previously computed results",
          "Use JSON.stringify on arguments to create a cache key",
          "Return a new function that checks the cache before calling the original",
        ],
        solution: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const factorial = memoize(function f(n) {
  return n <= 1 ? 1 : n * f(n - 1);
});
console.log(factorial(5));
console.log(factorial(5));`,
        expectedOutput: `120
120`,
      },
      {
        title: "Implement Function Currying",
        description:
          "Create a function `curry(fn)` that transforms a function with multiple arguments into a sequence of functions each taking a single argument. `curry(add)(1)(2)(3)` should equal `add(1, 2, 3)`.",
        difficulty: "advanced",
        hints: [
          "Use `fn.length` to know how many arguments the original function expects",
          "Return a new function that collects arguments until enough are provided",
          "Use recursion or a helper function that accumulates arguments",
        ],
        solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1)(2, 3));`,
        expectedOutput: `6
6
6`,
      },
    ],
    quizzes: [
      {
        title: "Functions Mastery Quiz",
        description: "Test your knowledge of JavaScript functions, closures, and higher-order functions.",
        difficulty: "beginner",
        questions: [
          {
            question: "What is a closure in JavaScript?",
            options: [
              "A function that closes the browser",
              "A function that has access to variables from its outer scope even after the outer function returns",
              "A function that cannot be called more than once",
              "A function without parameters",
            ],
            answer: "A function that has access to variables from its outer scope even after the outer function returns",
            explanation: "A closure is formed when a function retains a reference to variables in its lexical scope, even after the outer function has completed execution.",
            difficulty: "intermediate",
          },
          {
            question: "What is the main difference between function declarations and function expressions?",
            options: [
              "Declarations are faster",
              "Expressions cannot have names",
              "Declarations are hoisted; expressions are not",
              "No difference",
            ],
            answer: "Declarations are hoisted; expressions are not",
            explanation: "Function declarations are fully hoisted — you can call them before they appear in the code. Function expressions are not hoisted.",
            difficulty: "beginner",
          },
          {
            question: "What does an arrow function NOT have?",
            options: ["Parameters", "Return value", "Its own `this` binding", "A function body"],
            answer: "Its own `this` binding",
            explanation: "Arrow functions inherit `this` from the enclosing lexical scope. They do not have their own `this`, `arguments`, `super`, or `new.target`.",
            difficulty: "intermediate",
          },
          {
            question: "What is a higher-order function?",
            options: [
              "A function defined at the top of a file",
              "A function that takes or returns another function",
              "A function with many parameters",
              "An async function",
            ],
            answer: "A function that takes or returns another function",
            explanation: "Higher-order functions are functions that operate on other functions, either by taking them as arguments or returning them. Examples: `map`, `filter`, `reduce`.",
            difficulty: "beginner",
          },
          {
            question: "What is the output of: `(function(x) { return x * 2; })(5)`?",
            options: ["undefined", "5", "10", "Error"],
            answer: "10",
            explanation: "This is an IIFE (Immediately Invoked Function Expression). The function is defined and immediately called with argument `5`, returning `10`.",
            difficulty: "beginner",
          },
          {
            question: "What does the rest parameter syntax `...args` do?",
            options: [
              "Spreads an array into individual arguments",
              "Collects remaining arguments into an array",
              "Creates a copy of all arguments",
              "Stops the function execution",
            ],
            answer: "Collects remaining arguments into an array",
            explanation: "Rest parameters (`...args`) collect all remaining arguments passed to a function into a real array. Unlike the `arguments` object, rest parameters are a true array with all array methods.",
            difficulty: "beginner",
          },
          {
            question: "Which function type can be used with the `new` keyword?",
            options: ["Arrow functions only", "Regular functions only", "Both", "Neither"],
            answer: "Regular functions only",
            explanation: "Arrow functions cannot be used as constructors and will throw a TypeError if used with `new`. Only regular function declarations/expressions can be constructors.",
            difficulty: "intermediate",
          },
          {
            question: "What is the purpose of `Function.prototype.bind()`?",
            options: [
              "Creates a copy of a function",
              "Creates a new function with a fixed `this` value",
              "Immediately invokes a function",
              "Prevents a function from being called",
            ],
            answer: "Creates a new function with a fixed `this` value",
            explanation: "`bind()` creates a new function with a permanently bound `this` value. Unlike `call()` and `apply()`, it does not immediately invoke the function.",
            difficulty: "intermediate",
          },
          {
            question: "What is function hoisting?",
            options: [
              "Moving functions to separate files",
              "Function declarations being moved to the top of their scope before execution",
              "Calling functions in alphabetical order",
              "Optimizing function performance",
            ],
            answer: "Function declarations being moved to the top of their scope before execution",
            explanation: "During the creation phase, JavaScript moves function declarations to the top of their scope. This allows you to call a function before its declaration in the code.",
            difficulty: "beginner",
          },
          {
            question: "What does `arguments` refer to inside a regular function?",
            options: [
              "The function's parameter names",
              "An array-like object containing all passed arguments",
              "The function's return value",
              "The function's scope chain",
            ],
            answer: "An array-like object containing all passed arguments",
            explanation: "The `arguments` object is an array-like object (not a real array) that contains all arguments passed to a regular function. Arrow functions do not have `arguments`.",
            difficulty: "intermediate",
          },
        ],
      },
    ],
    interviews: [
      {
        question: "Explain closures in JavaScript and give a practical use case.",
        answer:
          "A closure is a function that retains access to its lexical scope even when executed outside that scope. When an inner function references variables from an outer function, those variables are preserved in memory even after the outer function returns. Practical use cases include: data privacy (module pattern), function factories, partial application/currying, and maintaining state in event handlers. Example: a counter function that keeps track of a private count variable.",
        difficulty: "intermediate",
        tags: ["closures", "scope", "patterns"],
        companyFrequency: 95,
      },
      {
        question: "What is the difference between `call()`, `apply()`, and `bind()`?",
        answer:
          "All three methods set the `this` context for a function. `call(thisArg, arg1, arg2, ...)` invokes the function immediately with arguments listed individually. `apply(thisArg, [argsArray])` invokes the function immediately with arguments as an array. `bind(thisArg, arg1, arg2, ...)` returns a NEW function with `this` permanently bound — it does not invoke the function. Use `call` for known arguments, `apply` when arguments are in an array, and `bind` when you need a reusable function with a fixed context (e.g., event handlers).",
        difficulty: "intermediate",
        tags: ["this", "call", "apply", "bind"],
        companyFrequency: 90,
      },
      {
        question: "What are arrow functions and when should you NOT use them?",
        answer:
          "Arrow functions are a concise syntax introduced in ES6: `(args) => expression`. Key differences from regular functions: 1) No own `this` — they inherit from the enclosing scope. 2) No `arguments` object. 3) Cannot be used as constructors. 4) Cannot be used as generators. Avoid arrow functions for: object methods (wrong `this`), prototype methods, event handlers where you need `this` to reference the element, and functions that need their own `arguments` object.",
        difficulty: "beginner",
        tags: ["arrow-functions", "this", "es6"],
        companyFrequency: 85,
      },
      {
        question: "Explain the concept of function currying and its benefits.",
        answer:
          "Currying transforms a function with multiple arguments into a sequence of nested functions, each taking a single argument: `f(a, b, c)` becomes `f(a)(b)(c)`. Benefits: 1) Partial application — create specialized functions from general ones (`const double = multiply(2)`). 2) Code reuse — build complex functions from simple building blocks. 3) Function composition — curried functions compose naturally in pipelines. 4) Lazy evaluation — arguments can be provided at different points in time.",
        difficulty: "advanced",
        tags: ["currying", "functional-programming", "partial-application"],
        companyFrequency: 65,
      },
      {
        question: "What is an IIFE and why would you use one?",
        answer:
          "An IIFE (Immediately Invoked Function Expression) is a function that runs as soon as it's defined: `(function() { ... })()`. Use cases: 1) Creating a private scope to avoid polluting the global namespace (the classic module pattern before ES6 modules). 2) Executing initialization code that should run once. 3) Isolating variables in legacy code using `var`. With ES6 modules and block-scoped `let`/`const`, IIFEs are less common but still useful for one-time initialization patterns.",
        difficulty: "intermediate",
        tags: ["IIFE", "scope", "module-pattern"],
        companyFrequency: 70,
      },
    ],
  },

  // ──────────────────────────────────────────
  // TOPIC 3: Arrays & Methods
  // ──────────────────────────────────────────
  {
    slug: "arrays-and-methods",
    technology: "javascript",
    title: "Arrays & Methods",
    description:
      "Learn to manipulate data with JavaScript arrays, including iteration methods, destructuring, spread/rest, and functional patterns.",
    difficulty: "beginner",
    estimatedTime: 60,
    prerequisites: ["variables-and-data-types", "functions"],
    nextTopics: ["objects-and-prototypes"],
    content: {
      overview:
        "Arrays are ordered collections of values. JavaScript arrays are dynamic (no fixed size), heterogeneous (can hold mixed types), and zero-indexed. Modern JavaScript provides powerful array methods for functional-style data manipulation: `map`, `filter`, `reduce`, `find`, `some`, `every`, `flat`, `flatMap`, and more. Understanding these methods is essential for writing clean, declarative code.",
      syntax: `// Creating arrays
const numbers = [1, 2, 3, 4, 5];
const mixed = ["hello", 42, true, null];
const matrix = [[1, 2], [3, 4]];

// Destructuring
const [first, second, ...rest] = numbers;

// Spread operator
const combined = [...numbers, 6, 7, 8];

// Key methods
numbers.map(n => n * 2);         // [2, 4, 6, 8, 10]
numbers.filter(n => n > 3);       // [4, 5]
numbers.reduce((sum, n) => sum + n, 0); // 15
numbers.find(n => n > 3);         // 4
numbers.some(n => n > 4);         // true
numbers.every(n => n > 0);        // true
numbers.includes(3);              // true
numbers.indexOf(3);               // 2
numbers.flat(Infinity);           // Flatten nested arrays`,
      explanation:
        "Array methods fall into two categories: **mutating** methods that change the original array (`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`) and **non-mutating** methods that return a new array (`map`, `filter`, `slice`, `concat`, `flat`, `flatMap`). `reduce` is the most versatile — it can implement any other array method. The key to mastering arrays is understanding method chaining: `arr.filter(...).map(...).reduce(...)`. Modern JavaScript encourages immutable patterns — prefer non-mutating methods.",
      bestPractices: [
        "Prefer `map`, `filter`, `reduce` over `for` loops for data transformation.",
        "Use `find` instead of `filter` when you only need the first matching element.",
        "Use `some` and `every` for boolean checks instead of filtering and checking length.",
        "Avoid mutating arrays — use spread `[...arr, newItem]` instead of `arr.push(newItem)`.",
        "Use `Array.from()` to convert array-like objects and iterables into real arrays.",
      ],
      commonMistakes: [
        "Confusing `find` (returns first match) with `filter` (returns all matches).",
        "Forgetting that `sort()` mutates the original array AND converts elements to strings by default.",
        "Using `==` to compare arrays — `[1,2] == [1,2]` is `false` (reference comparison).",
        "Not providing an initial value to `reduce`, which causes errors on empty arrays.",
        "Using `delete arr[i]` instead of `splice` — `delete` leaves a hole (undefined) in the array.",
      ],
    },
    examples: [
      {
        title: "Method Chaining — Data Pipeline",
        code: `const users = [
  { name: "Alice", age: 28, active: true },
  { name: "Bob", age: 22, active: false },
  { name: "Charlie", age: 35, active: true },
  { name: "Diana", age: 19, active: true },
];

const result = users
  .filter(u => u.active)
  .map(u => ({ ...u, category: u.age >= 25 ? "senior" : "junior" }))
  .sort((a, b) => a.age - b.age)
  .map(u => \`\${u.name} (\${u.category})\`);

console.log(result);`,
        output: '["Diana (junior)", "Alice (senior)", "Charlie (senior)"]',
        explanation:
          "This pipeline filters for active users, adds a category, sorts by age, then formats as strings. Each method returns a new array, enabling clean chaining without mutation.",
      },
      {
        title: "reduce() — Building Objects from Arrays",
        code: `const votes = ["yes", "no", "yes", "yes", "no", "yes"];

const tally = votes.reduce((acc, vote) => {
  acc[vote] = (acc[vote] || 0) + 1;
  return acc;
}, {});

console.log(tally);`,
        output: '{ yes: 4, no: 2 }',
        explanation:
          "`reduce` iterates over each element, accumulating a result. Here it builds a frequency map from an array of strings. The initial value `{}` is crucial — without it, the first element becomes the accumulator.",
      },
      {
        title: "Destructuring and Spread — Immutable Updates",
        code: `const original = [1, 2, 3, 4, 5];

// Add to beginning
const withPrepend = [0, ...original];

// Add to end
const withAppend = [...original, 6];

// Remove by index (index 2)
const withoutThird = [...original.slice(0, 2), ...original.slice(3)];

// Replace by index (index 2 → 99)
const withReplacement = original.map((val, i) => i === 2 ? 99 : val);

console.log(withPrepend);
console.log(withAppend);
console.log(withoutThird);
console.log(withReplacement);
console.log(original); // unchanged!`,
        output: `[0, 1, 2, 3, 4, 5]
[1, 2, 3, 4, 5, 6]
[1, 2, 4, 5]
[1, 2, 99, 4, 5]
[1, 2, 3, 4, 5]`,
        explanation:
          "These patterns show how to add, remove, and replace elements immutably using spread and `slice`. The original array is never modified — critical for state management in frameworks like React.",
      },
    ],
    challenges: [
      {
        title: "Implement Array.prototype.flat()",
        description:
          "Create a function `flatten(arr, depth = 1)` that flattens a nested array up to the specified depth. `flatten([1, [2, [3, [4]]]], 2)` should return `[1, 2, 3, [4]]`.",
        difficulty: "intermediate",
        hints: [
          "Use recursion — check if each element is an array",
          "Decrement depth on each recursive call",
          "When depth reaches 0, stop flattening",
        ],
        solution: `function flatten(arr, depth = 1) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      return [...acc, ...flatten(val, depth - 1)];
    }
    return [...acc, val];
  }, []);
}

console.log(flatten([1, [2, [3, [4]]]], 2));`,
        expectedOutput: "[1, 2, 3, [4]]",
      },
      {
        title: "Group By Property",
        description:
          "Create a function `groupBy(arr, key)` that groups an array of objects by a specified key. Return an object where keys are unique values of the property and values are arrays of matching objects.",
        difficulty: "intermediate",
        hints: [
          "Use reduce to build the result object",
          "For each item, get the value of the key property",
          "Initialize the array for that key if it doesn't exist yet",
        ],
        solution: `function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const value = item[key];
    groups[value] = groups[value] || [];
    groups[value].push(item);
    return groups;
  }, {});
}

const people = [
  { name: "Alice", dept: "Engineering" },
  { name: "Bob", dept: "Design" },
  { name: "Charlie", dept: "Engineering" },
  { name: "Diana", dept: "Design" },
];
console.log(JSON.stringify(groupBy(people, "dept")));`,
        expectedOutput: '{"Engineering":[{"name":"Alice","dept":"Engineering"},{"name":"Charlie","dept":"Engineering"}],"Design":[{"name":"Bob","dept":"Design"},{"name":"Diana","dept":"Design"}]}',
      },
    ],
    quizzes: [
      {
        title: "Arrays & Methods Quiz",
        description: "Test your mastery of JavaScript array manipulation.",
        difficulty: "beginner",
        questions: [
          {
            question: "Which array method returns the first element that satisfies the condition?",
            options: ["filter()", "find()", "some()", "indexOf()"],
            answer: "find()",
            explanation: "`find()` returns the first element that passes the test. `filter()` returns ALL matching elements as an array.",
            difficulty: "beginner",
          },
          {
            question: "What does `[1,2,3].map(x => x * 2)` return?",
            options: ["[2,4,6]", "[1,2,3]", "6", "undefined"],
            answer: "[2,4,6]",
            explanation: "`map()` creates a new array by applying the callback to each element. It always returns an array of the same length.",
            difficulty: "beginner",
          },
          {
            question: "Which method MUTATES the original array?",
            options: ["map()", "filter()", "sort()", "concat()"],
            answer: "sort()",
            explanation: "`sort()` mutates the original array in place. Use `[...arr].sort()` or `arr.toSorted()` (ES2023) for non-mutating sorts.",
            difficulty: "intermediate",
          },
          {
            question: "What is the initial value parameter in `reduce(callback, initialValue)`?",
            options: [
              "The first element of the array",
              "The starting value for the accumulator",
              "The maximum number of iterations",
              "The return value of the function",
            ],
            answer: "The starting value for the accumulator",
            explanation: "The initial value sets the starting point for the accumulator. Without it, reduce uses the first array element as the initial accumulator and starts iteration from the second element.",
            difficulty: "intermediate",
          },
          {
            question: "What does `Array.isArray([1,2,3])` return?",
            options: ["true", "false", '"array"', '"object"'],
            answer: "true",
            explanation: "`Array.isArray()` is the reliable way to check if a value is an array. `typeof` returns 'object' for arrays.",
            difficulty: "beginner",
          },
          {
            question: "What does the spread operator do in `[...arr1, ...arr2]`?",
            options: [
              "Deletes both arrays",
              "Creates a new array combining both arrays",
              "Modifies arr1 to include arr2",
              "Returns the length of both arrays",
            ],
            answer: "Creates a new array combining both arrays",
            explanation: "The spread operator unpacks array elements into a new array. It creates a shallow copy, not modifying either original array.",
            difficulty: "beginner",
          },
          {
            question: "What does `[1,2,3].some(x => x > 2)` return?",
            options: ["[3]", "true", "3", "1"],
            answer: "true",
            explanation: "`some()` returns `true` if at least one element passes the test. It short-circuits on the first match.",
            difficulty: "beginner",
          },
          {
            question: "How do you remove an element at index 2 from an array immutably?",
            options: [
              "arr.splice(2, 1)",
              "delete arr[2]",
              "[...arr.slice(0,2), ...arr.slice(3)]",
              "arr.pop(2)",
            ],
            answer: "[...arr.slice(0,2), ...arr.slice(3)]",
            explanation: "Using `slice` and spread creates a new array without the element at index 2. `splice` mutates the original, and `delete` leaves a hole.",
            difficulty: "intermediate",
          },
          {
            question: "What does `flatMap` do?",
            options: [
              "Flattens an array completely",
              "Maps each element then flattens the result by one level",
              "Creates a flat copy of an array",
              "Filters and maps simultaneously",
            ],
            answer: "Maps each element then flattens the result by one level",
            explanation: "`flatMap` is equivalent to `map(...).flat(1)`. It's useful when the mapping function returns arrays and you want to flatten the result.",
            difficulty: "intermediate",
          },
          {
            question: "What is the time complexity of `Array.prototype.includes()`?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            answer: "O(n)",
            explanation: "`includes()` performs a linear search through the array. For frequent lookups, consider using a `Set` for O(1) average-case lookups.",
            difficulty: "advanced",
          },
        ],
      },
    ],
    interviews: [
      {
        question: "Explain the difference between `map`, `filter`, and `reduce`.",
        answer:
          "`map` transforms each element and returns a new array of the same length. `filter` returns a new array containing only elements that pass a test (can be shorter). `reduce` accumulates all elements into a single value (any type — number, string, object, array). `reduce` is the most powerful — you can implement both `map` and `filter` using `reduce`.",
        difficulty: "beginner",
        tags: ["arrays", "map", "filter", "reduce"],
        companyFrequency: 95,
      },
      {
        question: "What is the difference between `slice` and `splice`?",
        answer:
          "`slice(start, end)` returns a shallow copy of a portion of an array without modifying the original. `splice(start, deleteCount, ...items)` modifies the original array by removing, replacing, or adding elements. Key rule: `slice` is pure (non-mutating), `splice` is impure (mutating).",
        difficulty: "beginner",
        tags: ["arrays", "mutation", "slice", "splice"],
        companyFrequency: 85,
      },
      {
        question: "How would you remove duplicates from an array?",
        answer:
          "Multiple approaches: 1) `[...new Set(arr)]` — cleanest, O(n). 2) `arr.filter((item, i) => arr.indexOf(item) === i)` — O(n²), works for older environments. 3) `reduce` with a lookup object. For arrays of objects, use a Map keyed by a unique property: `[...new Map(arr.map(item => [item.id, item])).values()]`.",
        difficulty: "beginner",
        tags: ["arrays", "Set", "deduplication"],
        companyFrequency: 90,
      },
      {
        question: "What is the difference between `for...of` and `for...in` with arrays?",
        answer:
          "`for...of` iterates over the VALUES of an iterable (correct for arrays): `for (const val of arr)`. `for...in` iterates over the KEYS (indexes as strings) and also iterates over enumerable prototype properties, making it incorrect for arrays. Always use `for...of` for arrays and `for...in` for object property enumeration.",
        difficulty: "intermediate",
        tags: ["arrays", "iteration", "for-of", "for-in"],
        companyFrequency: 75,
      },
      {
        question: "Explain how `Array.from()` works and give use cases.",
        answer:
          "`Array.from(iterable, mapFn)` creates a new array from any iterable or array-like object. Use cases: 1) Convert `NodeList` to array: `Array.from(document.querySelectorAll('div'))`. 2) Create ranges: `Array.from({length: 5}, (_, i) => i)` → `[0,1,2,3,4]`. 3) Convert strings to character arrays: `Array.from('hello')` → `['h','e','l','l','o']`. 4) Clone arrays: `Array.from(arr)`.",
        difficulty: "intermediate",
        tags: ["arrays", "Array.from", "iterables"],
        companyFrequency: 65,
      },
    ],
  },

  // ──────────────────────────────────────────
  // TOPIC 4: Objects & Prototypes
  // ──────────────────────────────────────────
  {
    slug: "objects-and-prototypes",
    technology: "javascript",
    title: "Objects & Prototypes",
    description:
      "Understand object creation patterns, property descriptors, prototype chain, classes, and inheritance in JavaScript.",
    difficulty: "intermediate",
    estimatedTime: 75,
    prerequisites: ["variables-and-data-types", "functions"],
    nextTopics: ["async-javascript", "error-handling"],
    content: {
      overview:
        "Objects are the fundamental building block in JavaScript. Nearly everything in JS is an object or behaves like one. Objects store key-value pairs where keys are strings (or Symbols) and values can be any type. JavaScript uses prototypal inheritance — objects can delegate property lookups to other objects through the prototype chain. ES6 `class` syntax provides a cleaner way to work with prototypes, but it's syntactic sugar over the same prototype mechanism.",
      syntax: `// Object creation
const obj = { name: "Alice", age: 25 };
const fromConstructor = new Object();
const fromCreate = Object.create(proto);

// Property access
obj.name;          // dot notation
obj["name"];       // bracket notation (dynamic keys)

// Destructuring
const { name, age } = obj;
const { name: userName } = obj; // alias

// Spread / Object.assign
const clone = { ...obj };
const merged = { ...obj1, ...obj2 };

// Computed property names
const key = "email";
const dynamic = { [key]: "a@b.com" };

// Optional chaining
const city = user?.address?.city;

// Classes (ES6)
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a noise\`; }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks\`; }
}`,
      explanation:
        "Every JavaScript object has an internal `[[Prototype]]` link to another object (its prototype). When you access a property that doesn't exist on the object, JavaScript walks up the prototype chain until it finds the property or reaches `null`. The `class` keyword is syntactic sugar — `class Dog extends Animal` sets up the same prototype chain as `Dog.prototype = Object.create(Animal.prototype)`. Property descriptors (`Object.defineProperty`) control whether properties are writable, enumerable, and configurable. `Object.freeze()` makes objects deeply immutable at one level.",
      bestPractices: [
        "Use object destructuring for cleaner function parameters: `function({name, age})`.",
        "Use optional chaining `?.` to safely access nested properties.",
        "Prefer `class` syntax over manual prototype manipulation for clarity.",
        "Use `Object.keys()`, `Object.values()`, `Object.entries()` for iteration.",
        "Use computed property names `[variable]: value` for dynamic keys.",
      ],
      commonMistakes: [
        "Modifying `Object.prototype` — it affects ALL objects in the application.",
        "Confusing `hasOwnProperty` with `in` — `in` checks the entire prototype chain.",
        "Using `for...in` without `hasOwnProperty` check, iterating over inherited properties.",
        "Shallow copying objects with spread when deep copy is needed for nested objects.",
        "Forgetting that `Object.freeze()` is shallow — nested objects remain mutable.",
      ],
    },
    examples: [
      {
        title: "Prototype Chain in Action",
        code: `const animal = {
  type: "Animal",
  describe() {
    return \`Type: \${this.type}, Name: \${this.name}\`;
  }
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.type = "Dog";

console.log(dog.describe());
console.log(dog.hasOwnProperty("name"));
console.log(dog.hasOwnProperty("describe"));`,
        output: `Type: Dog, Name: Rex
true
false`,
        explanation:
          "`dog` inherits `describe()` from `animal` via the prototype chain. `name` and `type` are own properties of `dog`, but `describe` is found on the prototype. `hasOwnProperty` confirms this.",
      },
      {
        title: "Class Inheritance with super()",
        code: `class Shape {
  constructor(color) {
    this.color = color;
  }
  area() { return 0; }
  toString() {
    return \`\${this.color} shape with area \${this.area()}\`;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }
  area() {
    return Math.round(Math.PI * this.radius ** 2 * 100) / 100;
  }
}

const c = new Circle("red", 5);
console.log(c.toString());
console.log(c instanceof Shape);`,
        output: `red shape with area 78.54
true`,
        explanation:
          "`super(color)` calls the parent constructor. The `area()` method is overridden in `Circle`. `toString()` is inherited from `Shape` and calls the overridden `area()` through polymorphism.",
      },
      {
        title: "Object.entries() with Destructuring",
        code: `const scores = { alice: 95, bob: 82, charlie: 91, diana: 88 };

const results = Object.entries(scores)
  .filter(([_, score]) => score >= 90)
  .map(([name, score]) => \`\${name}: A (\${score})\`)
  .join(", ");

console.log(results);`,
        output: "alice: A (95), charlie: A (91)",
        explanation:
          "`Object.entries()` returns `[key, value]` pairs as an array of arrays, enabling array methods with destructuring for clean object data processing.",
      },
    ],
    challenges: [
      {
        title: "Implement a Deep Merge Function",
        description:
          "Create a function `deepMerge(target, source)` that recursively merges two objects. Arrays should be concatenated, not replaced. Primitive values from `source` should override `target`.",
        difficulty: "advanced",
        hints: [
          "Check if both values are plain objects before recursing",
          "Use Object.keys() to iterate over properties",
          "Handle arrays separately — concatenate instead of replace",
        ],
        solution: `function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (Array.isArray(source[key]) && Array.isArray(result[key])) {
      result[key] = [...result[key], ...source[key]];
    } else if (
      source[key] && typeof source[key] === "object" &&
      result[key] && typeof result[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

const a = { x: 1, nested: { a: 1, b: 2 }, tags: ["js"] };
const b = { x: 2, nested: { b: 3, c: 4 }, tags: ["ts"] };
console.log(JSON.stringify(deepMerge(a, b)));`,
        expectedOutput: '{"x":2,"nested":{"a":1,"b":3,"c":4},"tags":["js","ts"]}',
      },
    ],
    quizzes: [
      {
        title: "Objects & Prototypes Quiz",
        description: "Test your understanding of JavaScript objects, prototypes, and inheritance.",
        difficulty: "intermediate",
        questions: [
          {
            question: "What does `Object.create(proto)` do?",
            options: [
              "Creates a copy of proto",
              "Creates a new object with proto as its prototype",
              "Deletes all properties from proto",
              "Freezes the proto object",
            ],
            answer: "Creates a new object with proto as its prototype",
            explanation: "`Object.create()` creates a new, empty object and sets its internal `[[Prototype]]` to the given object.",
            difficulty: "intermediate",
          },
          {
            question: "What is the output of `{} === {}`?",
            options: ["true", "false", "TypeError", "undefined"],
            answer: "false",
            explanation: "Objects are compared by reference, not by value. Two separate object literals create two different references in memory.",
            difficulty: "beginner",
          },
          {
            question: "What does `Object.freeze()` do?",
            options: [
              "Makes an object deeply immutable",
              "Prevents adding/removing/modifying top-level properties",
              "Deletes all object properties",
              "Converts object to a primitive",
            ],
            answer: "Prevents adding/removing/modifying top-level properties",
            explanation: "`Object.freeze()` is shallow — it only freezes the top-level properties. Nested objects can still be modified.",
            difficulty: "intermediate",
          },
          {
            question: "What keyword is required in a child class constructor before using `this`?",
            options: ["this", "super", "parent", "extends"],
            answer: "super",
            explanation: "In a derived class constructor, `super()` must be called before accessing `this`. It invokes the parent class constructor.",
            difficulty: "beginner",
          },
          {
            question: "What does the `in` operator check?",
            options: [
              "Only own properties",
              "Own and inherited properties",
              "Only enumerable properties",
              "Only methods",
            ],
            answer: "Own and inherited properties",
            explanation: "The `in` operator checks the entire prototype chain. Use `hasOwnProperty()` or `Object.hasOwn()` to check only own properties.",
            difficulty: "intermediate",
          },
          {
            question: "What is `__proto__`?",
            options: [
              "A method to create objects",
              "A deprecated accessor for an object's prototype",
              "A constructor function",
              "A static class method",
            ],
            answer: "A deprecated accessor for an object's prototype",
            explanation: "`__proto__` is the legacy way to access/set an object's prototype. Use `Object.getPrototypeOf()` and `Object.setPrototypeOf()` instead.",
            difficulty: "intermediate",
          },
          {
            question: "What does `Object.keys(obj)` return?",
            options: [
              "All properties including inherited ones",
              "Only own enumerable string-keyed properties",
              "All own properties including non-enumerable",
              "Only Symbol-keyed properties",
            ],
            answer: "Only own enumerable string-keyed properties",
            explanation: "`Object.keys()` returns an array of own enumerable string-keyed property names. Use `Object.getOwnPropertyNames()` for non-enumerable properties too.",
            difficulty: "intermediate",
          },
          {
            question: "What is optional chaining (`?.`) used for?",
            options: [
              "Creating optional parameters",
              "Safely accessing nested properties that may be null/undefined",
              "Declaring optional variables",
              "Chaining promises",
            ],
            answer: "Safely accessing nested properties that may be null/undefined",
            explanation: "`obj?.prop` returns `undefined` instead of throwing if `obj` is null or undefined. It short-circuits the entire chain.",
            difficulty: "beginner",
          },
          {
            question: "What is the difference between `Object.assign()` and spread `{...obj}`?",
            options: [
              "No practical difference for simple objects",
              "Spread is deep, assign is shallow",
              "Assign is deep, spread is shallow",
              "Spread cannot copy methods",
            ],
            answer: "No practical difference for simple objects",
            explanation: "Both perform shallow copies. Minor difference: `Object.assign()` triggers setters on the target, spread does not. For most use cases, they're interchangeable.",
            difficulty: "advanced",
          },
          {
            question: "What does `class` in JavaScript actually create?",
            options: [
              "A new type of object",
              "A constructor function with prototype methods (syntactic sugar)",
              "An immutable blueprint",
              "A native class like in Java/C++",
            ],
            answer: "A constructor function with prototype methods (syntactic sugar)",
            explanation: "ES6 `class` is syntactic sugar over JavaScript's existing prototype-based inheritance. Under the hood, it creates a constructor function and sets up the prototype chain.",
            difficulty: "intermediate",
          },
        ],
      },
    ],
    interviews: [
      {
        question: "Explain prototypal inheritance in JavaScript.",
        answer:
          "JavaScript uses prototypal inheritance — objects can inherit from other objects. Every object has an internal `[[Prototype]]` reference to another object (its prototype). When accessing a property, JavaScript first checks the object itself, then walks up the prototype chain until it finds the property or reaches `null`. `Object.create(proto)` creates a new object with `proto` as its prototype. ES6 `class` is syntactic sugar that sets up the same prototype chain internally.",
        difficulty: "intermediate",
        tags: ["prototypes", "inheritance", "OOP"],
        companyFrequency: 90,
      },
      {
        question: "What is the difference between `Object.create()` and `new`?",
        answer:
          "`new Constructor()` creates a new object, sets its prototype to `Constructor.prototype`, calls the constructor function with `this` bound to the new object, and returns it. `Object.create(proto)` simply creates a new empty object with `proto` as its prototype — no constructor is called. `Object.create(null)` creates an object with no prototype at all (no `toString`, `hasOwnProperty`, etc.), useful for pure dictionary/map objects.",
        difficulty: "advanced",
        tags: ["Object.create", "new", "constructors"],
        companyFrequency: 70,
      },
      {
        question: "How do you make an object truly immutable?",
        answer:
          "`Object.freeze()` prevents modifications to an object's own properties, but it's shallow — nested objects remain mutable. For deep immutability: 1) Recursively freeze all nested objects. 2) Use a library like Immer for immutable state management. 3) Use `Object.freeze()` + recursive helper. Note: `Object.seal()` prevents adding/removing properties but allows modification of existing ones. `Object.preventExtensions()` only prevents adding new properties.",
        difficulty: "intermediate",
        tags: ["immutability", "freeze", "seal"],
        companyFrequency: 65,
      },
    ],
  },

  // ──────────────────────────────────────────
  // TOPIC 5: Async JavaScript
  // ──────────────────────────────────────────
  {
    slug: "async-javascript",
    technology: "javascript",
    title: "Async JavaScript",
    description:
      "Master asynchronous programming with callbacks, Promises, async/await, and the event loop.",
    difficulty: "intermediate",
    estimatedTime: 90,
    prerequisites: ["functions", "objects-and-prototypes"],
    nextTopics: ["error-handling", "dom-manipulation"],
    content: {
      overview:
        "JavaScript is single-threaded but non-blocking, thanks to the event loop. Asynchronous operations (network requests, timers, file I/O) don't block the main thread. The evolution of async patterns: callbacks → Promises → async/await. Promises represent a value that may be available now, later, or never. `async/await` is syntactic sugar over Promises that makes asynchronous code look synchronous.",
      syntax: `// Callbacks (legacy pattern)
setTimeout(() => console.log("Done"), 1000);

// Promises
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve("data"), 1000);
});
fetchData().then(data => console.log(data)).catch(err => console.error(err));

// async/await (modern)
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// Promise combinators
Promise.all([p1, p2, p3]);        // Wait for ALL
Promise.allSettled([p1, p2, p3]); // Wait for ALL, never rejects
Promise.race([p1, p2, p3]);      // First to settle
Promise.any([p1, p2, p3]);       // First to fulfill`,
      explanation:
        "The event loop has a call stack, task queue (macrotasks), and microtask queue. When the call stack is empty, microtasks (Promise callbacks, queueMicrotask) run first, then macrotasks (setTimeout, setInterval, I/O). This is why `Promise.resolve().then(...)` always runs before `setTimeout(..., 0)`. `async` functions always return a Promise. `await` pauses execution of the async function until the Promise settles, but does NOT block the main thread — other code continues running.",
      bestPractices: [
        "Always use `async/await` over `.then()` chains for readability.",
        "Always wrap `await` calls in try/catch for error handling.",
        "Use `Promise.all()` for parallel requests instead of sequential `await`s.",
        "Use `Promise.allSettled()` when you need all results regardless of individual failures.",
        "Avoid mixing callbacks and Promises — convert callbacks to Promises with `util.promisify` or manual wrapping.",
      ],
      commonMistakes: [
        "Forgetting to `await` a Promise — you get a Promise object instead of the resolved value.",
        "Using `await` in a `forEach` loop — it doesn't wait for each iteration. Use `for...of` instead.",
        "Not handling rejected Promises — unhandled rejections can crash Node.js processes.",
        "Creating unnecessary sequential `await`s when requests could run in parallel with `Promise.all()`.",
        "Assuming `async` functions return the value directly — they always return a Promise.",
      ],
    },
    examples: [
      {
        title: "Sequential vs Parallel Execution",
        code: `const delay = (ms, val) =>
  new Promise(resolve => setTimeout(() => resolve(val), ms));

// Sequential — 3 seconds total
async function sequential() {
  const a = await delay(1000, "A");
  const b = await delay(1000, "B");
  const c = await delay(1000, "C");
  return [a, b, c];
}

// Parallel — 1 second total
async function parallel() {
  const [a, b, c] = await Promise.all([
    delay(1000, "A"),
    delay(1000, "B"),
    delay(1000, "C"),
  ]);
  return [a, b, c];
}

console.log(await parallel());`,
        output: '["A", "B", "C"]',
        explanation:
          "Sequential `await`s run one after another (3s total). `Promise.all()` runs all three in parallel (1s total). Always use `Promise.all()` when tasks are independent.",
      },
      {
        title: "Event Loop — Microtask vs Macrotask Order",
        code: `console.log("1: Synchronous");

setTimeout(() => console.log("2: Macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3: Microtask (Promise)"));

queueMicrotask(() => console.log("4: Microtask (queueMicrotask)"));

console.log("5: Synchronous");`,
        output: `1: Synchronous
5: Synchronous
3: Microtask (Promise)
4: Microtask (queueMicrotask)
2: Macrotask (setTimeout)`,
        explanation:
          "Synchronous code runs first (1, 5). Then microtasks (3, 4) run because the microtask queue is processed before the macrotask queue. Finally, the setTimeout macrotask (2) runs.",
      },
      {
        title: "Error Handling with async/await",
        code: `async function fetchUser(id) {
  if (id < 0) throw new Error("Invalid ID");
  return { id, name: "User " + id };
}

async function main() {
  // Individual try/catch
  try {
    const user = await fetchUser(-1);
  } catch (err) {
    console.log("Caught:", err.message);
  }

  // Promise.allSettled for resilient fetching
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(-2),
    fetchUser(3),
  ]);

  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      console.log(\`User \${i}: \${r.value.name}\`);
    } else {
      console.log(\`User \${i}: FAILED - \${r.reason.message}\`);
    }
  });
}

await main();`,
        output: `Caught: Invalid ID
User 0: User 1
User 1: FAILED - Invalid ID
User 2: User 3`,
        explanation:
          "`Promise.allSettled` never rejects — it returns the status of each Promise. This is ideal when you want all results regardless of individual failures.",
      },
    ],
    challenges: [
      {
        title: "Implement a Retry Mechanism",
        description:
          "Create a function `retry(fn, retries = 3, delay = 1000)` that retries a failed async function up to `retries` times with a delay between attempts. It should throw the last error if all retries fail.",
        difficulty: "intermediate",
        hints: [
          "Use a for loop with try/catch inside an async function",
          "Use a Promise with setTimeout for the delay",
          "Re-throw the error only after all retries are exhausted",
        ],
        solution: `async function retry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, delay));
      console.log(\`Retry \${i + 1}/\${retries}...\`);
    }
  }
}

let attempt = 0;
const flaky = async () => {
  attempt++;
  if (attempt < 3) throw new Error("Fail " + attempt);
  return "Success on attempt " + attempt;
};

console.log(await retry(flaky, 3, 100));`,
        expectedOutput: `Retry 1/3...
Retry 2/3...
Success on attempt 3`,
      },
      {
        title: "Implement Promise.all from Scratch",
        description:
          "Create a function `promiseAll(promises)` that behaves like `Promise.all()`. It should resolve when all promises resolve (with an array of results in order) and reject immediately when any promise rejects.",
        difficulty: "advanced",
        hints: [
          "Return a new Promise",
          "Track the number of resolved promises",
          "Store results in an array by index (not push) to maintain order",
          "Handle the edge case of an empty array",
        ],
        solution: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const results = new Array(promises.length);
    let resolved = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(value => {
          results[i] = value;
          resolved++;
          if (resolved === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}

const result = await promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]);
console.log(result);`,
        expectedOutput: "[1, 2, 3]",
      },
    ],
    quizzes: [
      {
        title: "Async JavaScript Quiz",
        description: "Test your understanding of asynchronous JavaScript patterns.",
        difficulty: "intermediate",
        questions: [
          {
            question: "What does `async` before a function do?",
            options: [
              "Makes the function run on a separate thread",
              "Makes the function always return a Promise",
              "Makes the function run faster",
              "Prevents the function from throwing errors",
            ],
            answer: "Makes the function always return a Promise",
            explanation: "An `async` function always returns a Promise. If the return value is not a Promise, it's automatically wrapped in `Promise.resolve()`.",
            difficulty: "beginner",
          },
          {
            question: "What runs first: `setTimeout(() => {}, 0)` or `Promise.resolve().then(() => {})`?",
            options: ["setTimeout", "Promise.then", "They run simultaneously", "It's random"],
            answer: "Promise.then",
            explanation: "Promise callbacks are microtasks, which run before macrotasks (setTimeout). The microtask queue is drained completely before processing the next macrotask.",
            difficulty: "intermediate",
          },
          {
            question: "What does `Promise.allSettled()` return?",
            options: [
              "Only fulfilled results",
              "Only rejected results",
              "An array of objects with status, value/reason for each Promise",
              "A single combined value",
            ],
            answer: "An array of objects with status, value/reason for each Promise",
            explanation: "`Promise.allSettled` waits for all Promises and returns `{status, value}` for fulfilled and `{status, reason}` for rejected Promises.",
            difficulty: "intermediate",
          },
          {
            question: "What happens if you `await` in a `forEach` loop?",
            options: [
              "Each iteration waits for the previous one",
              "All iterations run in parallel (forEach doesn't respect await)",
              "The loop throws an error",
              "forEach is automatically converted to for...of",
            ],
            answer: "All iterations run in parallel (forEach doesn't respect await)",
            explanation: "`forEach` does not await the callback. Use `for...of` for sequential async iteration, or `Promise.all()` with `map()` for parallel.",
            difficulty: "advanced",
          },
          {
            question: "What is the event loop?",
            options: [
              "A loop that runs every second",
              "The mechanism that handles async operations by checking the call stack and task queues",
              "A loop that iterates over events in the DOM",
              "A Node.js-only feature",
            ],
            answer: "The mechanism that handles async operations by checking the call stack and task queues",
            explanation: "The event loop continuously checks: is the call stack empty? If yes, process microtasks first, then pick the next macrotask from the queue.",
            difficulty: "intermediate",
          },
          {
            question: "What does `Promise.race()` return?",
            options: [
              "The fastest Promise's result",
              "All results as an array",
              "The result of the first Promise to settle (fulfill or reject)",
              "Always the fulfilled result",
            ],
            answer: "The result of the first Promise to settle (fulfill or reject)",
            explanation: "`Promise.race` returns the result of whichever Promise settles first — whether fulfilled or rejected. Use `Promise.any()` if you only want the first fulfillment.",
            difficulty: "intermediate",
          },
          {
            question: "How do you handle errors in async/await?",
            options: [
              "Use .catch() only",
              "Use try/catch blocks",
              "Errors are automatically caught",
              "Use error callbacks",
            ],
            answer: "Use try/catch blocks",
            explanation: "Wrap `await` calls in `try/catch` blocks to handle rejections. You can also add `.catch()` to the async function call itself.",
            difficulty: "beginner",
          },
          {
            question: "What does `Promise.any()` do?",
            options: [
              "Resolves when any Promise settles",
              "Resolves with the first fulfilled Promise; rejects only if ALL reject",
              "Returns all Promises that resolved",
              "Same as Promise.race()",
            ],
            answer: "Resolves with the first fulfilled Promise; rejects only if ALL reject",
            explanation: "`Promise.any()` ignores rejections and resolves with the first fulfilled Promise. It only rejects with an `AggregateError` if ALL Promises reject.",
            difficulty: "intermediate",
          },
          {
            question: "What is callback hell?",
            options: [
              "Too many function parameters",
              "Deeply nested callbacks making code unreadable and hard to maintain",
              "Callbacks that throw errors",
              "Using callbacks in production code",
            ],
            answer: "Deeply nested callbacks making code unreadable and hard to maintain",
            explanation: "Callback hell occurs when multiple async operations are nested inside each other, creating a 'pyramid of doom'. Promises and async/await solve this problem.",
            difficulty: "beginner",
          },
          {
            question: "What is the difference between `then/catch` and `try/catch` with async/await?",
            options: [
              "They're completely different mechanisms",
              "They're equivalent — async/await is syntactic sugar over Promises",
              "try/catch is faster",
              "then/catch is deprecated",
            ],
            answer: "They're equivalent — async/await is syntactic sugar over Promises",
            explanation: "`async/await` compiles to Promise chains. `try/catch` with `await` is equivalent to `.then().catch()`. The choice is stylistic — async/await is generally more readable.",
            difficulty: "intermediate",
          },
        ],
      },
    ],
    interviews: [
      {
        question: "Explain the JavaScript event loop.",
        answer:
          "JavaScript is single-threaded with an event loop that enables non-blocking I/O. Components: 1) Call Stack — executes synchronous code. 2) Web APIs / Node APIs — handle async operations (timers, HTTP, I/O). 3) Microtask Queue — holds Promise callbacks, MutationObserver, queueMicrotask. 4) Macrotask Queue — holds setTimeout, setInterval, I/O callbacks. Order: call stack empties → all microtasks run → one macrotask runs → repeat. This is why Promise.then runs before setTimeout even with 0ms delay.",
        difficulty: "intermediate",
        tags: ["event-loop", "async", "microtasks"],
        companyFrequency: 95,
      },
      {
        question: "What is the difference between Promise.all, Promise.allSettled, Promise.race, and Promise.any?",
        answer:
          "`Promise.all`: Resolves when ALL fulfill, rejects immediately if ANY rejects. Use for dependent parallel tasks. `Promise.allSettled`: Waits for ALL to settle regardless of outcome. Returns `{status, value/reason}` for each. Use when you need all results. `Promise.race`: Settles with the first Promise to settle (fulfill OR reject). Use for timeouts. `Promise.any`: Resolves with the first to FULFILL, ignoring rejections. Only rejects if ALL reject with AggregateError. Use for redundant sources.",
        difficulty: "intermediate",
        tags: ["Promise", "combinators", "parallel"],
        companyFrequency: 85,
      },
      {
        question: "Why is `await` inside `forEach` a common bug? How do you fix it?",
        answer:
          "`forEach` does not respect async callbacks — it fires all iterations immediately without waiting. The callback returns a Promise, but `forEach` ignores it. Fix: For sequential execution, use `for...of`: `for (const item of items) { await process(item); }`. For parallel execution, use `Promise.all` with `map`: `await Promise.all(items.map(item => process(item)))`. Never use `await` inside `forEach`, `map`, `filter`, or `reduce` expecting sequential behavior.",
        difficulty: "intermediate",
        tags: ["async", "forEach", "iteration"],
        companyFrequency: 80,
      },
    ],
  },

  // ──────────────────────────────────────────
  // TOPIC 6: Error Handling
  // ──────────────────────────────────────────
  {
    slug: "error-handling",
    technology: "javascript",
    title: "Error Handling",
    description:
      "Learn robust error handling with try/catch/finally, custom error classes, and error boundaries.",
    difficulty: "intermediate",
    estimatedTime: 45,
    prerequisites: ["functions", "async-javascript"],
    nextTopics: ["dom-manipulation", "modules-and-bundlers"],
    content: {
      overview:
        "Error handling is critical for building robust applications. JavaScript provides `try...catch...finally` for synchronous error handling, and Promise `.catch()` or `try/catch` with `async/await` for asynchronous errors. Custom error classes extend the built-in `Error` class to create domain-specific errors with additional context.",
      syntax: `// Basic try/catch/finally
try {
  riskyOperation();
} catch (error) {
  console.error(error.message);
} finally {
  cleanup(); // Always runs
}

// Custom Error Class
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

// Throwing errors
throw new Error("Something went wrong");
throw new ValidationError("email", "Invalid email format");

// Error types
TypeError   // Wrong type
ReferenceError // Undefined variable
SyntaxError   // Invalid syntax
RangeError    // Value out of range`,
      explanation:
        "The `catch` block receives the error object, which has `message`, `name`, and `stack` properties. `finally` always executes regardless of whether an error occurred — use it for cleanup (closing connections, freeing resources). Custom errors should extend `Error` and set `this.name`. In production, use error monitoring services (Sentry, Datadog) to track errors. In React, Error Boundaries catch rendering errors in the component tree.",
      bestPractices: [
        "Always provide meaningful error messages that help with debugging.",
        "Create custom error classes for different error categories (ValidationError, NotFoundError, AuthError).",
        "Never swallow errors silently — at minimum, log them.",
        "Use `finally` for cleanup operations (closing DB connections, clearing intervals).",
        "In Node.js, always handle `unhandledRejection` and `uncaughtException` events.",
      ],
      commonMistakes: [
        "Catching errors without logging or re-throwing — hides bugs.",
        "Using generic `catch(e)` without inspecting the error type.",
        "Forgetting to set `this.name` in custom error classes.",
        "Not handling async errors — unhandled Promise rejections crash Node.js.",
        "Using try/catch around non-throwing code — unnecessary overhead.",
      ],
    },
    examples: [
      {
        title: "Custom Error Hierarchy",
        code: `class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(\`\${resource} not found\`, 404);
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super(\`Validation failed: \${field} - \${message}\`, 400);
    this.field = field;
  }
}

try {
  throw new NotFoundError("User");
} catch (err) {
  if (err instanceof NotFoundError) {
    console.log(\`\${err.statusCode}: \${err.message}\`);
  }
}`,
        output: "404: User not found",
        explanation:
          "A custom error hierarchy lets you create domain-specific errors with additional metadata like HTTP status codes. Using `instanceof` lets you handle different error types differently.",
      },
    ],
    challenges: [
      {
        title: "Build a Result Type",
        description:
          "Create a `Result` class that wraps either a success value or an error, similar to Rust's Result type. Implement `ok(value)`, `err(error)`, `isOk()`, `isErr()`, `unwrap()` (throws if error), and `map(fn)` (transforms success value).",
        difficulty: "intermediate",
        hints: [
          "Use a class with a private success flag and value/error properties",
          "unwrap() should throw if the Result is an error",
          "map() should only transform the value if it's a success",
        ],
        solution: `class Result {
  #ok; #value; #error;
  constructor(ok, value, error) {
    this.#ok = ok;
    this.#value = value;
    this.#error = error;
  }
  static ok(value) { return new Result(true, value, null); }
  static err(error) { return new Result(false, null, error); }
  isOk() { return this.#ok; }
  isErr() { return !this.#ok; }
  unwrap() {
    if (!this.#ok) throw this.#error;
    return this.#value;
  }
  map(fn) {
    if (!this.#ok) return this;
    return Result.ok(fn(this.#value));
  }
}

const success = Result.ok(42).map(x => x * 2);
console.log(success.unwrap());

const failure = Result.err(new Error("oops"));
console.log(failure.isErr());`,
        expectedOutput: `84
true`,
      },
    ],
    quizzes: [
      {
        title: "Error Handling Quiz",
        description: "Test your knowledge of JavaScript error handling patterns.",
        difficulty: "intermediate",
        questions: [
          {
            question: "When does the `finally` block execute?",
            options: ["Only when an error occurs", "Only when no error occurs", "Always, regardless of errors", "Only in async functions"],
            answer: "Always, regardless of errors",
            explanation: "`finally` always executes after `try` and `catch`, whether an error was thrown or not. It's ideal for cleanup operations.",
            difficulty: "beginner",
          },
          {
            question: "What property does every Error object have?",
            options: ["code", "message", "type", "level"],
            answer: "message",
            explanation: "All Error objects have `message`, `name`, and `stack` properties. `message` is the human-readable error description.",
            difficulty: "beginner",
          },
          {
            question: "What happens with an unhandled Promise rejection in Node.js?",
            options: ["Nothing", "It logs a warning", "It can crash the process", "It retries automatically"],
            answer: "It can crash the process",
            explanation: "Starting from Node.js 15, unhandled Promise rejections throw an error and can crash the process. Always handle rejections.",
            difficulty: "intermediate",
          },
          {
            question: "How do you check the type of an error in a catch block?",
            options: ["typeof error", "error instanceof ErrorType", "error.type", "error === ErrorType"],
            answer: "error instanceof ErrorType",
            explanation: "Use `instanceof` to check if an error is an instance of a specific error class in the hierarchy.",
            difficulty: "beginner",
          },
          {
            question: "What does `throw` do?",
            options: ["Logs an error", "Stops execution and propagates the error to the nearest catch", "Sends an error to the server", "Creates a new Error object"],
            answer: "Stops execution and propagates the error to the nearest catch",
            explanation: "`throw` stops the current execution and propagates up the call stack until a `catch` block handles it. If unhandled, it crashes the program.",
            difficulty: "beginner",
          },
          {
            question: "Can you throw non-Error values in JavaScript?",
            options: ["No, only Error objects", "Yes, you can throw any value", "Only strings", "Only objects"],
            answer: "Yes, you can throw any value",
            explanation: "You can `throw` any value (string, number, object), but you should always throw Error objects because they include a stack trace.",
            difficulty: "intermediate",
          },
          {
            question: "What is the purpose of `Error.captureStackTrace()`?",
            options: ["Captures a screenshot", "Creates a custom stack trace for custom error classes", "Logs the error", "Prevents stack overflow"],
            answer: "Creates a custom stack trace for custom error classes",
            explanation: "`Error.captureStackTrace()` (V8-specific) creates a clean stack trace starting from the custom error constructor, hiding internal implementation details.",
            difficulty: "advanced",
          },
          {
            question: "What is the best practice for error messages?",
            options: ["Keep them vague for security", "Make them descriptive with context", "Use error codes only", "Don't include messages"],
            answer: "Make them descriptive with context",
            explanation: "Error messages should clearly describe what went wrong and provide context for debugging. In production, be careful not to expose sensitive data in client-facing messages.",
            difficulty: "beginner",
          },
          {
            question: "What is an Error Boundary in React?",
            options: ["A CSS border around errors", "A component that catches rendering errors in its child tree", "A try/catch for event handlers", "A network error handler"],
            answer: "A component that catches rendering errors in its child tree",
            explanation: "Error Boundaries are React class components that implement `componentDidCatch` and `getDerivedStateFromError` to catch and handle errors during rendering.",
            difficulty: "intermediate",
          },
          {
            question: "Should you catch ALL errors at the top level?",
            options: ["Yes, always", "No — catch errors at the level where you can meaningfully handle them", "Only in production", "Only async errors"],
            answer: "No — catch errors at the level where you can meaningfully handle them",
            explanation: "Catch errors where you can take appropriate action (retry, fallback, user message). A top-level catch is useful for logging/monitoring, but not for handling all errors.",
            difficulty: "intermediate",
          },
        ],
      },
    ],
    interviews: [
      {
        question: "How do you implement a global error handler in a Node.js application?",
        answer:
          "In Node.js, listen to `process.on('uncaughtException', handler)` for sync errors and `process.on('unhandledRejection', handler)` for unhandled Promise rejections. In Express, use error-handling middleware: `app.use((err, req, res, next) => {...})`. In production, integrate error monitoring (Sentry, Datadog) to capture and track errors. Always log errors with stack traces and relevant context (request ID, user ID, input data).",
        difficulty: "intermediate",
        tags: ["error-handling", "node", "production"],
        companyFrequency: 80,
      },
      {
        question: "When should you use custom error classes?",
        answer:
          "Use custom error classes when you need: 1) Domain-specific errors (ValidationError, NotFoundError, AuthError) with additional properties (statusCode, field, errorCode). 2) Type-safe error handling with `instanceof` checks. 3) Consistent error formatting across the application. 4) HTTP-aware errors in APIs (`class HttpError extends Error { statusCode: number }`). Extend the built-in `Error` class and always set `this.name = this.constructor.name` for proper error identification.",
        difficulty: "intermediate",
        tags: ["custom-errors", "error-classes", "patterns"],
        companyFrequency: 70,
      },
    ],
  },
];

// ─── SEED FUNCTION ───────────────────────────────────────────────────────

async function seedTopics() {
  console.log("🚀 Starting topic seeding...\n");

  for (const topicData of jsTopics) {
    const { content, examples, challenges, quizzes, interviews, ...topicFields } = topicData;

    console.log(`📝 Seeding: ${topicFields.title} (${topicFields.technology}/${topicFields.slug})`);

    try {
      // 1. Upsert Topic
      const topic = await prisma.topic.upsert({
        where: { slug: topicFields.slug },
        update: {
          technology: topicFields.technology,
          title: topicFields.title,
          description: topicFields.description,
          difficulty: topicFields.difficulty,
          estimatedTime: topicFields.estimatedTime,
          prerequisites: topicFields.prerequisites,
          nextTopics: topicFields.nextTopics,
        },
        create: {
          slug: topicFields.slug,
          technology: topicFields.technology,
          title: topicFields.title,
          description: topicFields.description,
          difficulty: topicFields.difficulty,
          estimatedTime: topicFields.estimatedTime,
          prerequisites: topicFields.prerequisites,
          nextTopics: topicFields.nextTopics,
        },
      });

      // 2. Upsert TopicContent
      if (content) {
        await prisma.topicContent.upsert({
          where: { topicId: topic.id },
          update: {
            overview: content.overview,
            syntax: content.syntax,
            explanation: content.explanation,
            bestPractices: content.bestPractices,
            commonMistakes: content.commonMistakes,
          },
          create: {
            topicId: topic.id,
            overview: content.overview,
            syntax: content.syntax,
            explanation: content.explanation,
            bestPractices: content.bestPractices,
            commonMistakes: content.commonMistakes,
          },
        });
        console.log("   ✅ Content saved");
      }

      // 3. Recreate Examples
      if (examples && examples.length > 0) {
        await prisma.topicExample.deleteMany({ where: { topicId: topic.id } });
        await prisma.topicExample.createMany({
          data: examples.map((ex) => ({
            topicId: topic.id,
            title: ex.title,
            code: ex.code,
            output: ex.output,
            explanation: ex.explanation,
          })),
        });
        console.log(`   ✅ ${examples.length} examples saved`);
      }

      // 4. Recreate Challenges
      if (challenges && challenges.length > 0) {
        await prisma.challenge.deleteMany({ where: { topicId: topic.id } });
        await prisma.challenge.createMany({
          data: challenges.map((ch) => ({
            topicId: topic.id,
            title: ch.title,
            description: ch.description,
            difficulty: ch.difficulty,
            solution: ch.solution,
            hints: ch.hints,
            expectedOutput: ch.expectedOutput,
          })),
        });
        console.log(`   ✅ ${challenges.length} challenges saved`);
      }

      // 5. Recreate Quizzes with Questions
      if (quizzes && quizzes.length > 0) {
        // Delete existing quizzes for this topic
        const existingQuizzes = await prisma.quiz.findMany({
          where: { topicId: topic.id },
          select: { id: true },
        });
        for (const eq of existingQuizzes) {
          await prisma.question.deleteMany({ where: { quizId: eq.id } });
        }
        await prisma.quiz.deleteMany({ where: { topicId: topic.id } });

        for (const q of quizzes) {
          const quiz = await prisma.quiz.create({
            data: {
              title: q.title,
              description: q.description,
              difficulty: q.difficulty,
              topicId: topic.id,
            },
          });

          if (q.questions && q.questions.length > 0) {
            await prisma.question.createMany({
              data: q.questions.map((qn) => ({
                quizId: quiz.id,
                question: qn.question,
                options: qn.options,
                answer: qn.answer,
                explanation: qn.explanation,
                difficulty: qn.difficulty,
              })),
            });
          }
          console.log(`   ✅ Quiz "${q.title}" with ${q.questions?.length || 0} questions saved`);
        }
      }

      // 6. Recreate Interview Questions
      if (interviews && interviews.length > 0) {
        await prisma.interviewQuestion.deleteMany({ where: { topicId: topic.id } });
        await prisma.interviewQuestion.createMany({
          data: interviews.map((iq) => ({
            topicId: topic.id,
            question: iq.question,
            answer: iq.answer,
            difficulty: iq.difficulty,
            tags: iq.tags,
            companyFrequency: iq.companyFrequency,
          })),
        });
        console.log(`   ✅ ${interviews.length} interview questions saved`);
      }

      console.log(`   ✨ Done: ${topicFields.title}\n`);
    } catch (error) {
      console.error(`   ❌ Error seeding ${topicFields.title}:`, error);
    }
  }

  console.log("🎉 Seeding complete!");
}

seedTopics()
  .catch((e) => {
    console.error("Fatal seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
