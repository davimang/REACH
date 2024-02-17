"""Module defining the models for the Api service."""
from django.db import models
from django.contrib.auth.models import User


class UserData(models.Model):
    """User data model."""

    created = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    is_clinician = models.BooleanField()
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    class Meta:
        """Meta class for user data model."""

        ordering = ["created"]


class PatientInfo(models.Model):
    """Patient info model."""

    class Gender(models.TextChoices):
        """Enum class for Gender."""

        MALE = "M", "Male"
        FEMALE = "F", "Female"
        OTHER = "O", "Other"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    address = models.JSONField(null=True)
    gender = models.CharField(max_length=1, choices=Gender.choices)
    advanced_info = models.JSONField(null=True)
    # title for the information profile
    title = models.CharField(max_length=20, default="")
    # for now, one condition per profile
    condition = models.CharField(max_length=30, default="")


class Trial(models.Model):
    """Trial model."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    title = models.TextField()
    description = models.TextField()
    url = models.URLField(max_length=200)
