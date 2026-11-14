import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { restoreSession, subscribe } from "../../api/authClient";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | authed | anon

  useEffect(() => {
    let active = true;

    restoreSession().then((ok) => {
      if (active) setStatus(ok ? "authed" : "anon");
    });

    // logout, or a refresh that failed later, clears the session: leave the page
    const unsubscribe = subscribe((user) => {
      if (active && !user) setStatus("anon");
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted">
        Checking your session...
      </div>
    );
  }

  if (status === "anon") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;

