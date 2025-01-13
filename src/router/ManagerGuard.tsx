import { Navigate, Outlet } from "react-router-dom";
import { Role } from "../data/useAccountStore";
import useAccountStore from "../data/useAccountStore";

export default function ManagerGuard() {
  const parsedToken = useAccountStore(function(state) {
    return state.parsedToken;
  });

  if (parsedToken && parsedToken.authorities.includes(Role.MANAGER)) {
    return <Outlet></Outlet>;
  } else {
    return <Navigate to="/not-found"></Navigate>
  }
}
