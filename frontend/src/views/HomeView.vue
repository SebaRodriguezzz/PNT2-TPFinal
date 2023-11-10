<script>
import {IonPage, IonContent, IonInput, IonButton} from '@ionic/vue'
import { inject } from 'vue';

export default {
  components: {IonPage, IonContent, IonInput, IonButton},

  setup() {
    // Accede a 'user' proporcionado desde el componente 'LoginView'
    const user = inject('user', null);

    // Ahora puedes acceder a 'user' en este componente
    if (user) {
      console.log(user.username);
      console.log(user.password);
    }

    return { user };
  }
}
</script>


<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-row justify-content-center align-items-center class="ion-text-center">
        <ion-col size="12">
          <h1>Bienvenido al Gimnasio Fitness</h1>
          <h1>Bienvenido al gimnasio PNT2</h1>
        </ion-col>
      </ion-row>

      <!-- Imagen destacada del gimnasio -->
      <ion-row justify-content-center align-items-center class="ion-text-center mt-4">
        <ion-col size="12">
          <ion-img src="https://www.sellingmybusiness.co.uk/images/1920x400/0x0-0x0/selling-a-business/gym-banner.jpg"></ion-img>
        </ion-col>
      </ion-row>

      <!-- Información sobre el gimnasio -->
      <ion-row class="mt-4">
        <ion-col size="12">
          <h2>Nuestro Gimnasio</h2>
          <p>
            En nuestro gimnasio, nos dedicamos a proporcionar un ambiente motivador
            y saludable para alcanzar tus objetivos de fitness. Contamos con instalaciones
            modernas, equipos de última generación y entrenadores calificados que te ayudarán
            en cada paso de tu viaje fitness.
          </p>
        </ion-col>
      </ion-row>

      <!-- Características del gimnasio -->
      <ion-row class="ion-justify-content-around mt-4">
        <ion-col size="12" size-md="4">
          <h3>Equipamiento Moderno</h3>
          <p>Nuestro gimnasio está equipado con lo último en tecnología fitness para brindarte la mejor experiencia de
            entrenamiento.</p>
        </ion-col>
        <ion-col size="12" size-md="4">
          <h3>Clases Variadas</h3>
          <p>Ofrecemos una variedad de clases, desde yoga hasta entrenamiento de alta intensidad, para satisfacer tus
            preferencias y metas.</p>
        </ion-col>
        <ion-col size="12" size-md="4">
          <h3>Entrenadores Expertos</h3>
          <p>Nuestro equipo de entrenadores altamente calificados está aquí para guiarte y motivarte en tu viaje hacia un
            estilo de vida más saludable.</p>
        </ion-col>
      </ion-row>

      <!-- Llamada a la acción -->
      <ion-row justify-content-center align-items-center class="ion-text-center mt-4">
        <ion-col size="12">
          <ion-button expand="full" size="large">¡Comienza tu Viaje Fitness Ahora!</ion-button>
        </ion-col>
      </ion-row>

    </ion-content>

  </ion-page>
</template>

