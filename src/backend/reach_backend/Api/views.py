"""Views for the api service."""

import json
from datetime import date
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django_filters import rest_framework as filters
from .serializers import (
    UserSerializer,
    GroupSerializer,
    UserRegistrationSerializer,
    UserDataSerializer,
    PatientInfoSerializer,
    TrialSerializer,
)
from .trial_fetcher import TrialFetcher
from .models import UserData, PatientInfo, Trial
from .permissions import IsUser, IsObjectOwner

User = get_user_model()

trial_fetcher = TrialFetcher()

gender_mapping = {"M": "Male", "F": "Female", "O": "Other"}


class UserViewSet(viewsets.ModelViewSet):
    """API endpoint that allows users to be viewed or edited."""

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class GroupViewSet(viewsets.ModelViewSet):
    """API endpoint that allows groups to be viewed or edited."""

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAdminUser]


class UserRegistrationView(generics.CreateAPIView):
    """User Registration view"""

    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        refresh_token = str(refresh)
        access_token = str(refresh.access_token)

        return Response({"refresh": refresh_token, "access": access_token})


@api_view(["GET"])
def check_username(request):
    """Endpoint to check if a username is available to be used."""
    if "username" in request.GET:
        username = request.GET["username"]
        user_exists = User.objects.filter(username=username).exists()

        return Response({"available": (not user_exists) and (len(username) > 0)})

    return Response({"error": "Username parameter not provided"}, status=400)


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

    def get_queryset(self):
        """Get the queryset for the user data viewset."""
        return UserData.objects.filter(user=self.request.user)

    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [permissions.IsAuthenticated, IsObjectOwner]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserDataFilter


class PatientInfoFilter(filters.FilterSet):
    """Filter for the patient info viewset."""

    class Meta:
        """Meta class for patient info filter.

        Defines the fields PatientInfo can be filtered on.
        """

        model = PatientInfo
        fields = ["user"]


class PatientInfoViewSet(viewsets.ModelViewSet):
    """Api endpoints for patient info."""

    def get_queryset(self):
        """Get the queryset for the patient info viewset."""
        return PatientInfo.objects.filter(user=self.request.user)

    queryset = PatientInfo.objects.all()
    serializer_class = PatientInfoSerializer
    permission_classes = [permissions.IsAuthenticated, IsObjectOwner]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PatientInfoFilter


class TrialFilter(filters.FilterSet):
    """Filter for the trial viewset."""

    class Meta:
        """Meta class for trial filter.

        Defines the fields Trial can be filtered on.
        """

        model = Trial
        fields = ["user", "profile"]


class TrialViewSet(viewsets.ModelViewSet):
    """Api endpoints for user data."""

    def get_queryset(self):
        """Get the queryset for the trial viewset."""
        return Trial.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    queryset = Trial.objects.all()
    serializer_class = TrialSerializer
    permission_classes = [permissions.IsAuthenticated, IsObjectOwner]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TrialFilter


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated, IsUser])
def search_trials(request):
    """Endpoint for getting eligible trials"""
    query_params = request.query_params
    info_profile_id = int(query_params.get("info_id", 0))
    next_page = str(query_params.get("next_page", ""))
    user_id = int(query_params.get("user_id"))
    max_distance = (
        int(query_params.get("max_distance"))
        if query_params.get("max_distance")
        else 15000
    )
    if not info_profile_id:
        return Response(
            "Patient information is required to make a search.",
            status=status.HTTP_400_BAD_REQUEST,
        )
    info_profile = get_object_or_404(PatientInfo, pk=info_profile_id)
    trial_input_info = build_input_info(
        info_profile=info_profile, next_page=next_page, max_distance=max_distance
    )
    trials = trial_fetcher.search_studies(trial_input_info)
    if(not isinstance(trials, dict)):
        return Response(json.dumps(None))
    # saved trials attached to current search profile
    saved_trials = Trial.objects.values_list("nctid", flat=True).filter(user=user_id)

    for trial in trials.values():
        trial["saved"] = False
        if trial["NCTId"] in saved_trials:
            trial["saved"] = True
            trial["savedId"] = Trial.objects.filter(nctid=trial["NCTId"])[0].id

    return Response(json.dumps(trials))


def build_input_info(info_profile, next_page, max_distance):
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
        "next_page": next_page,
        "max_distance": max_distance,
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
