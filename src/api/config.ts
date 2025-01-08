import axios from "axios";

export const apiConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL
});

export const apiWithToken = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export const apiWithEtag = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

apiWithToken.interceptors.request.use(
  function (config) {
        const accountStore = localStorage.getItem("accountStore");
        if (accountStore) {
          const parsedStore = JSON.parse(accountStore) as {
            state: { token: string | undefined };
          };
          if (parsedStore.state.token) {
            config.headers.Authorization = `Bearer ${parsedStore.state.token}`;
          }
        }
    return config;
  },
  function (error) {
    return error;
  },
);

apiWithEtag.interceptors.request.use(function (config) {
  const etag = localStorage.getItem("etag");
  if (etag) {
    config.headers["If-Match"] = etag;
  }
  //  const accountStore = localStorage.getItem("accountStore");
  //  if (accountStore) {
  //    const parsedStore = JSON.parse(accountStore) as {
  //      state: { token: string | undefined };
  //    };
  //    if (parsedStore.state.token) {
  //      config.headers.Authorization = `Bearer ${parsedStore.state.token}`;
  //    }
  //  }
  return config;
});

apiWithEtag.interceptors.response.use(function (response) {
  const etag = response.headers["etag"] as string | undefined;
  if (etag) {
    localStorage.setItem("etag", etag.substring(1, etag.length - 1));
  }
  return response;
});
