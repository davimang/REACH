"""Custom permission classes for API views."""

from rest_framework.permissions import BasePermission


class IsUser(BasePermission):
    """Custom permission class to allow only users to view or edit their own data."""

    def has_permission(self, request, view):
        """Return True if user in request is equal to requesting user"""
        if request.query_params.get("user_id") is not None:
            user_id = int(request.query_params.get("user_id", 0))
        else:
            user_id = int(request.query_params.get("user", 0))

        if user_id == 0:
            return False

        return user_id == request.user.id


class IsObjectOwner(BasePermission):
    """Custom permission class to allow only users to view or edit their own data."""

    def has_object_permission(self, request, view, obj):
        """Return True if user for object is equal to requesting user"""

        if obj.user.id == request.user.id:
            return True

        return False
