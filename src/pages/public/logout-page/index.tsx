import { Navigate } from "react-router-dom";
import useAccountStore from "../../../data/useAccountStore";
import toast from "react-hot-toast";

export default function LogoutPage() {
  const state = useAccountStore(function (state) {
    return state;
  });

  if (state.token) {
    state.clearStore();
    toast.success("Wylogowano pomyślnie, do zobaczenia!");
  }

  return <Navigate to={"/"}></Navigate>;
}
