"""Views for the api service."""
from django.contrib.auth.models import User, Group
from rest_framework.decorators import api_view
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import UserSerializer, GroupSerializer, UserDataSerializer, PatientInfoSerializer, TrialSerializer
from .trial_fetcher import TrialFetcher
from .models import UserData, PatientInfo, Trial
from django_filters import rest_framework as filters


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    #permission_classes = [permissions.IsAuthenticated]


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
        model = UserData
        fields = ['is_clinician']


class UserDataViewSet(viewsets.ModelViewSet):
    """Api endpoints for user data."""

    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    #permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserDataFilter


class PatientInfoFilter(filters.FilterSet):
    """Filter for the patient info viewset."""
    class Meta:
        model = PatientInfo
        fields = ['user']


class PatientInfoViewSet(viewsets.ModelViewSet):
    """Api endpoints for user data."""

    queryset = PatientInfo.objects.all()
    serializer_class = PatientInfoSerializer
    #permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PatientInfoFilter


class TrialFilter(filters.FilterSet):
    """Filter for the trial viewset."""
    class Meta:
        model = Trial
        fields = ['user']


class TrialViewSet(viewsets.ModelViewSet):
    """Api endpoints for user data."""

    queryset = Trial.objects.all()
    serializer_class = TrialSerializer
    #permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TrialFilter


# temporary endpoint for POC


@api_view(["GET"])
def fetch_trials(request):
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
