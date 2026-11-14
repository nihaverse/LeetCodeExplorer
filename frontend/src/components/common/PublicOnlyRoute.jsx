import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { restoreSession } from "../../api/authClient";

function PublicOnlyRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    restoreSession().then((ok) => {
      if (active && ok) navigate("/dashboard", { replace: true });
    });

    return () => {
      active = false;
    };
  }, [navigate]);

  return children;
}

export default PublicOnlyRoute;

