<template>

  <ion-page>

    <ion-header>

      <ion-toolbar>

        <ion-title>
          Minhas Fotos
        </ion-title>

      </ion-toolbar>

    </ion-header>


    <ion-content>

      <div class="ion-padding">


        <!-- NENHUMA FOTO -->

        <div
          v-if="fotos.length === 0"
          class="vazio"
        >

          <ion-icon
            :icon="imagesOutline"
            size="large"
          />

          <h2>
            Nenhuma foto
          </h2>

          <p>
            Tire uma foto para ela aparecer aqui.
          </p>

        </div>


        <!-- GALERIA -->

        <ion-grid v-else>

          <ion-row>

            <ion-col
              v-for="foto in fotos"
              :key="foto.id"
              size="6"
              size-md="4"
              size-lg="3"
            >

              <ion-card
                class="foto-card"
              >

                <img
                  :src="foto.caminho"
                  class="foto"
                  alt="Foto"
                />


                <ion-button
                  expand="block"
                  color="danger"
                  fill="clear"
                  @click="remover(foto.id)"
                >

                  <ion-icon
                    :icon="trashOutline"
                    slot="start"
                  />

                  Remover

                </ion-button>

              </ion-card>

            </ion-col>

          </ion-row>

        </ion-grid>

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
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonButton,
  IonIcon
} from '@ionic/vue'


import {
  imagesOutline,
  trashOutline
} from 'ionicons/icons'


import {
  fotos,
  removerFoto
} from '@/data/fotos'


function remover(
  id: number
) {

  removerFoto(id)

}

</script>


<style scoped>

.vazio {

  text-align: center;

  margin-top: 100px;

  opacity: 0.7;

}


.foto-card {

  margin: 6px;

  overflow: hidden;

}


.foto {

  width: 100%;

  height: 180px;

  object-fit: cover;

}

</style>