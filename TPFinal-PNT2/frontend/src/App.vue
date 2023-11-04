<script>
// import { RouterLink, RouterView } from 'vue-router'
import {IonApp, IonRouterOutlet, IonHeader, IonButton } from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from './stores/userStore'

export default {
  components: { IonApp, IonRouterOutlet, IonHeader, IonButton },
  setup() {
    const store1 = loginStore();
    const { esAlumno,esProfe,esAdmin,usuario, estaLogeado} = storeToRefs(store1);
    const { logout } = store1;

    return {esAlumno,esProfe,esAdmin,usuario, estaLogeado, logout};
  },
  methods: {
       logoutForm() {
        this.logout();
        this.$router.push("/login")
      }
  }

}
</script>

<template>
  <ion-app>
    <ion-header>
      <RouterLink to="/">Home  |</RouterLink>
      <RouterLink to="/alumnos/agregar" v-if="estaLogeado && esAdmin">Agregar Alumnos Admin  |</RouterLink>
      <RouterLink to="/alumno/inicio" v-if="estaLogeado && esAlumno">Vista de alumno |</RouterLink>
      <RouterLink to="/profe/inicio" v-if="estaLogeado && esProfe">Vista de profe |</RouterLink>
      <RouterLink to="/login" v-if="!estaLogeado">Login  |</RouterLink>
      <RouterLink to="/about" v-if="estaLogeado">About  |</RouterLink>
      <ion-button fill="clear" @click="logoutForm" v-if="estaLogeado">Logout</ion-button>
      user {{this.usuario.email}}
     

    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<style scoped>
</style>