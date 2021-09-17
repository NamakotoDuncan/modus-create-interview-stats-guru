import Vue from "vue";
import Router from "vue-router";
import auth from "./auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      redirect: "/stat-guru",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        //  Routes
        // =============================================================================
        //
        {
          path: "/stat-guru",
          name: "stat-guru",
          component: () => import("./views/dashboard/Dashboard.vue"),
          meta: {
            authRequired: false,
            breadcrumb: [
              { title: "stat-guru", url: "/" },
              { title: "stat-guru", active: true }
            ]
          }
        },
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/login",
          name: "login",
          component: () => import("@/views/pages/Login.vue")
        },
        {
          path: "/error-404",
          name: "error-404",
          component: () => import("@/views/pages/Error404.vue")
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/error-404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired && !auth.isAuthenticated())
    router.push({ path: "/login", query: { to: to.path } });

  return next();
});

export default router;
