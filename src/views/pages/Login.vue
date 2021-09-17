<template>
    <div>
      <div id="loading-bg">
        <div class="loading-logo">
          <!-- <img src="<%= BASE_URL %>logo.png" alt="Logo" /> -->
        </div>
        <div class="loading">
          <div class="effect-1 effects"></div>
          <div class="effect-2 effects"></div>
          <div class="effect-3 effects"></div>
        </div>
      </div>
    </div>
</template>

<script>
const { SSO_URL, APP_ID, HOST } = require('../../config');
import auth from '../../auth';
export default {
  name: 'Login',
  beforeRouteEnter: (to, from, next) => {
    if (auth.isAuthenticated()) {
      next(to.query.to);
      return;
    }
    localStorage.clear();

    location.href = `${SSO_URL}/${encodeURIComponent(HOST + to.query.to)}/${APP_ID}`;
  }
}
</script>