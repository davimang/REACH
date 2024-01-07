"""Module defining the serializers."""
from django.contrib.auth.models import User, Group
from rest_framework import serializers


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
