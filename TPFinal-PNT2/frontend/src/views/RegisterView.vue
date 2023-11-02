<script>
import {IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const { login, register } = store;
    return { login, register, estaLogeado };
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async registerForm() {
      try{
        const datos = await this.register(this.user);
        if(datos){
        console.log(datos)
        this.$router.push("/login")
        }
        else {
        console.log("Intentar de vuelta")
        this.$router.push("/")

        }
     
      } catch{
        console.log("Intentar de vuelta catch")
        alert("Intenta nuevamente")
        this.$router.push("/register")
      

      }

   
     
    }
  }
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Registro </h2>
      <ion-input v-model="user.nombre" label="nombre" type="text"></ion-input>
      <ion-input v-model="user.apellido" label="apellido" type="text"></ion-input>
      <ion-input v-model="user.email" label="email" type="email"></ion-input>
      <ion-input v-model="user.password" label="password" type="password"></ion-input>
      <ion-button @click="registerForm">Registrate </ion-button>
    </ion-content>
  </ion-page>
</template>

<style>
</style>