from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import SignupSerializer, UserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.exceptions import TokenError
from django.conf import settings

from django.middleware.csrf import get_token
from rest_framework.authentication import CSRFCheck
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer


def tokens_for(user):
    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}


def set_refresh_cookie(response, refresh_token):
    response.set_cookie(
        settings.REFRESH_COOKIE_NAME,
        refresh_token,
        max_age=int(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()),
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        path=settings.REFRESH_COOKIE_PATH,
    )


def clear_refresh_cookie(response):
    response.delete_cookie(
        settings.REFRESH_COOKIE_NAME,
        path=settings.REFRESH_COOKIE_PATH,
        samesite=settings.COOKIE_SAMESITE,
    )


def auth_response(user, status_code=status.HTTP_200_OK):
    tokens = tokens_for(user)
    response = Response(
        {"user": UserSerializer(user).data, "access": tokens["access"]},
        status=status_code,
    )
    set_refresh_cookie(response, tokens["refresh"])
    return response

def enforce_csrf(request):
    # DRF skips CSRF unless SessionAuthentication is used, so check it by hand.
    check = CSRFCheck(lambda req: None)
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    if reason:
        raise PermissionDenied(f"CSRF Failed: {reason}")

@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    # signup_view mein, purane return ki jagah:
    return auth_response(user, status.HTTP_201_CREATED)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def login_view(request):
    email = str(request.data.get("email", "")).strip().lower()
    password = request.data.get("password", "")

    user = authenticate(request, username=email, password=password)
    if user is None:
        return Response(
            {"error": "Invalid email or password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    # login_view mein, purane return ki jagah:
    return auth_response(user)

@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def csrf_view(request):
    return Response({"csrfToken": get_token(request)})


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def refresh_view(request):
    enforce_csrf(request)

    token = request.COOKIES.get(settings.REFRESH_COOKIE_NAME)
    if not token:
        return Response(
            {"error": "Not logged in."}, status=status.HTTP_401_UNAUTHORIZED
        )

    serializer = TokenRefreshSerializer(data={"refresh": token})
    try:
        serializer.is_valid(raise_exception=True)
    except (TokenError, InvalidToken, AuthenticationFailed):
        response = Response(
            {"error": "Session expired. Please log in again."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
        clear_refresh_cookie(response)
        return response

    data = serializer.validated_data
    response = Response({"access": data["access"]})
    set_refresh_cookie(response, data["refresh"])
    return response


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def logout_view(request):
    enforce_csrf(request)

    token = request.COOKIES.get(settings.REFRESH_COOKIE_NAME)
    if token:
        try:
            RefreshToken(token).blacklist()
        except TokenError:
            pass  # already expired or blacklisted: logged out either way

    response = Response(status=status.HTTP_204_NO_CONTENT)
    clear_refresh_cookie(response)
    return response

@api_view(["GET"])
def me_view(request):
    # Default auth (JWT) and permission (IsAuthenticated) already apply here.
    return Response(UserSerializer(request.user).data)
