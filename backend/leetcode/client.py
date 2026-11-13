import time

import requests
from django.conf import settings

# Free hosting sleeps when idle; the first request can take a minute to wake it up.
RETRY_STATUSES = {502, 503, 504}
MAX_ATTEMPTS = 4
RETRY_DELAY_SECONDS = 8
REQUEST_TIMEOUT_SECONDS = 25


class UpstreamError(Exception):
    def __init__(self, message, status=502):
        super().__init__(message)
        self.message = message
        self.status = status


def fetch(path):
    url = f"{settings.LEETCODE_API_BASE}{path}"
    last_error = None

    for attempt in range(MAX_ATTEMPTS):
        if attempt:
            time.sleep(RETRY_DELAY_SECONDS)

        try:
            response = requests.get(url, timeout=REQUEST_TIMEOUT_SECONDS)
        except requests.Timeout:
            last_error = UpstreamError("LeetCode data source timed out.", 504)
            continue
        except requests.RequestException:
            last_error = UpstreamError("Could not reach the LeetCode data source.", 502)
            continue

        if response.status_code in RETRY_STATUSES:
            last_error = UpstreamError("LeetCode data source returned an error.", 502)
            continue

        break
    else:
        raise last_error

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