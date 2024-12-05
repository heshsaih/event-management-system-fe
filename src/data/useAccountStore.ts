import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { parseToken } from "../util/converters";

export enum Role {
  PARTICIPANT = "PARTICIPANT",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN" 
};

export type ParsedToken = {
  exp: number;
  iat: number;
  jti: string;
  role: {authority: Role}[];
  sub: string;
};

type AccountStore = {
  token: string | undefined;
  parsedToken: ParsedToken | undefined;
  setToken: (newToken: string) => void;
  clearStore: () => void;
};

export type StoredAccount = {
  token: string | undefined;
  parsedToken: ParsedToken | undefined;
}

const useAccountStore = create(persist<AccountStore>(function (set) {
  return {
    token: undefined,
    parsedToken: undefined,
    setToken: function(newToken: string) {
      set({
        token: newToken,
        parsedToken: parseToken(newToken)
      });
    },
    clearStore: function () {
      set({
        token: undefined,
        parsedToken: undefined
      })
    }
  }
}, {
  name: "accountStore",
  storage: createJSONStorage(function () {
    return localStorage;
  })
}));

export default useAccountStore;
