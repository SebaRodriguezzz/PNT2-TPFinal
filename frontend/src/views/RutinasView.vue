<script>
import {IonList,IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonList,IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const { cargarDatos,agregarUsuario } = store;
    return { cargarDatos,agregarUsuario, estaLogeado };
  },
  data() {
    return {
      rutina: {},
      lista:[]
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.lista = await this.cargarDatos()
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
    async addUser() {
      console.log("Hasta aca perfecto")
      await this.agregarUsuario(this.user);
      alert("Se agrego correctamente")
      await loadData()
      this.$router.push("/")

    },

  }
}
</script>

<template>
  <ion-page>

    <ion-content class="ion-padding">


      <h2>Clases</h2>
      <ion-list v-for="e in lista" :key="e.id">
        {{ e.email }} {{ e.password }}
        <ion-button @click="deleteData(e.id)">Eliminar</ion-button>
        <ion-button @click="putData(e.id)">Modificar</ion-button>
      </ion-list>
      <div class="container">
        <div class="login-text">Agregar rutina </div>
        <ion-input class="input" v-model="rutina.nombre" placeholder="nombre" type="text"></ion-input>
        <ion-input class="input" v-model="rutina.profesor" placeholder="ID profesor" type="text"></ion-input>
        <ion-input class="input" v-model="rutina.nivel" placeholder="dni" type="text"></ion-input>
        <ion-input class="input" v-model="rutina.dias" placeholder="E-mail" type="email"></ion-input>
        <ion-button @click="addUser">Agregar</ion-button>
      </div>

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
