"use strict";exports.id=2508,exports.ids=[2508],exports.modules={42508:(e,o,a)=>{a.r(o),a.d(o,{dockerProjects:()=>s});let s=[{title:"Containerized Stack deployment",difficulty:"Intermediate",description:"Use Docker compose files to stand up a Node web app linked to an isolated MongoDB database and Redis memory cache.",skillsLearned:["Docker Compose schema","Environment variables routing","Networking boundaries configurations","Data volumes persistence"],technologies:["Docker","Docker Compose","Node.js","MongoDB","Redis"],sourceCodeStructure:`docker-stack/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── app.js
└── db-data/`,developmentRoadmap:["Write multi-stage Dockerfile compiling and packaging the Node application.","Configure docker-compose.yml declaring backend, database, and caching services.","Map DB files to local volumes for data safety between service reboots.","Create compose networking bridges restricting databases access to backend containers only."]}]}};