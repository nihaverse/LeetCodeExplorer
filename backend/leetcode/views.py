from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .client import UpstreamError
from .services import get_profile

PROFILE_CACHE_SECONDS = 600            # 10 min: seedha cache se
STALE_CACHE_SECONDS = 60 * 60 * 24  # 1 din: sirf upstream fail hone par


@api_view(["GET"])
def profile_view(request, username):
    key = f"profile:{username.lower()}"
    stale_key = f"profile_stale:{username.lower()}"

    data = cache.get(key)
    if data is None:
        try:
            data = get_profile(username)
        except UpstreamError as e:
            # "User not found" par purana data mat dikhao
            if e.status != 404:
                stale = cache.get(stale_key)
                if stale is not None:
                    return Response(stale)
            return Response({"error": e.message}, status=e.status)
        cache.set(key, data, PROFILE_CACHE_SECONDS)
        cache.set(stale_key, data, STALE_CACHE_SECONDS)

    return Response(data)