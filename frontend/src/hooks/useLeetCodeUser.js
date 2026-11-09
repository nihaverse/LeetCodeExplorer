import { useState, useEffect } from "react";
import { getUserProfile } from "../api/leetcodeClient";
function useLeetCodeUser(username) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!username) return;
    async function fetchUser() {
      try {
        setLoading(true);
        setError("");
        const data = await getUserProfile(username);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [username]);
  return {
    user,
    loading,
    error,
  };
}

export default useLeetCodeUser;