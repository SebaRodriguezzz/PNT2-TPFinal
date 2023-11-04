<script>
import {IonList,IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonList,IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const { loadData,agregarUsuario } = store;
    return { loadData,agregarUsuario, estaLogeado };
  },
  data() {
    return {
      user: {},
      lista:[]
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.lista = await this.loadData()
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
    async addUser() {
      console.log("Hasta aca perfecto")
      await this.agregarUsuario(this.user);
      alert("Se agrego correctamente")
      this.$router.push("/")

    },

  }
}
</script>

<template>

  <ion-page>

    <ion-content class="ion-padding">

      <h2>Usuarios</h2>
      {{ lista[0] }}
      <h2>Agregar usuario </h2>
      <ion-input v-model="user.email" label="email" type="email"></ion-input>
      <ion-input v-model="user.password" label="password" type="password"></ion-input>
      <ion-input v-model="user.rol" label="rol" type="text"></ion-input>
      <ion-button @click="addUser">Agregar</ion-button>
    </ion-content>
  </ion-page>
</template>


