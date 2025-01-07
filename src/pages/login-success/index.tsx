import { useNavigate, useSearchParams } from "react-router-dom";
import useAccountStore from "../../data/useAccountStore";
import { parseToken } from "../../util/converters";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function LoginSuccessPage() {
  const [searchParams, _] = useSearchParams();
  const token = searchParams.get("token");
  const state = useAccountStore(function(state) {
    return state;
  });
  const navigate = useNavigate();

  console.log(token);

  useEffect(function() {
    if (token) {
      const parsedToken = parseToken(token);

      if (parsedToken) {
        state.setToken(token, parsedToken);
        toast.success(
          `Zalogowano pomyślnie, witaj ${parsedToken.given_name} ${parsedToken.family_name}!`,
        );
        navigate("/")
      } else {
        state.setToken(undefined, undefined);
        toast.success("Nie udało się zalogować");
        navigate("/login")
      }
    }
  }, []);

  return <></>;
}
