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

                <!-- FOTO -->

                <img
                  :src="foto.caminho"
                  class="foto"
                  alt="Foto"
                  @click="abrirFoto(foto.caminho)"
                />


                <!-- BOTÃO REMOVER -->

                <ion-button
                  expand="block"
                  color="danger"
                  fill="clear"
                  @click.stop="remover(foto.id)"
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


      <!-- MODAL DA FOTO -->

      <ion-modal
        :is-open="fotoSelecionada !== null"
        @didDismiss="fecharFoto"
      >

        <ion-header>

          <ion-toolbar>

            <ion-title>
              Foto
            </ion-title>

            <ion-buttons slot="end">

              <ion-button
                @click="fecharFoto"
              >

                Fechar

              </ion-button>

            </ion-buttons>

          </ion-toolbar>

        </ion-header>


        <ion-content
          class="modal-content"
          @click="fecharFoto"
        >

          <div class="foto-grande-container">

            <img
              v-if="fotoSelecionada"
              :src="fotoSelecionada"
              class="foto-grande"
              alt="Foto ampliada"
              @click.stop
            />

          </div>

        </ion-content>

      </ion-modal>

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
  IonIcon,
  IonModal,
  IonButtons
} from '@ionic/vue'


import {
  imagesOutline,
  trashOutline
} from 'ionicons/icons'


import {
  ref
} from 'vue'


import {
  fotos,
  removerFoto
} from '@/data/fotos'


/*
 * Foto atualmente selecionada
 */

const fotoSelecionada =
  ref<string | null>(null)


/*
 * ABRIR FOTO
 */

function abrirFoto(
  caminho: string
) {

  fotoSelecionada.value =
    caminho

}


/*
 * FECHAR FOTO
 */

function fecharFoto() {

  fotoSelecionada.value =
    null

}


/*
 * REMOVER FOTO
 */

function remover(
  id: number
) {

  removerFoto(id)

}

</script>


<style scoped>

/* =========================
   GALERIA
========================= */

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

  cursor: pointer;

  transition:
    transform 0.2s ease;

}


/*
 * Pequeno efeito ao passar
 * o mouse sobre a foto.
 */

.foto:hover {

  transform: scale(1.03);

}


/* =========================
   MODAL
========================= */

.modal-content {

  --background: rgba(0, 0, 0, 0.95);

}


/*
 * Centraliza a foto
 */

.foto-grande-container {

  width: 100%;

  height: 100%;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 20px;

}


/*
 * Foto ampliada
 */

.foto-grande {

  max-width: 100%;

  max-height: 90vh;

  width: auto;

  height: auto;

  object-fit: contain;

  border-radius: 10px;

}

</style>