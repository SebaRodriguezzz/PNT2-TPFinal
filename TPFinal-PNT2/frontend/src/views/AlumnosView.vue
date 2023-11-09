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
      user: {rol : "alumno"},
      lista:[],
      mostrarFormularioFlag: false // Inicialmente oculto

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
    mostrarFormulario() {
      this.mostrarFormularioFlag = !this.mostrarFormularioFlag; // Mostrar el formulario al hacer clic
    }

  }
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Alumnos</h2>
      <!-- Botón para abrir el formulario -->
      <ion-button @click="mostrarFormulario">Agregar Usuario</ion-button>
      <!-- Lista de usuarios -->
      <ion-list v-for="e in lista" :key="e.id">
        {{ e.email }} {{ e.password }}
        <ion-button @click="deleteData(e.id)">Eliminar</ion-button>
        <ion-button @click="putData(e.id)">Modificar</ion-button>
      </ion-list>
      <!-- Formulario flotante -->
      <div class="floating-form" v-if="mostrarFormularioFlag">
        <button @click="mostrarFormulario" class="close-button">X</button>
          <div class="login-text">Agregar alumno</div>
          <ion-input class="input" v-model="user.nombre" placeholder="Nombre" type="text"></ion-input>
          <ion-input class="input" v-model="user.apellido" placeholder="Apellido" type="text"></ion-input>
          <ion-input class="input" v-model="user.dni" placeholder="DNI" type="text"></ion-input>
          <ion-input class="input" v-model="user.email" placeholder="E-mail" type="email"></ion-input>
          <ion-input class="input" v-model="user.inicio" placeholder="Inicio" type="date"></ion-input>
          <ion-input class="input" v-model="user.password" placeholder="Contraseña" type="password"></ion-input>
          <ion-select class="input custom-select" v-model="user.plan" placeholder="Seleccionar plan">
            <ion-select-option value="Basico">Basico</ion-select-option>
            <ion-select-option value="Platino">Platino</ion-select-option>
            <ion-select-option value="Oro">Oro</ion-select-option>
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

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 11px;
  font-size: 24px;
  font-weight: bold;
  color: rgb(78, 78, 78);
  background-color: transparent;
  border: none;
}	

.floating-form {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 520px;
  gap: 11px;
  transform: translate(-50%, -50%);
  background-color: transparent; /* Fondo transparente */
  padding: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25); /* Borde del formulario */
  border-radius: 12px; /* Mayor radio para la figura circular */
  box-shadow: 0px 0px 21px 2px rgba(0, 0, 0, 0.25);
  z-index: 1; /* Para que aparezca por encima del contenido */
}

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
  padding-left: 8px;
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