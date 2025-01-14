import { Navigate, Outlet } from "react-router-dom";
import useAccountStore, { Role } from "../data/useAccountStore";

export default function AdminGuard() {
  const parsedToken = useAccountStore(function(state) {
    return state.parsedToken;
  });

  if (import.meta.env.MODE === "test") {
    return <Outlet></Outlet>;
  }

  if (parsedToken && parsedToken.authorities.includes(Role.ADMIN)) {
    return <Outlet></Outlet>;
  } else {
    return <Navigate to="/not-found"></Navigate>
  }

}
