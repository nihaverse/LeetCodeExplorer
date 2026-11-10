import requests
from django.conf import settings


class UpstreamError(Exception):
    def __init__(self, message, status=502):
        super().__init__(message)
        self.message = message
        self.status = status


def fetch(path):
    url = f"{settings.LEETCODE_API_BASE}{path}"
    try:
        response = requests.get(url, timeout=30)
    except requests.Timeout:
        raise UpstreamError("LeetCode data source timed out.", 504)
    except requests.RequestException:
        raise UpstreamError("Could not reach the LeetCode data source.", 502)

    if response.status_code == 429:
        raise UpstreamError("Rate limit reached. Please try again later.", 429)
    if response.status_code != 200:
        raise UpstreamError("LeetCode data source returned an error.", 502)

    try:
        data = response.json()
    except ValueError:
        raise UpstreamError("Invalid response from LeetCode data source.", 502)

    if isinstance(data, dict) and data.get("errors"):
        raise UpstreamError("User not found.", 404)

    return data