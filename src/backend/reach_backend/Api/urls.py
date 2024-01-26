"""Api url paths."""
from django.urls import path
from Api import views

urlpatterns = [
    path("search_trials/", views.search_trials, name="search-trials"),
]
