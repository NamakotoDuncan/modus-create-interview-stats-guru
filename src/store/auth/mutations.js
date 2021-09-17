import auth from "../../auth";

export default {
  SET_ACCESS_TOKEN(state, accessToken) {
    auth.setAccessToken(accessToken);
  },
  SET_AUTHORIZATION(state, authorization) {
    auth.setAuthorization(authorization);
  },
  LOGOUT() {
    auth.logOut();
  }
};
