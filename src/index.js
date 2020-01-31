const express = require('express');

const server = express();
server.use(express.json());

let requestCount = 0;
const projects = [
  { id: "1", title: 'Semana Omnistack', tasks: ['Criar o DevRadar'] },
  { id: "2", title: 'Lauch Base', tasks: ['Criar o Primeiro Projeto Node'] },
  { id: "3", title: 'GoStack', tasks: ['Desenvolver o GoBarber'] },
];

server.use((req,res,next) => {
  console.log(`Quantidade de chamadas executadas: ${++requestCount}`)
  return next()
})

function checkProjectId(req,res,next){
  const {id} = req.params;
  if(!projects.find(project => project.id == id))
    return res.status(400).json({error:`Project with id ${id} does not exist`});
  else
    return next();
}

server.get('/projects', (req,res) => {
  return res.json(projects);
});

server.get('/projects/:id',checkProjectId, (req,res) => {
  const {id} = req.params;
  const project = projects.filter(project => { 
    return project.id == id
  })
  return res.json(project);
});

server.post('/projects', (req,res) => {
  const {id,title} = req.body
  projects.push(
    {
      id,
      title,
      tasks:[]
    }
  );
  return res.status(201).json(projects);
});

server.put('/projects/:id',checkProjectId, (req,res) => {
  const {id} = req.params;
  const {title} = req.body
  
  const project = projects.find(project => project.id == id);
  
  project.title = title

  return res.json(project);
});

server.delete('/projects/:id',checkProjectId, (req,res) => {
  const {id} = req.params;
  
  projects.forEach((project,index) => {
    if(project.id == id) 
      projects.splice(index,1)
  })
  
  return res.send();
});

server.post('/projects/:id/tasks',checkProjectId, (req,res) => {
  const {title} = req.body;
  const {id} = req.params;
  
  const project = projects.find(project => project.id == id);

  project.tasks.push(title);

  return res.status(201).json(project);
});

server.listen(3333)