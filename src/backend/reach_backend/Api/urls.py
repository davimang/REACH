"""Api url paths."""

from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    search_trials,
    check_username,
    UserRegistrationView,
)


urlpatterns = [
    path("search_trials/", search_trials, name="search-trials"),
    path("check_username/", check_username, name="check-username"),
    path("register/", UserRegistrationView.as_view(), name="user-registration"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
