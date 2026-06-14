"use strict";exports.id=7961,exports.ids=[7961],exports.modules={77961:(e,a,n)=>{n.r(a),n.d(a,{pythonNotes:()=>o});let o=[{id:"py-comprehensions",title:"Chapter 1: List and Dictionary Comprehensions",content:"Python provides a concise syntax for creating lists and dictionaries based on existing iterables. They are more readable and run faster than standard appends inside loops.",codeSnippet:{code:`# Standard loop approach
squares = []
for x in range(10):
    squares.append(x**2)

# List Comprehension approach
squares_comp = [x**2 for x in range(10)]

# Conditional comprehension
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Dictionary Comprehension
square_dict = {x: x**2 for x in range(5)} # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}`,language:"python"},summary:"Comprehensions combine filtering (if) and mapping (expression) into a single line of python code.",quizQuestions:[{id:"py-comp-q1",question:"What is the output of [x**2 for x in range(4)]?",options:["[0, 1, 4, 9]","[1, 4, 9, 16]","[0, 1, 2, 3]","[2, 4, 6, 8]"],correctIndex:0,explanation:"range(4) produces 0, 1, 2, 3. Squaring each gives [0, 1, 4, 9]."},{id:"py-comp-q2",question:"Which syntax creates a dictionary comprehension?",options:["{x: x**2 for x in range(5)}","[x: x**2 for x in range(5)]","(x: x**2 for x in range(5))","<x: x**2 for x in range(5)>"],correctIndex:0,explanation:"Dictionary comprehensions use curly braces with key:value pairs before the for clause."},{id:"py-comp-q3",question:"What advantage do comprehensions have over traditional for-loops with append?",options:["They are always slower but more readable","They are more concise and typically faster","They can only work with strings","They mutate the original list in place"],correctIndex:1,explanation:"Comprehensions are optimized at the C level in CPython and produce cleaner, more Pythonic code."},{id:"py-comp-q4",question:"How do you filter elements in a list comprehension?",options:["Add a filter() call after the comprehension","Use an if clause at the end: [x for x in items if condition]","Use a while loop inside brackets","Comprehensions cannot filter"],correctIndex:1,explanation:"Conditional comprehensions append an if clause after the for loop to filter elements."}]},{id:"py-args",title:"Chapter 2: Dynamic Arguments - *args and **kwargs",content:"In Python, functions can accept arbitrary numbers of arguments using *args (positional arguments as a tuple) and **kwargs (keyword arguments as a dictionary).",codeSnippet:{code:`def print_details(*args, **kwargs):
    print("Positional args tuple:", args)
    print("Keyword args dict:", kwargs)

# Call function
print_details("Apple", "Banana", color="yellow", stock=45)
# Outputs:
# Positional args tuple: ('Apple', 'Banana')
# Keyword args dict: {'color': 'yellow', 'stock': 45}`,language:"python"},summary:"*args allows passing dynamic arguments without naming them, and **kwargs allows passing named configuration flags dynamically.",quizQuestions:[{id:"py-args-q1",question:"What data type does *args collect positional arguments into?",options:["A list","A tuple","A dictionary","A set"],correctIndex:1,explanation:"*args gathers extra positional arguments into a tuple inside the function."},{id:"py-args-q2",question:"What data type does **kwargs collect keyword arguments into?",options:["A list","A tuple","A dictionary","A namedtuple"],correctIndex:2,explanation:"**kwargs collects keyword arguments as key-value pairs in a dictionary."},{id:"py-args-q3",question:"In def func(a, *args, b=10, **kwargs), which parameter must be passed by keyword?",options:["a","args","b","kwargs"],correctIndex:2,explanation:"Parameters after *args are keyword-only in Python 3. Parameter b must be passed as b=value."}]}]}};