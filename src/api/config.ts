import axios from "axios";
import { StoredAccount } from "../data/useAccountStore";

export const apiConfig = axios.create({
  baseURL: "https://localhost:8080/api",
});

export const apiWithToken = axios.create({
  baseURL: "https://localhost:8080/api",
});

export const apiWithEtag = axios.create({
  baseURL: "https://localhost:8080/api",
});

apiWithToken.interceptors.request.use(
  function(config) {
    const accountStore = localStorage.getItem("accountStore");
    if (accountStore) {
      const parsedStore = JSON.parse(accountStore) as StoredAccount;

      if (parsedStore.token) {
        config.headers.Authorization = `Bearer ${parsedStore.token}`;
      }
    }

    return config;
  },
  function(error) {
    return error;
  },
);

apiWithEtag.interceptors.request.use(function(config) {
  const etag = localStorage.getItem("etag");
  if (etag) {
    config.headers["If-Match"] = etag;
  }

  const accountStore = localStorage.getItem("accountStore");
  if (accountStore) {
    const parsedStore = JSON.parse(accountStore) as StoredAccount;

    if (parsedStore.token) {
      config.headers.Authorization = `Bearer ${parsedStore.token}`;
    }
  }

  return config;
});

apiWithEtag.interceptors.response.use(function(response) {
  const etag = response.headers["etag"] as string | undefined;
  if (etag) {
    localStorage.setItem("etag", etag.substring(1, etag.length - 1));
  }
  return response;
});


