import { useNavigate, useSearchParams } from "react-router-dom";
import useAccountStore from "../../data/useAccountStore";
import { parseToken } from "../../util/converters";

export default function LoginSuccessPage() {
  const [searchParams, _] = useSearchParams();
  const token = searchParams.get("token");
  const state = useAccountStore(function(state) {
    return state;
  });
  const navigate = useNavigate();

  if (token) {
    const parsedToken = parseToken(token);

    if (parsedToken) {
      state.setToken(token, parsedToken);
      navigate("/");
    } else {
      state.setToken(undefined, undefined);
      navigate("/login");
    }
  }

  return <></>;
}
