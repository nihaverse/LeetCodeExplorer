from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .client import UpstreamError
from .services import get_profile

PROFILE_CACHE_SECONDS = 600


@api_view(["GET"])
def profile_view(request, username):
    key = f"profile:{username.lower()}"

    data = cache.get(key)
    if data is None:
        try:
            data = get_profile(username)
        except UpstreamError as e:
            return Response({"error": e.message}, status=e.status)
        cache.set(key, data, PROFILE_CACHE_SECONDS)

    return Response(data)