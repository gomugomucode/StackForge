import type { TechResourceData } from './types'

export const pythonResourceData: TechResourceData = {
  sections: [
    {
      id: 'official-docs',
      title: 'Official Documentation',
      description: 'Primary references from the Python Software Foundation.',
      icon: 'BookOpen',
      resources: [
        { title: 'Python Official Docs', url: 'https://docs.python.org/3/', description: 'Complete Python 3 language reference, tutorials, and library documentation maintained by the PSF.', type: 'free', difficulty: 'Beginner', badge: 'Official' },
        { title: 'Python Tutorial (Official)', url: 'https://docs.python.org/3/tutorial/', description: 'The official beginner\'s guide from python.org — covers basics through modules, I/O, and exceptions.', type: 'free', difficulty: 'Beginner', badge: 'Official' },
        { title: 'PEP Index', url: 'https://peps.python.org/', description: 'Python Enhancement Proposals — how Python\'s language features are designed and proposed.', type: 'free', difficulty: 'Advanced', badge: 'Official' },
        { title: 'Real Python', url: 'https://realpython.com/', description: 'High-quality tutorials, articles, and courses covering every Python topic from basics to advanced.', type: 'freemium', difficulty: 'Beginner', badge: 'Best Rated' },
      ],
    },
    {
      id: 'books',
      title: 'Books',
      description: 'Authoritative texts for learning Python from fundamentals to professional levels.',
      icon: 'Library',
      resources: [
        { title: 'Python Crash Course', url: 'https://nostarch.com/python-crash-course-3rd-edition', description: 'The most popular Python beginners book. Hands-on with real projects: games, data visualizations, and web apps.', type: 'paid', difficulty: 'Beginner', badge: 'Best Rated', author: 'Eric Matthes', estimatedHours: 35 },
        { title: 'Fluent Python', url: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/', description: 'Takes you from intermediate to expert. Covers Python\'s data model, iterators, decorators, concurrency, and metaprogramming.', type: 'paid', difficulty: 'Advanced', badge: 'Must Read', author: 'Luciano Ramalho', estimatedHours: 50 },
        { title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', description: 'Free online book — learn Python by automating real tasks: Excel, PDFs, emails, web scraping.', type: 'free', difficulty: 'Beginner', badge: 'Community Pick', author: 'Al Sweigart', estimatedHours: 25 },
        { title: 'Python Cookbook', url: 'https://www.oreilly.com/library/view/python-cookbook-3rd/9781449357337/', description: 'Practical recipes for common Python programming tasks — data structures, algorithms, files, networking.', type: 'paid', difficulty: 'Intermediate', author: 'David Beazley', estimatedHours: 30 },
      ],
    },
    {
      id: 'video-courses',
      title: 'Video Courses',
      description: 'Structured video learning for Python development.',
      icon: 'PlayCircle',
      resources: [
        { title: '100 Days of Code — Python Bootcamp', url: 'https://www.udemy.com/course/100-days-of-code/', description: 'Angela Yu\'s flagship course — 100 projects in 100 days covering web dev, data science, automation, and more.', type: 'paid', difficulty: 'Beginner', badge: 'Best Rated', author: 'Angela Yu', estimatedHours: 60 },
        { title: 'Python for Everybody', url: 'https://www.coursera.org/specializations/python', description: 'Dr. Chuck\'s Coursera specialization — 5 courses covering Python basics to data collection and visualization.', type: 'freemium', difficulty: 'Beginner', badge: 'Community Pick', estimatedHours: 80 },
        { title: 'freeCodeCamp Python Course (YouTube)', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', description: '4.5-hour free Python crash course covering all fundamentals. No signup required.', type: 'free', difficulty: 'Beginner', badge: 'Free', estimatedHours: 5 },
        { title: 'Python OOP Tutorial', url: 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM', description: 'Corey Schafer\'s definitive Python OOP series. Classes, inheritance, decorators, and special methods.', type: 'free', difficulty: 'Intermediate', badge: 'Community Pick', estimatedHours: 3 },
      ],
    },
    {
      id: 'practice',
      title: 'Practice Platforms',
      description: 'Hands-on Python challenges across all skill levels.',
      icon: 'Code2',
      resources: [
        { title: 'LeetCode', url: 'https://leetcode.com', description: 'Premier platform for algorithmic challenges — Python is the #1 preferred language among top submitters.', type: 'freemium', difficulty: 'Intermediate', badge: 'Community Pick' },
        { title: 'Exercism — Python', url: 'https://exercism.org/tracks/python', description: '130+ Python exercises with mentor code reviews. Excellent for idiomatic Python writing style.', type: 'free', difficulty: 'Beginner' },
        { title: 'PyBites', url: 'https://codechalleng.es/', description: 'Python-specific coding challenges with a focus on practical scenarios — bites of Python code.', type: 'freemium', difficulty: 'Intermediate', badge: 'Community Pick' },
        { title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', description: 'Free micro-courses for Python, Pandas, Machine Learning, and Data Visualization with hands-on notebooks.', type: 'free', difficulty: 'Intermediate', badge: 'Best Rated' },
      ],
    },
    {
      id: 'github',
      title: 'GitHub Repositories',
      description: 'Top Python repositories and curated learning resources.',
      icon: 'Github',
      resources: [
        { title: 'Awesome Python', url: 'https://github.com/vinta/awesome-python', description: 'A curated list of Python frameworks, libraries, and resources across every domain.', type: 'free', difficulty: 'Beginner', badge: 'Community Pick' },
        { title: 'Python Patterns', url: 'https://github.com/faif/python-patterns', description: 'A collection of design patterns implemented in Python with explanations and use cases.', type: 'free', difficulty: 'Intermediate' },
        { title: 'The Algorithms — Python', url: 'https://github.com/TheAlgorithms/Python', description: 'All algorithms implemented in Python — sorting, searching, ML, graphs, and more.', type: 'free', difficulty: 'Intermediate', badge: 'Best Rated' },
        { title: 'Python Mini Projects', url: 'https://github.com/Python-World/python-mini-projects', description: '100+ beginner-friendly Python mini projects for practice and portfolio building.', type: 'free', difficulty: 'Beginner' },
      ],
    },
    {
      id: 'tools',
      title: 'Developer Tools',
      description: 'Essential tools for productive Python development.',
      icon: 'Wrench',
      resources: [
        { title: 'PyCharm / VS Code', url: 'https://code.visualstudio.com/docs/languages/python', description: 'VS Code with the Python extension provides IntelliSense, debugging, linting, and Jupyter support.', type: 'free', difficulty: 'Beginner', badge: 'Official' },
        { title: 'Poetry — Dependency Management', url: 'https://python-poetry.org/', description: 'Modern Python packaging and dependency management. Replaces pip + virtualenv with a single tool.', type: 'free', difficulty: 'Intermediate' },
        { title: 'Black — Code Formatter', url: 'https://black.readthedocs.io/', description: 'The uncompromising Python code formatter. Zero config, consistent style enforced automatically.', type: 'free', difficulty: 'Beginner', badge: 'Community Pick' },
        { title: 'Jupyter Notebooks', url: 'https://jupyter.org/', description: 'Interactive notebooks for data exploration, experimentation, and documentation. The data science standard.', type: 'free', difficulty: 'Beginner' },
      ],
    },
    {
      id: 'community',
      title: 'Community & Forums',
      description: 'Where Python developers gather, learn, and share.',
      icon: 'Users',
      resources: [
        { title: 'r/learnpython', url: 'https://www.reddit.com/r/learnpython/', description: 'Welcoming community for Python beginners — questions answered by experienced developers daily.', type: 'free', difficulty: 'Beginner', badge: 'Community Pick' },
        { title: 'Python Discord', url: 'https://pythondiscord.com/', description: 'The official Python Discord community with 200k+ members. Channels for help, projects, and career advice.', type: 'free', difficulty: 'Beginner' },
        { title: 'Python Weekly', url: 'https://www.pythonweekly.com/', description: 'Weekly newsletter with curated Python articles, tutorials, libraries, and job postings.', type: 'free', difficulty: 'Beginner' },
        { title: 'Stack Overflow — Python', url: 'https://stackoverflow.com/questions/tagged/python', description: 'Python is the #1 tagged language on Stack Overflow with millions of answered questions.', type: 'free', difficulty: 'Beginner' },
      ],
    },
  ],

  learningPath: {
    totalWeeks: 8,
    totalHours: 110,
    level: 'Beginner',
    description: 'An 8-week structured path taking you from Python basics to building real-world projects with data, automation, and web development.',
    weeks: [
      { week: 1, title: 'Python Basics', description: 'Install Python, write your first scripts, and learn core syntax.', topics: ['Installation & REPL', 'Variables, Types, Input/Output', 'Operators & String Formatting', 'Conditional Statements', 'For & While Loops'], estimatedHours: 10, milestoneProject: 'Build a text-based calculator' },
      { week: 2, title: 'Data Structures', description: 'Master Python\'s built-in collection types.', topics: ['Lists & List Comprehensions', 'Tuples & Unpacking', 'Dictionaries & Sets', 'Nested Structures', 'Collections Module'], estimatedHours: 12, milestoneProject: 'Build a contact book using dictionaries' },
      { week: 3, title: 'Functions & Modules', description: 'Write clean, reusable code with functions and Python\'s module system.', topics: ['def, args, kwargs', 'Return Values & Scope', 'Lambda Functions', 'Python Standard Library', 'pip & Virtual Environments'], estimatedHours: 12, milestoneProject: 'Build a password generator module' },
      { week: 4, title: 'OOP & Classes', description: 'Model real-world problems with object-oriented design.', topics: ['Classes & __init__', 'Instance & Class Methods', 'Inheritance & super()', 'Dunder Methods', 'Dataclasses'], estimatedHours: 14, milestoneProject: 'Build a Bank Account class with transactions' },
      { week: 5, title: 'File I/O & Error Handling', description: 'Read, write, and gracefully handle real-world data and errors.', topics: ['Reading & Writing Files', 'CSV & JSON Processing', 'try/except/finally', 'Custom Exceptions', 'Context Managers (with)'], estimatedHours: 12, milestoneProject: 'Build a CSV expense tracker' },
      { week: 6, title: 'Web & Automation', description: 'Automate tasks and build web scrapers and simple HTTP clients.', topics: ['requests Library', 'BeautifulSoup Web Scraping', 'Working with APIs', 'File Automation with os/shutil', 'Schedule Tasks'], estimatedHours: 16, milestoneProject: 'Build a news headline scraper and emailer' },
      { week: 7, title: 'Data & Visualization', description: 'Analyze datasets with Pandas and visualize insights.', topics: ['NumPy Fundamentals', 'Pandas DataFrames', 'Data Cleaning', 'Matplotlib Charts', 'Seaborn Visualizations'], estimatedHours: 16, milestoneProject: 'Analyze a dataset and generate a report PDF' },
      { week: 8, title: 'Capstone Project', description: 'Apply everything to build a complete Python web application.', topics: ['Flask Web Framework Basics', 'Routing & Templates', 'SQLite with Python', 'Deploying to Render/Heroku', 'Code Review & Testing'], estimatedHours: 18, milestoneProject: 'Build and deploy a full-stack Flask todo application' },
    ],
  },

  skillTree: [
    { id: 'py-basics', name: 'Python Basics', description: 'Core syntax and built-in data types.', level: 'category', children: [
      { id: 'py-types', name: 'Data Types', description: 'int, float, str, bool, None — Python\'s type system.', level: 'topic', codeExample: `x = 42          # int\ny = 3.14        # float\ns = "hello"     # str
b = True        # bool
n = None        # NoneType\n\n# Type checking\ntype(x)         # <class 'int'>\nisinstance(x, int)  # True` },
      { id: 'py-collections', name: 'Collections', description: 'Lists, tuples, sets, and dictionaries.', level: 'topic', codeExample: `lst = [1, 2, 3]           # mutable list\ntup = (1, 2, 3)           # immutable tuple\nst = {1, 2, 3}            # unique set\ndct = {'a': 1, 'b': 2}   # key-value dict\n\n# List comprehension\nsquares = [x**2 for x in range(10)]` },
      { id: 'py-functions', name: 'Functions', description: 'def, *args, **kwargs, lambdas, and decorators.', level: 'topic', codeExample: `def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\n# *args and **kwargs\ndef log(*args, **kwargs):\n    print(args, kwargs)\n\n# Lambda\ndouble = lambda x: x * 2\n\n# Decorator\ndef timer(fn):\n    import time\n    def wrapper(*a, **kw):\n        start = time.time()\n        result = fn(*a, **kw)\n        print(f"Took {time.time()-start:.2f}s")\n        return result\n    return wrapper` },
    ]},
    { id: 'py-oop', name: 'Object Oriented', description: 'Classes, inheritance, and Pythonic OOP patterns.', level: 'category', children: [
      { id: 'py-classes', name: 'Classes & Instances', description: 'Defining classes, __init__, self, and instance methods.', level: 'topic', codeExample: `class Animal:\n    species_count = 0  # class variable\n\n    def __init__(self, name, sound):\n        self.name = name  # instance variable\n        self.sound = sound\n        Animal.species_count += 1\n\n    def speak(self):\n        return f"{self.name} says {self.sound}"\n\ndog = Animal("Rex", "woof")\ndog.speak()  # "Rex says woof"` },
      { id: 'py-inheritance', name: 'Inheritance', description: 'Subclasses, super(), method overriding, and multiple inheritance.', level: 'topic', codeExample: `class Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name, "woof")\n        self.breed = breed\n\n    def fetch(self, item):\n        return f"{self.name} fetches the {item}"\n\nrex = Dog("Rex", "Labrador")\nrex.speak()   # inherited from Animal\nrex.fetch("ball")  # own method` },
    ]},
    { id: 'py-advanced', name: 'Advanced Python', description: 'Decorators, generators, async, and performance.', level: 'category', children: [
      { id: 'py-generators', name: 'Generators & Iterators', description: 'Memory-efficient lazy sequences with yield.', level: 'topic', codeExample: `# Generator function\ndef count_up(limit):\n    n = 0\n    while n < limit:\n        yield n  # suspends and returns value\n        n += 1\n\nfor num in count_up(5):\n    print(num)  # 0, 1, 2, 3, 4\n\n# Generator expression\nsquares_gen = (x**2 for x in range(1000))` },
      { id: 'py-async', name: 'Async/Await', description: 'Asyncio for concurrent I/O-bound operations.', level: 'topic', codeExample: `import asyncio\n\nasync def fetch_data(url):\n    await asyncio.sleep(1)  # simulates network delay\n    return f"data from {url}"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch_data("url1"),\n        fetch_data("url2"),\n    )\n    print(results)\n\nasyncio.run(main())` },
    ]},
  ],

  aiQA: [
    { keywords: ['list comprehension', 'comprehension'], question: 'What are list comprehensions?', answer: 'List comprehensions provide a concise way to create lists: `[expression for item in iterable if condition]`. Example: `squares = [x**2 for x in range(10) if x % 2 == 0]` creates a list of even squares. They\'re more Pythonic and often faster than equivalent for loops.' },
    { keywords: ['decorator', 'decorators'], question: 'What is a Python decorator?', answer: 'A decorator is a function that takes another function and extends its behavior without modifying it. Applied with `@decorator_name`. Example: `@timer` could wrap any function to log its execution time. Under the hood: `func = decorator(func)`. Built-ins include `@property`, `@staticmethod`, `@classmethod`.' },
    { keywords: ['generator', 'yield'], question: 'What is a generator in Python?', answer: 'A generator is a function that uses `yield` instead of `return` to produce a lazy sequence of values. It saves memory by computing values on-demand rather than storing them all at once. Perfect for large datasets. `(x**2 for x in range(1000000))` uses ~200 bytes vs a list which uses ~8MB.' },
    { keywords: ['lambda'], question: 'What is a lambda function?', answer: 'A lambda is an anonymous function defined inline: `lambda arguments: expression`. Example: `double = lambda x: x * 2`. They\'re useful as short callbacks — `sorted(items, key=lambda x: x.price)`. For complex logic, prefer named `def` functions for readability.' },
    { keywords: ['gil', 'global interpreter lock'], question: 'What is the Python GIL?', answer: 'The Global Interpreter Lock (GIL) is a mutex in CPython that allows only one thread to execute Python bytecode at a time. It prevents true CPU parallelism with threads. For CPU-bound tasks, use `multiprocessing`. For I/O-bound tasks, threads or `asyncio` work fine since I/O releases the GIL.' },
    { keywords: ['virtual environment', 'venv', 'virtualenv'], question: 'What is a virtual environment?', answer: 'A virtual environment is an isolated Python environment with its own packages and interpreter. Create with `python -m venv .venv`, activate with `source .venv/bin/activate` (macOS/Linux) or `.venv\\Scripts\\activate` (Windows). Use `pip install package` inside it. Keeps project dependencies separated.' },
    { keywords: ['*args', '**kwargs'], question: 'What are *args and **kwargs?', answer: '`*args` collects extra positional arguments into a tuple. `**kwargs` collects extra keyword arguments into a dictionary. Example: `def func(*args, **kwargs): print(args, kwargs)`. Called as: `func(1, 2, key="value")` prints `(1, 2) {\'key\': \'value\'}`. Use for flexible function signatures.' },
    { keywords: ['with', 'context manager'], question: 'What is a context manager?', answer: 'Context managers manage resources using `with` statements. They guarantee cleanup (e.g., closing files) even if an error occurs. `with open("file.txt") as f: data = f.read()` — the file closes automatically. Create custom ones using `__enter__`/`__exit__` methods or the `@contextmanager` decorator from `contextlib`.' },
    { keywords: ['self'], question: 'Why do Python methods use `self`?', answer: '`self` is the reference to the current instance of a class. Python passes it automatically as the first argument to instance methods. It\'s a convention, not a keyword — you could name it anything, but `self` is universally expected. It lets you access instance variables and other methods: `self.name`, `self.method()`.' },
    { keywords: ['mutable', 'immutable'], question: 'What is the difference between mutable and immutable objects?', answer: 'Immutable objects cannot be changed after creation: int, float, str, tuple, frozenset. Mutable objects can be modified in place: list, dict, set. `s = "hello"; s[0] = "H"` raises TypeError. `lst = [1,2,3]; lst[0] = 9` works. This matters for function arguments — mutable defaults are a common bug: `def f(items=[]): items.append(1)`.' },
  ],
}
