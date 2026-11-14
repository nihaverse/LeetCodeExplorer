from django.urls import path

from .views import csrf_view, login_view, logout_view, me_view, refresh_view, signup_view

urlpatterns = [
    path("csrf/", csrf_view, name="csrf"),
    path("signup/", signup_view, name="signup"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("token/refresh/", refresh_view, name="token-refresh"),
    path("me/", me_view, name="me"),
]
