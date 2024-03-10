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
        """Meta class for user data serializer."""

        model = UserData
        fields = "__all__"


class UserDataRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for the user data registration model."""

    class Meta:
        """Meta class for user data registration serializer."""

        model = UserData
        fields = ("first_name", "last_name", "is_clinician")


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""

    userData = UserDataRegistrationSerializer(required=True)

    class Meta:
        """Meta class for user registration serializer"""

        model = User
        fields = ("username", "email", "password", "userData")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        userInfo = validated_data.pop("userData")
        user = User.objects.create_user(**validated_data)
        UserData.objects.create(user=user, **userInfo)
        return user

    def is_valid(self, raise_exception=False):
        """Check if the serializer is valid."""
        password = self.initial_data.get("password")
        password_valid = len(password) >= 8

        if password_valid == False:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long."
            )

        return password_valid and super().is_valid(raise_exception=raise_exception)


class PatientInfoSerializer(serializers.ModelSerializer):
    """Serializer for the patient info model."""

    class Meta:
        """Meta class for patient info serializer."""

        model = PatientInfo
        fields = "__all__"


class TrialSerializer(serializers.ModelSerializer):
    """Serializer for the trial model."""

    class Meta:
        """Meta class for trial serializer."""

        model = Trial
        fields = "__all__"
