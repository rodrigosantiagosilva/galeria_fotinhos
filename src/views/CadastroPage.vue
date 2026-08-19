<template>

  <ion-page>

    <ion-header>

      <ion-toolbar>

        <ion-buttons slot="start">

          <ion-back-button />

        </ion-buttons>

        <ion-title>
          Cadastro
        </ion-title>

      </ion-toolbar>

    </ion-header>


    <ion-content class="ion-padding">

      <div class="cadastro-container">

        <h1>
          Criar conta
        </h1>

        <p class="descricao">
          Crie sua conta para começar.
        </p>


        <!-- NOME -->

        <ion-input
          v-model="nome"
          label="Nome"
          label-placement="floating"
          fill="outline"
          type="text"
          autocomplete="name"
          :disabled="carregando"
        />


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
          autocomplete="new-password"
          :disabled="carregando"
        />


        <!-- BOTÃO -->

        <ion-button
          expand="block"
          @click="cadastrar"
          :disabled="carregando"
        >

          <ion-spinner
            v-if="carregando"
            name="crescent"
          />

          <span v-else>
            Cadastrar
          </span>

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
  IonButtons,
  IonBackButton,
  IonSpinner,
  toastController
} from '@ionic/vue'


import {
  ref
} from 'vue'


import {
  useRouter
} from 'vue-router'


import {
  cadastrarUsuario,
  realizarLogin
} from '@/database/databases'


const router =
  useRouter()


/*
 * CAMPOS
 */

const nome =
  ref('')

const email =
  ref('')

const senha =
  ref('')


/*
 * CONTROLE DO BOTÃO
 */

const carregando =
  ref(false)


/*
 * MOSTRAR TOAST
 */

async function mostrarMensagem(
  mensagem: string
) {

  const toast =
    await toastController.create({

      message:
        mensagem,

      duration:
        2000,

      position:
        'bottom'

    })


  await toast.present()

}


/*
 * CADASTRO
 */

async function cadastrar() {

  /*
   * Evita múltiplos cliques.
   */

  if (carregando.value) {

    return

  }


  /*
   * Limpa os dados.
   */

  const nomeInformado =
    nome.value.trim()

  const emailInformado =
    email.value.trim()

  const senhaInformada =
    senha.value


  /*
   * VALIDAÇÃO
   */

  if (
    !nomeInformado ||
    !emailInformado ||
    !senhaInformada
  ) {

    await mostrarMensagem(
      'Preencha todos os campos.'
    )

    return

  }


  /*
   * Verifica tamanho da senha.
   */

  if (
    senhaInformada.length < 4
  ) {

    await mostrarMensagem(
      'A senha deve possuir pelo menos 4 caracteres.'
    )

    return

  }


  carregando.value =
    true


  try {

    /*
     * CADASTRA NO BANCO
     */

    const resultado =
      await cadastrarUsuario(

        nomeInformado,

        emailInformado,

        senhaInformada

      )


    /*
     * CADASTRO FALHOU
     */

    if (!resultado.sucesso) {

      await mostrarMensagem(
        resultado.mensagem
      )

      return

    }


    /*
     * CADASTRO CONCLUÍDO
     *
     * Agora procuramos o usuário
     * recém-criado no banco.
     */

    const usuario = await realizarLogin(
  emailInformado,
  senhaInformada
)

if (!usuario) {

  await mostrarMensagem(
    'Cadastro realizado, mas não foi possível iniciar a sessão.'
  )

  return
}


localStorage.setItem(
  'usuarioLogado',
  JSON.stringify(usuario)
)


await router.replace(
  '/tabs/tab1'
)

  } catch (erro) {

    console.error(
      'Erro ao cadastrar:',
      erro
    )


    await mostrarMensagem(
      'Ocorreu um erro ao realizar o cadastro.'
    )


  } finally {

    carregando.value =
      false

  }

}

</script>


<style scoped>

.cadastro-container {

  width: 100%;

  max-width: 450px;

  margin: 60px auto;

}


.cadastro-container h1 {

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