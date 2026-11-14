import { API_BASE_URL, authFetch } from "./authClient";

/**
 * Fetch a normalized user profile from the Django backend.
 * authFetch adds the access token and retries once after a refresh on 401.
 */
export async function getUserProfile(username) {
  let response;
  try {
    response = await authFetch(
      `${API_BASE_URL}/profile/${encodeURIComponent(username)}/`
    );
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // response had no JSON body
  }

  if (response.status === 401) {
    throw new Error("Your session has expired. Please log in again.");
  }
  if (!response.ok) {
    throw new Error(data?.error || "Failed to fetch user profile");
  }
  return data;
}
