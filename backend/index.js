import express from 'express'

import RouterUsuarios from './router/usuarios.js'


import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken';

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


// base de prueba en memoria

const users = [
  {email:'admin@test.com',password:'1234','rol':'admin'},
  {email:'alumno@test.com',password:'1234','rol':'alumno'},
  {email:'admin2@test.com',password:'1234','rol':'admin'},
  {email:'alumno2@test.com',password:'1234','rol':'alumno'},
  {email:'profe@test.com',password:'1234','rol':'profe'}, 
   {email:'profe2@test.com',password:'1234','rol':'profe'}
]

const adminMiddleware =(req,res,next)=>{
  const user = user.filter(u => req.body.user.email == u.email)
  if(user.rol == 'admin') {
  next()
  }
  res.status(400).json({status: 400, message:'Este usuario no tiene priv de admin'})
  
  }

  const AuthMiddleware = async (req,res,next) => {
  const accessToken = req.header('Authorization');
  
    if (!accessToken || !accessToken.startsWith('Bearer ')) {
      return res.status(588).json({error : 'hola'});
    }
  
    next();
  };


app.post('/login',(req,res) =>{
  console.log(req.body);
  if(req.body) {
    const user = req.body;
    const userDb = users.find(u=>u.email==user.email&&u.password==user.password)
    if(userDb) {
      const token = jsonwebtoken.sign({email:userDb.email,rol: userDb.rol},'clave_secreta')
      res.json({token:token})
    } else {
      res.status(401).json({message:'error'})
    }
  } else {
    res.status(400).json({message:'error'})
  }
})

app.get('/alumnos', (req, res) => {
  const listaUsuarios = users.filter(u => u.rol == "alumno")
  res.json(listaUsuarios)
})

app.get('/profes', (req, res) => {
  const listaUsuarios = users.filter(u => u.rol == "profe")
  res.json(listaUsuarios)
})

app.get('/clases', (req, res) => {
  const listaUsuarios = users.filter(u => u.rol == "alumno")
  res.json(listaUsuarios)
})

app.get('/rutinas', (req, res) => {
  const listaUsuarios = users.filter(u => u.rol == "alumno")
  res.json(listaUsuarios)
}) 

app.post('/usuarios/agregar',(req,res) =>{
  console.log(req.body);
  if(req.body) {
    const usuario = req.body;
    users.push(usuario)
    res.status(200).json({message:'bien'})
  } else {
    res.status(400).json({message:'error'})
  }
})

const lista = [{id:100,name:'Charly'},{id:200,name:'Jhon'}]
app.get('/lista', (req, res) => {
    console.log(req.headers['authorization']);
    res.json(lista)
})
app.post('/lista', (req,res) =>{
    //console.log(req.body);
    lista.push(req.body)
    res.status(200).json({message:'ok'})
})
app.delete('/lista/:id', (req,res) =>{
    // console.log(req.params.id);
    // lista = lista.filter(e=>e.id!=req.params.id)
    const index = lista.findIndex(e=>e.id==req.params.id);
    lista.pop(index)
    res.status(200).json({message:'ok'})
})
app.put('/lista/:id', (req,res) =>{
    //console.log(req.body);
    //console.log(req.params.id);
    const index = lista.findIndex(e=>e.id==req.params.id);
    lista[index]=req.body
    res.status(200).json({message:'ok'})
    // falta manejo de errores
    // res.status(404).json({message:'error'})
})

const PORT = 3000
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
