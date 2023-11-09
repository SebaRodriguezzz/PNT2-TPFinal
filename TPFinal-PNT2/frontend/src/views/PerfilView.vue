<script>
import {IonPage, IonContent, IonInput, IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonPage, IonContent, IonInput, IonButton},

  setup() {
    const store = loginStore();
    const { usuario } = storeToRefs(store);
    return { usuario };
  },
}
</script>

<template>

  <ion-page>
    <ion-content class="ion-padding">
      <div class="container">
        <div class="login-text">Perfil</div>
    <h2>Datos del perfil</h2>
    {{ usuario.email }}
    <br>
    {{ usuario.password }}
     <ion-button >Modificar email</ion-button>
     <ion-button >Modificar contraseña</ion-button>
    </div>
    </ion-content>
  </ion-page>
   

</template>
