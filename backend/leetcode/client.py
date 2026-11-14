import time

import requests
from django.conf import settings

# Free hosting sleeps when idle; waking it can take a minute or more.
RETRY_STATUSES = {502, 503, 504}
RETRY_DELAY_SECONDS = 5
REQUEST_TIMEOUT_SECONDS = 20
RETRY_BUDGET_SECONDS = 90  # stay under Vercel's 120s proxy timeout and gunicorn's 150s


class UpstreamError(Exception):
    def __init__(self, message, status=502):
        super().__init__(message)
        self.message = message
        self.status = status


def fetch(path):
    url = f"{settings.LEETCODE_API_BASE}{path}"
    started = time.monotonic()

    while True:
        error = None
        response = None

        try:
            response = requests.get(url, timeout=REQUEST_TIMEOUT_SECONDS)
        except requests.Timeout:
            error = UpstreamError("LeetCode data source timed out.", 504)
        except requests.RequestException:
            error = UpstreamError("Could not reach the LeetCode data source.", 502)
        else:
            if response.status_code in RETRY_STATUSES:
                error = UpstreamError("LeetCode data source returned an error.", 502)

        if error is None:
            break

        elapsed = time.monotonic() - started
        if elapsed + RETRY_DELAY_SECONDS + REQUEST_TIMEOUT_SECONDS > RETRY_BUDGET_SECONDS:
            raise error
        time.sleep(RETRY_DELAY_SECONDS)

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