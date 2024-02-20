from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.urls import reverse
from ..models import UserData, PatientInfo


class TestSearchTrialSetup(APITestCase):
    def setUp(self):
        self.search_trials = reverse('search-trials')
        self.user = User.objects.create_user(username='test-user', password='test-pass')
        self.user_data = UserData.objects.create(
            first_name="first",
            last_name="last",
            is_clinician=False,
            user=self.user
        )
        self.patient_info = PatientInfo.objects.create(
            user=self.user,
            date_of_birth="1954-01-01",
            address={"street": "1280 Main St W", "city": "Hamilton", "province": "Ontario", "postalCode": "L8S 4L8"},
            gender="M",
            advanced_info={"numExacerbations": 0, "numFlares": 0, "usesInhaler": True, "usesInjection": False, "isSmoker": False, "asthmaSeverity": "Mild", "isEosinophilic": False},
            title="Test-Profile-1",
            condition= "Asthma"
        )

        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()