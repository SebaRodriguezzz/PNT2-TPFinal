<script>
import { ref, provide, inject } from 'vue';
import {IonPage, IonContent, IonInput, IonButton} from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { loginStore } from '../stores/userStore'
import router from '../router';

export default {
  components: {IonPage, IonContent, IonInput, IonButton},
  
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const {login} = store;

    // Define 'user' como una variable reactiva
    const user = ref({ username: '', password: '' });

    // Proporciona 'user' para que otros componentes puedan acceder a él
    provide('user', user);

    return { login, estaLogeado, user };
  },
  methods: {
    async loginForm(){
        console.log("login view " + this.user.username)
        console.log("login view " + this.user.password)
        await this.login(this.user);
        console.log("esta logeado: " + this.estaLogeado)
        if(this.estaLogeado){
            this.$router.push('/home') //tambien me funciono this.router nii idea
        }else {
            // redirigir a otra pagina
        }
    }
  }
}
</script>

<template>
  <ion-page>
    <ion-content>
    <h2>Login</h2>
    <ion-input v-model="user.username" label="username"></ion-input>
    <ion-input v-model="user.password" label="password"></ion-input>
    <ion-button @click="loginForm">Login</ion-button>

    </ion-content>

  </ion-page>
</template>

<style>
</style>