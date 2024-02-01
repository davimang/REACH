"""Views for the api service."""
from datetime import date
from django.contrib.auth.models import User, Group
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import viewsets, permissions
from rest_framework.response import Response
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

trial_fetcher = TrialFetcher()

gender_mapping = {"M": "Male", "F": "Female", "O": "Other"}


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
        fields = ["patient_profile"]


class TrialViewSet(viewsets.ModelViewSet):
    """Api endpoints for user data."""

    queryset = Trial.objects.all()
    serializer_class = TrialSerializer
    # permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TrialFilter


@api_view(["GET"])
def search_trials(request):
    """Endpoint for getting eligible trials"""
    query_params = request.query_params
    info_profile_id = int(query_params.get("info_id"))
    rank = int(query_params.get("rank", 0))
    if not info_profile_id:
        return Response("Patient information is required to make a search.")
    info_profile = get_object_or_404(PatientInfo, pk=info_profile_id)
    trial_input_info = build_input_info(info_profile=info_profile, rank=rank)
    trials = trial_fetcher.search_studies(trial_input_info)
    return Response(trials)


def build_input_info(info_profile, rank):
    """Helper function to build the dict for trial fetching/filtering."""
    age = calculate_age(info_profile.date_of_birth)
    sex = gender_mapping[info_profile.gender]
    address = info_profile.address
    condition = info_profile.condition
    advanced_info = info_profile.advanced_info
    info = {
        "age": age,
        "sex": sex,
        "address": address,
        "conditions": [condition],
        "maxRank": rank,
        **advanced_info,
    }
    return info


def calculate_age(date_of_birth):
    """Helper function to calculate someones age from their date of birth."""
    today = date.today()
    age = (
        today.year
        - date_of_birth.year
        - ((today.month, today.day) < (date_of_birth.month, date_of_birth.day))
    )
    return age
