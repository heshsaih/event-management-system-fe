import { useState } from "react";

export default function useLogin() {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  async function login() {
    setIsFetching(true);
    location.replace(import.meta.env.VITE_BASE_API_URL + "/oauth2/authorization/google");
  }

  return { isFetching, login };
}
