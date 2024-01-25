"""Module defining the models for the Api service."""
from django.db import models

class UserData(models.Model):
    """User data model."""
    created = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    is_clinician = models.BooleanField()

    class Meta:
        ordering = ['created']


class PatientInfo(models.Model):
    """Patient info model."""
    class Gender(models.TextChoices):
        MALE = "M", "Male"
        FEMALE = "F", "Female"
        OTHER = "O", "Other"

    user = models.ForeignKey(UserData, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    #address = ?
    gender = models.CharField(
        max_length=1,
        choices=Gender.choices
    )
    advanced_info = models.JSONField()

class Trial(models.Model):
    """Trial model."""
    user = models.ForeignKey(UserData, on_delete=models.CASCADE)
    title = models.TextField()
    description = models.TextField()
    url = models.URLField(max_length=200)