import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { parseToken } from "../util/converters";

export enum Role {
  PARTICIPANT = "PARTICIPANT",
  MANAGER = "MANAGER",
  ADMIN = "ADMINISTRATOR",
}

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
  setToken: (
    newToken: string | undefined,
    newParsedToken: ParsedToken | undefined,
  ) => void;
  clearStore: () => void;
};

export type StoredAccount = {
  token: string | undefined;
  parsedToken: ParsedToken | undefined;
};

const useAccountStore = create<AccountStore>()(
  persist(
    function(set) {
      return {
        token: undefined,
        parsedToken: undefined,
        setToken: function(
          newToken: string | undefined,
          newParsedToken: ParsedToken | undefined,
        ) {
          set({
            token: newToken,
            parsedToken: newParsedToken,
          });
        },
        clearStore: function() {
          set({
            token: undefined,
            parsedToken: undefined,
          });
        },
      };
    },
    {
      name: "accountStore",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          const parsedToken = parseToken(state.token);
          state.parsedToken = parsedToken;
        }
      },
      storage: createJSONStorage(function() {
        return sessionStorage;
      }),
    },
  ),
);

export default useAccountStore;
