<template>
  <div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />
    <vs-prompt
      title="Log in"
      text="To continue please log in again"
      @accept="login()"
      :active.sync="activePrompt"
    />
    <vs-prompt
      title="Permissions needed"
      color="danger"
      text="You do not have permissions to access this resource. Contact administrator"
      :active.sync="activePromptPermission"
    />
  </div>
</template>

<script>
import themeConfig from "@/../themeConfig.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      vueAppClasses: [],
      activePrompt: false,
      activePromptPermission: false
    };
  },
  computed: {
    ...mapState({
      error: state => state.error
    })
  },
  watch: {
    "$store.state.theme"(val) {
      this.toggleClassInBody(val);
    },
    "$vs.rtl"(val) {
      document.documentElement.setAttribute("dir", val ? "rtl" : "ltr");
    },
    "$store.state.requesting"(val) {
      if (val) this.$vs.loading();
      else this.$vs.loading.close();
    },
    error(val) {
      if (val) {
        const error = { ...val };

        const {
          localError: { message },
          serverError
        } = error;

        let serverMessage;

        if (serverError) {
          const { message: sM, status } = serverError;

          serverMessage = sM;

          this.activePrompt = this.$route.meta.authRequired && status === 401;

          this.activePromptPermission = status === 403;
        }

        this.$vs.notify({
          title: "Something went wrong",
          text: serverError ? `${serverMessage} (CODE: ${status})` : message,
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "danger"
        });

        this.$store.commit("SET_ERROR", undefined);
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch("AUTH/logout");

      this.$router
        .push({ path: "/login", query: { to: this.$router.currentRoute.path } })
        .catch(() => {});
    },
    toggleClassInBody(className) {
      if (className == "dark") {
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
        document.body.classList.add("theme-dark");
      } else if (className == "semi-dark") {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-semi-dark");
      } else {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
      }
    },
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr);
    },
    handleWindowResize() {
      this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);

      // Set --vh property
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    },
    handleScroll() {
      this.$store.commit("UPDATE_WINDOW_SCROLL_Y", window.scrollY);
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);

    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
  async created() {
    let dir = this.$vs.rtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);

    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
