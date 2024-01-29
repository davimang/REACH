"""Views for the api service."""
from django.contrib.auth.models import User, Group
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django_filters import rest_framework as filters
from .serializers import (
    UserSerializer,
    GroupSerializer,
    UserDataSerializer,
    PatientInfoSerializer,
    TrialSerializer,
)
from .trial_fetcher import TrialFetcher
from .models import UserData, PatientInfo, Trial


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserDataFilter(filters.FilterSet):
    """Filter for the user data viewset."""

    class Meta:
        """Meta class for user data filter.

        Defines the fields UserData can be filtered on.
        """

        model = UserData
        fields = ["is_clinician"]


class UserDataViewSet(viewsets.ModelViewSet):
    """Api endpoints for user data."""

    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    # permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserDataFilter


class PatientInfoFilter(filters.FilterSet):
    """Filter for the patient info viewset."""

    class Meta:
        """Meta class for patient info filter.

        Defines the fields PatientInfo can be filtered on.
        """

        model = PatientInfo
        fields = ["user_data"]


class PatientInfoViewSet(viewsets.ModelViewSet):
    """Api endpoints for user data."""

    queryset = PatientInfo.objects.all()
    serializer_class = PatientInfoSerializer
    # permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PatientInfoFilter


class TrialFilter(filters.FilterSet):
    """Filter for the trial viewset."""

    class Meta:
        """Meta class for trial filter.

        Defines the fields Trial can be filtered on.
        """

        model = Trial
        fields = ["user_data"]


class TrialViewSet(viewsets.ModelViewSet):
    """Api endpoints for user data."""

    queryset = Trial.objects.all()
    serializer_class = TrialSerializer
    # permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TrialFilter


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Login endpoint"""
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({'access_token': access_token, 'refresh_token': refresh_token}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
def search_trials(request):
    """Endpoint for getting eligible trials"""
    query_params = request.query_params
    # use for trial api request
    age = int(query_params.get("age", 0))
    address = query_params.get("address", None)
    condition = query_params.get("condition")
    trials = TrialFetcher.search_studies(
        conditions=[condition], age=age, address=address
    )
    return Response(trials)
