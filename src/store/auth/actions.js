import { api } from "../../axios";

export default {
  login({ commit }, user) {
    return api({ authenticate: false, commit })
      .post("/v1/account/auth/login", user)
      .then(response => {
        const {
          data: { user },
          headers: { authorization, "access-token": accessToken }
        } = response;

        commit("UPDATE_USER", user, { root: true });

        commit("SET_AUTHORIZATION", authorization);

        commit("SET_ACCESS_TOKEN", accessToken);
      });
  },
  logout({ commit }) {
    commit("UPDATE_USER", undefined, { root: true });

    commit("LOGOUT");
  }
};
