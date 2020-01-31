const express = require('express');

const server = express();
server.use(express.json());

const projects = [
  { id: "1", title: 'Semana Omnistack', tasks: ['Criar DevRadar'] },
  { id: "2", title: 'Lauch Base', tasks: ['Criar Primeiro Projeto'] },
  { id: "3", title: 'GoStack', tasks: ['Desenvolver o GoBarber'] },
];

server.get('/projects', (req,res) => {
  return res.json(projects);
});

server.get('/projects/:id', (req,res) => {
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

server.put('/projects/:id', (req,res) => {
  const {id} = req.params;
  const {title} = req.body
  
  projects.forEach(project => { 
    if(project.id == id)
      project.title = title
    }
  )
  
  return res.json(projects);
});

server.delete('/projects/:id', (req,res) => {
  const {id} = req.params;
  let indexToRemove;
  
  projects.forEach((project,index) => {
    if(project.id == id) 
      projects.splice(index,1)
  })
  
  return res.send();
});

server.listen(3333)