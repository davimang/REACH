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

    class Status(models.TextChoices):
        """Enum class for trial recruitment status."""

        RECRUITING = "Recruiting"
        COMPLETED = "Completed"
        UNKNOWN = "Unkown"

    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    profile = models.ForeignKey(PatientInfo, on_delete=models.CASCADE, null=True)
    title = models.TextField()
    description = models.TextField()
    url = models.URLField(max_length=200)
    contact_email = models.EmailField(null=True)
    principal_investigator = models.CharField(max_length=30, null=True)
    location = models.JSONField(null=True)
    status = models.CharField(max_length=10, choices=Status.choices, null=True)
    distance = models.FloatField(null=True)
    nctid = models.CharField(max_length=30, null=True)
