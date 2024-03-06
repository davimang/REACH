from rest_framework.permissions import BasePermission


class IsUser(BasePermission):
    """Custom permission class to allow only users to view or edit their own data."""

    def has_permission(self, request, view):
        """Return True if user id in request is equal to requesting user, False otherwise."""
        user_id = int(request.query_params.get("user_id", 0))
        return user_id == request.user.id
