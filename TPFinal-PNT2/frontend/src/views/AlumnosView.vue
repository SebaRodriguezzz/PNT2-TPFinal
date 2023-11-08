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

      
      <div class="container">
      <div class="login-text">Agregar usuario </div>
        <ion-input class="input" v-model="user.email" placeholder="E-mail" type="email"></ion-input>
        <ion-input class="input" v-model="user.password" placeholder="Password" type="password"></ion-input>
        <ion-select class="custom-select" v-model="user.rol" placeholder="Rol">
          <ion-select-option value="profe">Profe</ion-select-option>
          <ion-select-option value="alumno">Alumno</ion-select-option>
        </ion-select>
        <ion-button @click="addUser">Agregar</ion-button>
      </div>
      <br>
      <div class="login-text">Usuarios agregados</div>
      {{ lista[0] }}
    </ion-content>
  </ion-page>
</template>


<style>
.login-text{
  font-weight: bold;
  color: rgb(78, 78, 78);
  font-size: 32px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-height: 400px;
  background-color: rgb(235, 235, 235);
  margin: auto;
  margin-top: 120px;
  gap: 22px;
  padding: 42px;
  border-radius: 30px;
  box-shadow: 0px 0px 21px 2px rgba(0,0,0,0.25);
}

.input {
  background-color: white;
  border-radius: 8px;
  border: 3px solid rgb(199, 199, 199);
  transition: 0.3s;
}

.input:hover{
  background-color: rgb(247, 247, 247);
}


.native-input.sc-ion-input-md {
  padding-left: 8px;
}

.custom-select {
  border: 2px solid rgb(199, 199, 199);
  border-radius: 8px;
  transition: 0.3s;
}

.custom-select::part(icon) {
  display: none; /* Oculta el icono del desplegable */
}

.custom-select:hover {
  background-color: rgb(247, 247, 247);
}

.custom-select {
  --placeholder-color: rgb(199, 199, 199);
}

</style>
