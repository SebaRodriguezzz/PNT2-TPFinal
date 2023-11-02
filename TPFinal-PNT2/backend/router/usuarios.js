import express from 'express'
import Controlador from '../controlador/usuarios.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.post('/register', this.controlador.registrarUsuario)
        this.router.post('/login', this.controlador.logearUsuario)
        this.router.get('/lista', this.controlador.listarUsuarios)
        this.router.post('/lista/:id', this.controlador.listarUsuarioID)
        this.router.delete('/:id', this.controlador.borrarUsuario)
        return this.router
    }
}

export default Router
