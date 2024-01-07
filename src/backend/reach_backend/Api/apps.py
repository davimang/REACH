"""Module to specify django apps."""
from django.apps import AppConfig


class ApiConfig(AppConfig):
    """Api config class."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "Api"
