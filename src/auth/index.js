const LOCAL_ACCESS_TOKEN = "ebs-access-token";

const LOCAL_AUTHORIZATION = "ebs-authorization";

const LOCAL_USER = "ebs-user";

class AuthService {
  getAccessToken() {
    // return localStorage.getItem(LOCAL_ACCESS_TOKEN);
    return "e22b9b9f383f57f83ea2238626b33a2e";
  }

  setAccessToken(accessToken) {
    if (accessToken) localStorage.setItem(LOCAL_ACCESS_TOKEN, accessToken);
    else localStorage.removeItem(LOCAL_AUTHORIZATION);
  }

  getAuthorization() {
    return localStorage.getItem(LOCAL_AUTHORIZATION);
  }

  setAuthorization(authorization) {
    if (authorization) localStorage.setItem(LOCAL_AUTHORIZATION, authorization);
    else localStorage.removeItem(LOCAL_AUTHORIZATION);
  }

  getUser() {
    // try {
      // return JSON.parse(localStorage.getItem(LOCAL_USER));
      return {
        fullName:'test User'
      };
    // } catch (error) {
    //   return undefined;
    // }
  }

  setUser(user) {
    if (user) localStorage.setItem(LOCAL_USER, JSON.stringify(user));
    else localStorage.removeItem(LOCAL_USER);
  }

  logOut() {
    localStorage.removeItem(LOCAL_AUTHORIZATION);
    localStorage.removeItem(LOCAL_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_USER);
  }

  isAuthenticated() {
    return (
      (!!this.getAccessToken() || !!this.getAuthorization()) && !!this.getUser()
    );
  }
}

export default new AuthService();
