"use strict";exports.id=9556,exports.ids=[9556],exports.modules={29556:(e,s,t)=>{t.r(s),t.d(s,{dockerNotes:()=>a});let a=[{id:"docker-volumes",title:"Chapter 1: Data Persistence with Volumes",content:"Container file systems are ephemeral; files are deleted if the container stops. To persist files (e.g. databases), Docker maps container paths to managed directory spaces on the host using Volumes.",codeSnippet:{code:`# Run a postgres container mapping a volume
docker volume create pgdata

docker run -d \\
  --name mydb \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:15`,language:"bash"},summary:"Volumes bypass the Union File System, enabling high write speeds and independent data lifetimes outside containers."}]}};