import { defineStore } from 'pinia'
import axios from 'axios'
export const loginStore = defineStore('login', {
    state: () => {
        return {
            usuario: {},
            estaLogeado: false,
            userDB: {username: "admin", password: "1234"}

        
        }
    },
    actions: {
        async login(usuario) {
            try {
                // Lo podriamos probar cuando tengamos backend
                //const datos = await axios.post("http://localhost:3000/login", usuario);
                console.log("usuario: " + this.usuario.username);
                console.log("pass: " + usuario.password);
                //if (datos.status == 200) {
                if (usuario.username == this.userDB.username && usuario.password == this.userDB.password){
                    this.estaLogeado = true;
                    this.usuario.username = usuario.username;
                    //localStorage.setItem('usuario', JSON.stringify(
                    //    { username: usuario.username, token: datos.data.token }))
                } else {
                    this.estaLogeado = false;
                }
                console.log("Log usuario: "+ usuario + " OK")
            } catch (e) {
                console.log(e);
            }
        },
    }
})