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
  {email:'alumnooro@test.com',password:'1234','rol':'alumno',plan:'oro',id:1},
  {email:'alumnoba@test.com',password:'1234','rol':'alumno',plan:'basico',id:2},
  {email:'alumnopla@test.com',password:'1234','rol':'alumno',plan:'platino',id:3},
  {email:'admin2@test.com',password:'1234','rol':'admin'},
  {email:'profe@test.com',password:'1234','rol':'profe'}, 
   {email:'profe2@test.com',password:'1234','rol':'profe'}
]

const clases = [
  {nombre:'Salsa',nombreProfe:'Claudio', horario: 1600, capacidad: 20, anotados:0, id:1},
  {nombre:'Bachata',nombreProfe:'Pepito', horario: 1700,capacidad: 20, anotados:0, id:2},
  {nombre:'Tango',nombreProfe:'Juan', horario: 1500,capacidad: 20, anotados:0, id:3}
]

const rutinas = [ {nombre:"Torso-Pierna" , nombreAlumno:"Pepe" , nivel:"Basico"}]

const usuariosInscriptos = []

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
      const token = jsonwebtoken.sign({email:userDb.email,rol: userDb.rol,plan:userDb.plan,
      id: userDb.id},'clave_secreta')
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
  const listaClases = clases.sort((a,b)=>a.horario - b.horario)
  res.json(listaClases)
})

app.get('/rutinas', (req, res) => {
  const listaRutinas = rutinas
  res.json(listaRutinas)
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

app.post('/clases/agregar',(req,res) =>{
  console.log(req.body);
  if(req.body) {
    const clase = req.body;
    clases.push(clase)
    res.status(200).json({message:'bien'})
  } else {
    res.status(400).json({message:'error'})
  }
})

app.post('/rutinas/agregar',(req,res) =>{
  console.log(req.body);
  if(req.body) {
    const rutina = req.body;
    rutinas.push(rutina)
    res.status(200).json({message:'bien'})
  } else {
    res.status(400).json({message:'error'})
  }
})


///Me quede con esta, quiero agregar los usuarios inscriptos en cada clase
app.post('/clases/agregar/:id',(req,res) =>{
  console.log(req.body);
  if(req.body) {
    const idClase = req.params;
    const usuario = req.body;
    usuariosInscriptos.push(claseUsuario)
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
