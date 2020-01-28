const express = require('express');

const server = express();

const projects = [];

server.use(express.json());

server.use((req, res, next) => {
  console.count("Requisições feitas");
  next();
});

function verifyID(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if(!project){
    return res.status(400).json({error: 'Projeto não existe!'})
  }

  return next();

}


server.get('/projects',(req, res) => {

  return res.json(projects);

});

server.post('/projects', (req, res) => {

  const {id, title} = req.body;

  const project = {
    id,
    title,
    tasks: []
  };
  
  projects.push(project);

  return res.json(projects);

});

server.post('/projects/:id/tasks', verifyID , (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(title);

  return res.json(project);

});

server.put('/projects/:id', verifyID,  (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', verifyID,  (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id ==id);

  projects.splice(projectIndex, 1);

  return res.json({message: "Projeto deletado com sucesso!"});

});

server.listen(3000);