import { defineStore } from 'pinia'
import axios from 'axios'
export const loginStore = defineStore('login', {
    state: () => {
        return {
            usuario: {},
            estaLogeado: false,
            esAdmin: false,
            esUsuario: false,
            esProfe: false,
            idLogeado: 1
            
        }
    },
    actions: {
        async login(usuario) {
            try {
                const datos = await axios.post("http://localhost:3000/login", usuario);
                console.log(datos);
                if (datos.status == 200) {
                    console.log(datos.request)
                    this.estaLogeado = true;
                    this.usuario.email = usuario.email;
                    localStorage.setItem('usuario', JSON.stringify(
                        { email: usuario.email, token: datos.data.token }))
                } else {
                    this.estaLogeado = false;
                }
            } catch (e) {
                console.log(e);
            }
        },
        async register(usuario) {
            console.log("Hola")
            const datos = await axios.post("http://localhost:3000/register", usuario);
            console.log(datos.data)
            return datos;
        },
        async logout(usuario) {
            try {
               console.log("Hola de vuelta logout")
               console.log(usuario.email)
               const datos = await axios.post("http://localhost:3000/logout", usuario);
               console.log(datos.data)
               this.estaLogeado = false;
               this.idLogeado = 0;
               this.usuario = {};
            } catch (e) {
                console.log(e);
            }
        }
    }
})
