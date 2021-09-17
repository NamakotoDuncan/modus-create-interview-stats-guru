import auth from "../../auth";

export default {
  isLoggedIn: () => {
    return auth.isAuthenticated();
  }
};
