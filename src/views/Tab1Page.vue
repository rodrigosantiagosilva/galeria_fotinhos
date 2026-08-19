<template>

  <ion-page>

    <ion-header>

      <ion-toolbar>

        <ion-title>
          Câmera
        </ion-title>

      </ion-toolbar>

    </ion-header>


    <ion-content class="ion-padding">

      <div class="camera-container">

        <h1>
          Adicionar foto
        </h1>

        <p>
          Escolha uma opção:
        </p>


        <ion-button
          expand="block"
          @click="tirarFoto"
        >

          <ion-icon
            :icon="cameraOutline"
            slot="start"
          />

          Tirar Foto

        </ion-button>


        <ion-button
          expand="block"
          fill="outline"
          @click="abrirGaleria"
        >

          <ion-icon
            :icon="imagesOutline"
            slot="start"
          />

          Escolher da Galeria

        </ion-button>

      </div>

    </ion-content>

  </ion-page>

</template>


<script setup lang="ts">

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/vue'


import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera'


import {
  cameraOutline,
  imagesOutline
} from 'ionicons/icons'


import {
  useRouter
} from 'vue-router'


import {
  adicionarFoto
} from '@/data/fotos'


const router =
  useRouter()


/*
 * CÂMERA
 */

async function tirarFoto() {

  try {

    const foto =
      await Camera.getPhoto({

        quality: 90,

        allowEditing: false,

        resultType:
          CameraResultType.DataUrl,

        source:
          CameraSource.Camera

      })


    if (!foto.dataUrl) {

      return

    }


    /*
     * Adiciona a foto
     * ao vetor.
     */

    adicionarFoto(
      foto.dataUrl
    )


    /*
     * Vai para a Tab 2.
     */

    await router.replace(
      '/tabs/tab2'
    )


  } catch (erro) {

    console.error(
      'Erro ao tirar foto:',
      erro
    )

  }

}


/*
 * GALERIA
 */

async function abrirGaleria() {

  try {

    const foto =
      await Camera.getPhoto({

        quality: 90,

        allowEditing: false,

        resultType:
          CameraResultType.DataUrl,

        source:
          CameraSource.Photos

      })


    if (!foto.dataUrl) {

      return

    }


    adicionarFoto(
      foto.dataUrl
    )


    await router.replace(
      '/tabs/tab2'
    )


  } catch (erro) {

    console.error(
      'Erro ao abrir galeria:',
      erro
    )

  }

}

</script>


<style scoped>

.camera-container {

  max-width: 450px;

  margin: 80px auto;

  text-align: center;

}


.camera-container h1 {

  margin-bottom: 10px;

}


.camera-container p {

  opacity: 0.7;

  margin-bottom: 30px;

}


ion-button {

  margin-bottom: 15px;

}

</style>