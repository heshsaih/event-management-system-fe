import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum Role {
  PARTICIPANT = "PARTICIPANT",
  MANAGER = "MANAGER",
  ADMIN = "ADMINISTRATOR" 
};

export type ParsedToken = {
  sub: string;
  iss: string;
  external_id: string;
  exp: number;
  given_name: string;
  iat: number;
  family_name: string;
  authorities: Role[];
  email: string;
};

type AccountStore = {
  token: string | undefined;
  parsedToken: ParsedToken | undefined;
  setToken: (newToken: string | undefined, newParsedToken: ParsedToken | undefined) => void;
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
    setToken: function(newToken: string | undefined, newParsedToken: ParsedToken | undefined) {
      set({
        token: newToken,
        parsedToken: newParsedToken
      })
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
