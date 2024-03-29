"""Module defining test setup/teardown class."""

from datetime import datetime
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import UserData, PatientInfo, Trial


class TestApiSetup(APITestCase):
    """Class for api test setup."""

    def setUp(self):
        """Setup before tests run."""
        self.search_trials = reverse("search-trials")
        self.trials = "/trials/"
        self.profiles = "/patientinfo/"
        self.userdata = "/userdata/"
        self.user = User.objects.create_user(username="test-user", password="test-pass")
        self.auth1 = get_auth_for_user(self.user)
        self.user2 = User.objects.create_user(
            username="test-user2", password="test-pass2"
        )
        self.auth2 = get_auth_for_user(self.user2)
        self.patient_info_data = {
            "user": self.user,
            "date_of_birth": datetime(1954, 1, 1),
            "address": {
                "street": "1280 Main St W",
                "city": "Hamilton",
                "province": "Ontario",
                "postalCode": "L8S 4L8",
            },
            "gender": "M",
            "advanced_info": {
                "numExacerbations": 0,
                "numFlares": 0,
                "usesInhaler": True,
                "usesInjection": False,
                "isSmoker": False,
                "asthmaSeverity": "Mild",
                "isEosinophilic": False,
            },
            "title": "Test-Profile",
            "condition": "Asthma",
        }
        self.user_data = UserData.objects.create(
            first_name="first", last_name="last", is_clinician=False, user=self.user
        )
        self.patient_info = PatientInfo.objects.create(**self.patient_info_data)
        self.patient_info2 = PatientInfo.objects.create(**self.patient_info_data)
        self.trial_data1 = {
            "user": self.user,
            "profile": self.patient_info,
            "title": "Trial",
            "description": "Description",
            "url": "http://localhost:8000/",
            "contact_email": "david@email.com",
            "principal_investigator": "Bob",
            "location": {"latitude": 1, "longitude": 1},
            "status": "Recruiting",
            "distance": 1000,
            "nctid": "fakeid",
        }
        self.trial_data2 = {**self.trial_data1}
        self.trial_data2["profile"] = self.patient_info2

        self.trial1 = Trial.objects.create(**self.trial_data1)
        self.trial2 = Trial.objects.create(**self.trial_data2)
        return super().setUp()

    def tearDown(self):
        """Teardown after tests finish."""
        return super().tearDown()


def get_auth_for_user(user):
    """Helper function to authorize a user for testing"""
    refresh = RefreshToken.for_user(user)
    return {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}
