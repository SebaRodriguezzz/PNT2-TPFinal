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

const admin = [{email:'admin@test.com',password:'1234','rol':'admin'}]

const profesHabilitados = [{email:'profeHabilitado@test.com',password:'1234','rol':'user'},
{email:'profeHabilitado2@test.com',password:'1234','rol':'user'} ]

const usuariosHabilitados = [{email:'habilitado@test.com',password:'1234','rol':'user'},
{email:'habilitado2@test.com',password:'1234','rol':'user'} ]

const profes = [{email:'profe1@test.com',password:'1234','rol':'profe'}]
const users = [
  {email:'user@test.com',password:'1234','rol':'user'}
]

app.post('/logout', (req, res) => {
  res.status(200).json({ mensaje: bien })
  })


app.post('/register', (req, res) => {
  if (req.body) {
    const user = req.body;
    console.log(user.email)
    if (usuariosHabilitados.filter(u => u.email == user.email && u.rol == "user").length > 0) {
      console.log("Esta bien")
      user.rol = 'user'
      users.push(user)
      console.log("Se pusheo")
      res.status(200).json({ usuario: user })
      console.log(res.status)

    }
    else{
      res.status(403).json({ message: 'error' })
      console.log("Holaaa back")
      
    }

  } else {
    res.status(400).json({ message: 'error' })
    console.log(res.status)
  }
})

app.post('/login',(req,res) =>{
  console.log(req.body);
  if(req.body) {
    const user = req.body;
    //console.log(user);
    const userDb = users.find(u=>u.email==user.email&&u.password==user.password)
    //console.log(userId);
    if(userDb) {
      const token =
        jsonwebtoken.sign({email:user.email,rol:'adm'},'clave_secreta')
        res.json({token:token})
    } else {
      res.status(401).json({message:'error'})
    }
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
