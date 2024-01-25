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
    class Gender:
        MALE = "M", _("Male")
        FEMALE = "F", _("Female")
        OTHER = "O", _("Other")

    user = models.ForeignKey(UserData)
    date_of_birth = models.DateField()
    #address = ?
    gender = models.CharField(
        max_length=1,
        choices=Gender
    )
    advanced_info = models.JSONField()

class Trial(models.Model):
    """Trial model."""
    user = models.ForeignKey(UserData)
    title = models.TextField()
    description = models.TextField()
    url = models.URLField(max_length=200)