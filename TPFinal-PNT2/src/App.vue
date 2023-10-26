<script>
import {IonApp, IonRouterOutlet, IonHeader} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from './stores/userStore';

export default {
  components: { IonApp, IonRouterOutlet, IonHeader},
  setup() {

    const store1 = loginStore();
    const {usuario, estaLogeado } = storeToRefs(store1);
    const { logout } = store1;

    return { usuario, estaLogeado}
  },
}
</script>

<template>
  <ion-app>
    <ion-header>
      <RouterLink to="/home" v-if="estaLogeado">Home  |</RouterLink>
      <RouterLink to="/" v-if="!estaLogeado">LogIn  |</RouterLink>
    </ion-header>
    <ion-router-outlet />
  </ion-app>

  <RouterView />
</template>

<style scoped>
</style>
