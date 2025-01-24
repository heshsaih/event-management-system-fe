import axios from "axios";

export const apiConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiWithToken = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiWithEtag = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiWithToken.interceptors.request.use(function (config) {
  const accountStore = sessionStorage.getItem("accountStore");
  if (accountStore) {
    const parsedStore = JSON.parse(accountStore) as {
      state: { token: string | undefined };
    };
    if (parsedStore.state.token) {
      config.headers.Authorization = `Bearer ${parsedStore.state.token}`;
    }
  }
  return config;
});

apiWithEtag.interceptors.request.use(function (config) {
  const etag = sessionStorage.getItem("etag");
  if (etag) {
    config.headers["If-Match"] = etag;
  }
  const accountStore = sessionStorage.getItem("accountStore");
  if (accountStore) {
    const parsedStore = JSON.parse(accountStore) as {
      state: { token: string | undefined };
    };
    if (parsedStore.state.token) {
      config.headers.Authorization = `Bearer ${parsedStore.state.token}`;
    }
  }
  return config;
});

apiWithEtag.interceptors.response.use(function (response) {
  const etag = response.headers["etag"] as string | undefined;
  if (etag) {
    sessionStorage.setItem("etag", etag.substring(1, etag.length - 1));
  }
  return response;
});
