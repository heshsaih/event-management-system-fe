import { Navigate, Outlet } from "react-router-dom";
import useAccountStore from "../data/useAccountStore";

export default function AuthGuard() {
  const parsedToken = useAccountStore(function(state) {
    return state.parsedToken;
  });

  if (parsedToken && parsedToken.authorities.length > 0) {
    return <Outlet></Outlet>;
  } else {
    return <Navigate to={"/not-found"}></Navigate>
  } 
}
