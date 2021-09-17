<template v-if="appActiveUser.fullName">
  <div class="the-navbar__user-meta flex items-center">
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ appActiveUser.fullName | title }}</p>
      <small>Available</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          v-if="appActiveUser.avatar"
          key="onlineImg"
          :src="
            fileURL({ fileId: appActiveUser.avatar._id, authenticate: false })
          "
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import { mapFilters } from "../../../../utils";

export default {
  data() {
    return {};
  },
  computed: {
    appActiveUser() {
      return this.$store.state.AppActiveUser;
    }
  },
  methods: {
    ...mapFilters(["fileURL"]),
    logout() {
      this.$store.dispatch("AUTH/logout");

      this.$router
        .push({ path: "/login", query: { to: this.$router.currentRoute.path } })
        .catch(() => {});
    }
  }
};
</script>
