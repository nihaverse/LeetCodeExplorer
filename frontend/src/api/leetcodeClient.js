// Base URL of the LeetCode API wrapper
const BASE_URL = ""; // We'll finalize this after selecting the API

/**
 * Fetch user profile
 */
export async function getUserProfile(username) {
  const response = await fetch(`${BASE_URL}/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return await response.json();
}