import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
export const loginStore = defineStore('login', {
    state: () => {
        return {
            usuario: {},
            estaLogeado: false,
            esAdmin: false,
            esAlumno: false,
            esProfe: false,
            idLogeado: 1

        }
    },
    actions: {
        async login(usuario) {
            try {
                const datos = await axios.post("http://localhost:3000/login", usuario);
                console.log(datos.data.email);
                if (datos.status == 200) {
                    const decryptedToken = jwtDecode(datos.data.token)
                    this.esAdmin = decryptedToken.rol == 'admin';
                    this.esProfe = decryptedToken.rol == 'profe';
                    this.esAlumno = decryptedToken.rol == 'alumno';
                    this.estaLogeado = true;
                    this.usuario.email = usuario.email;
                    this.usuario.password = usuario.password;
                    localStorage.setItem('usuario', JSON.stringify(
                        { email: usuario.email, token: datos.data.token }))
                } else {
                    this.estaLogeado = false;
                }
            } catch (e) {
                console.log(e);
            }
        },

        logout() {
            try {
                this.estaLogeado = false;
                this.idLogeado = 0;
                this.usuario = {};
            } catch (e) {
                console.log(e);
            }
        },
        async agregarUsuario(usuario) {
            try {
            console.log("2da parte hecha")
            const datos = await axios.post("http://localhost:3000/usuarios/agregar", usuario);
            } catch (e) {
                console.log(e);
            }
        },
        async cargarDatos(objetos) {
            try {
            const response = await axios.get("http://localhost:3000/"+objetos);
            return response.data;
            } catch (e) {
                console.log(e);
            }
        },
        async addClass(clase) {
            try {
            const response = await axios.get("http://localhost:3000/"+clase);
            return response.data;
            } catch (e) {
                console.log(e);
            }
        },

    }
})
