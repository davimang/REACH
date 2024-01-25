"""Register django models for the Api service."""
from django.contrib import admin

from .models import UserData, PatientInfo, Trial

admin.site.register(UserData)
admin.site.register(PatientInfo)
admin.site.register(Trial)