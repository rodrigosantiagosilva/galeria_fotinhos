import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  // LOGIN
  {
    path: "/",
    component: () => import("@/views/LoginPage.vue"),
  },

  // CADASTRO
  {
    path: "/cadastro",
    component: () => import("@/views/CadastroPage.vue"),
  },
  {
    path: "/tabs/",
    component: TabsPage,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, _from, next) => {
  /*
   * Verifica se existe
   * usuário logado.
   */

  const usuarioLogado = localStorage.getItem("usuarioLogado");

  /*
   * Se a página exige login
   * e não existe usuário,
   * volta para o login.
   */

  if (to.meta.requiresAuth && !usuarioLogado) {
    next("/");

    return;
  }

  /*
   * Se já está logado e
   * tenta acessar o login,
   * manda para a Home.
   */

  if (to.path === "/" && usuarioLogado) {
    next("/tabs/tab1");

    return;
  }

  /*
   * Permite a navegação.
   */

  next();
});

export default router;
