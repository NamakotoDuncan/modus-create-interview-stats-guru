// axios
import axios from "axios";
// import auth from "./auth";
import { BASE_API_URL, TIMEOUT } from "./config";

export const api = (options = { authenticate: true }) => {
  let config = {
    baseURL: BASE_API_URL,
    timeout: TIMEOUT
  };

  let headers = {

  };

  const { authenticate, commit } = options;
  
  if (Object.keys(headers).length) config = { ...config, ...{ headers } };

  const client = axios.create(config);

  client.interceptors.request.use(config => {
    commit("SET_ERROR", undefined, { root: true });

    commit("SET_REQUESTING", true, { root: true });

    return config;
  });

  client.interceptors.response.use(
    response => {
      commit("SET_ERROR", undefined, { root: true });

      commit("SET_REQUESTING", false, { root: true });

      return response;
    },
    error => {
      const { message, response } = error;

      let serverError;

      if (response) {
        const {
          data: { error: sE },
          status,
          statusText
        } = response;

        serverError = { ...sE, ...{ status, statusText } };
      }

      commit(
        "SET_ERROR",
        {
          localError: { message },
          serverError: serverError,
          createdAt: new Date()
        },
        { root: true }
      );

      commit("SET_REQUESTING", false, { root: true });

      return Promise.reject(error);
    }
  );

  return client;
};

export const paginate = (url, options = {}) => {
  const { sort, limit, page } = options;

  let link = url;

  if (!link.includes("?")) link = `${link}?`;

  if (!link.endsWith("?") && !link.endsWith("&")) link = `${link}&`;

  return `${link}sort=${sort}&limit=${limit}&page=${page}`;
};

export default api();
