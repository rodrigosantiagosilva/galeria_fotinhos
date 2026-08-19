<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Login </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-container">
        <h1>Meu App de Fotos</h1>

        <p class="descricao">Entre na sua conta para acessar suas fotos.</p>

        <!-- E-MAIL -->

        <ion-input
          v-model="email"
          label="E-mail"
          label-placement="floating"
          fill="outline"
          type="email"
          autocomplete="email"
          :disabled="carregando"
        />

        <!-- SENHA -->

        <ion-input
          v-model="senha"
          label="Senha"
          label-placement="floating"
          fill="outline"
          type="password"
          autocomplete="current-password"
          :disabled="carregando"
        />

        <!-- BOTÃO LOGIN -->

        <ion-button expand="block" @click="login" :disabled="carregando">
          <ion-spinner v-if="carregando" name="crescent" />

          <span v-else> Entrar </span>
        </ion-button>

        <!-- CADASTRO -->

        <ion-button
          expand="block"
          fill="clear"
          @click="irParaCadastro"
          :disabled="carregando"
        >
          Criar uma conta
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
  IonInput,
  IonButton,
  IonSpinner,
  toastController,
} from "@ionic/vue";

import { ref } from "vue";

import { useRouter } from "vue-router";

import { realizarLogin } from "@/database/databases";

const router = useRouter();

/*
 * CAMPOS DO FORMULÁRIO
 */

const email = ref("");

const senha = ref("");

/*
 * Controla o estado
 * do botão de login.
 */

const carregando = ref(false);

/*
 * MOSTRAR MENSAGEM
 */

async function mostrarMensagem(mensagem: string) {
  const toast = await toastController.create({
    message: mensagem,

    duration: 2000,

    position: "bottom",
  });

  await toast.present();
}

/*
 * LOGIN
 */

async function login() {
  /*
   * Evita que o usuário
   * clique várias vezes
   * no botão.
   */

  if (carregando.value) {
    return;
  }

  /*
   * Limpa espaços do e-mail.
   */

  const emailInformado = email.value.trim();

  const senhaInformada = senha.value;

  /*
   * Verifica os campos.
   */

  if (!emailInformado || !senhaInformada) {
    await mostrarMensagem("Preencha todos os campos.");

    return;
  }

  /*
   * Começa o carregamento.
   */

  carregando.value = true;

  try {
    /*
     * Consulta o banco
     * de dados.
     */

    const usuario = await realizarLogin(emailInformado, senhaInformada);

    if (!usuario) {
      localStorage.removeItem("usuarioLogado");

      await mostrarMensagem("E-mail ou senha incorretos.");

      return;
    }

    // SALVA A SESSÃO
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    // VAI PARA AS TABS
    await router.replace("/tabs/tab1");
  } catch (erro) {
    console.error("Erro ao realizar login:", erro);

    await mostrarMensagem("Ocorreu um erro ao tentar entrar.");
  } finally {
    /*
     * Finaliza o carregamento
     * independente do resultado.
     */

    carregando.value = false;
  }
}

/*
 * IR PARA CADASTRO
 */

function irParaCadastro() {
  router.push("/cadastro");
}
</script>

<style scoped>
.login-container {
  width: 100%;

  max-width: 450px;

  margin: 80px auto;
}

.login-container h1 {
  text-align: center;

  margin-bottom: 10px;
}

.descricao {
  text-align: center;

  opacity: 0.7;

  margin-bottom: 30px;
}

ion-input {
  margin-bottom: 16px;
}

ion-button {
  margin-top: 10px;
}

ion-spinner {
  width: 22px;

  height: 22px;
}
</style>
