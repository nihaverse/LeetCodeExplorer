const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

/**
 * Fetch a normalized user profile from the Django backend
 */
export async function getUserProfile(username) {
  let response;
  try {
    response = await fetch(
      `${BASE_URL}/profile/${encodeURIComponent(username)}/`
    );
  } catch {
    throw new Error("Could not reach the server. Is the backend running?");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // response had no JSON body
  }

  if (!response.ok) {
    throw new Error(data?.error || "Failed to fetch user profile");
  }
  return data;
}

