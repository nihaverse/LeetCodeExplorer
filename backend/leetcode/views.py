from rest_framework.decorators import api_view
from rest_framework.response import Response

from .client import UpstreamError
from .services import get_profile


@api_view(["GET"])
def profile_view(request, username):
    try:
        data = get_profile(username)
    except UpstreamError as e:
        return Response({"error": e.message}, status=e.status)
    return Response(data)