"""Api url paths."""

from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    search_trials,
    UserRegistrationView,
)


urlpatterns = [
    path("search_trials/", search_trials, name="search-trials"),
    path("register/", UserRegistrationView.as_view(), name="user-registration"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
