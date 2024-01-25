"""Module defining the serializers."""
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import UserData, PatientInfo, Trial


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """Sample serializer for users."""

    class Meta:
        """Meta class for user serializer."""
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """Sample serializer for groups."""

    class Meta:
        """Meta class for group serializer."""
        model = Group
        fields = ["url", "name"]


class UserDataSerializer(serializers.ModelSerializer):
    """Serializer for the user data model."""
    class Meta:
        model = UserData
        fields = ['first_name', 'last_name', 'is_clinician']


class PatientInfoSerializer(serializers.ModelSerializer):
    """Serializer for the patient info model."""
    class Meta:
        model = PatientInfo
        fields = ['date_of_birth', 'gender', 'advanced_info']


class TrialSerializer(serializers.ModelSerializer):
    """Serializer for the trial model."""
    class Meta:
        model = Trial
        fields = ['title', 'description', 'url']
