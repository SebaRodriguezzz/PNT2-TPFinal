<script>
// import { RouterLink, RouterView } from 'vue-router'
import {IonApp, IonRouterOutlet, IonHeader, IonButton } from '@ionic/vue'
import { defineComponent } from 'vue'
import { storeToRefs } from "pinia";
import { loginStore } from './stores/userStore'

export default {
  components: { IonApp, IonRouterOutlet, IonHeader, IonButton },
  setup() {
  

    const store1 = loginStore();
    const { usuario, estaLogeado } = storeToRefs(store1);
    const { logout } = store1;

    return { usuario, estaLogeado};
  },

}
</script>

<template>
  <ion-app>
    <ion-header>
      <RouterLink to="/">Home  |</RouterLink>
      <RouterLink to="/register" v-if="!estaLogeado">Register  |</RouterLink>
      <RouterLink to="/login" v-if="!estaLogeado">Login  |</RouterLink>
      <RouterLink to="/about" v-if="!estaLogeado">About  |</RouterLink>
      <RouterLink to="/exit" v-if="estaLogeado"> Salir  |</RouterLink>
      user {{this.usuario.email}}

      <ion-button fill="clear" @click="logout" v-if="estaLogeado">Logout</ion-button>
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<style scoped>
</style>