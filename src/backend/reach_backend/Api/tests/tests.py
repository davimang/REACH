"""Module defining tests for the Api service."""
import json
from .test_setup import TestSearchTrialSetup
from unittest.mock import patch
from ..trial_fetcher import TrialFetcher
from ..views import build_input_info, calculate_age

class TestApi(TestSearchTrialSetup):
    """Test class for all api endpoints and related functions."""

    def test_valid_search_no_rank(self):
        """Test search when no rank is provided."""
        with patch.object(TrialFetcher, "search_studies", return_value={}) as mock_search, patch("Api.views.build_input_info", return_value={}) as mock_build:
            response = self.client.get(self.search_trials, {
                "info_id": self.patient_info.id
            })
            self.assertEqual(response.status_code, 200)
        mock_search.assert_called_once()
        mock_build.assert_called_once_with(info_profile=self.patient_info, rank=0)

    def test_valid_search_with_rank(self):
        """Test search when rank is provided."""
        with patch.object(TrialFetcher, "search_studies", return_value={}) as mock_search, patch("Api.views.build_input_info", return_value={}) as mock_build:
            response = self.client.get(self.search_trials, {
                "info_id": self.patient_info.id,
                "rank": 5
            })
            self.assertEqual(response.status_code, 200)
        mock_search.assert_called_once()
        mock_build.assert_called_once_with(info_profile=self.patient_info, rank=5)
    
    def test_invalid_search_missing_profile_id(self):
        """Test search when no profile id is provided."""
        with patch.object(TrialFetcher, "search_studies", return_value={}) as _, patch("Api.views.build_input_info", return_value={}) as _:
            response = self.client.get(self.search_trials, {
                "rank": 5
            })
            self.assertEqual(response.status_code, 400)

    def test_invalid_search_invalid_profile_id(self):
        """Test search when an invalid profile id is proived."""
        with patch.object(TrialFetcher, "search_studies", return_value={}) as _, patch("Api.views.build_input_info", return_value={}) as _:
            response = self.client.get(self.search_trials, {
                "info_id": 100,
                "rank": 5
            })
            self.assertEqual(response.status_code, 404)

    def test_build_input_info(self):
        """Test helper function build input info."""
        expected_info = {
            "age": 70,
            "sex": "Male",
            "address": {"street": "1280 Main St W", "city": "Hamilton", "province": "Ontario", "postalCode": "L8S 4L8"},
            "conditions": ["Asthma"],
            "maxRank":0,
            "numExacerbations": 0, 
            "numFlares": 0, 
            "usesInhaler": True, 
            "usesInjection": False, 
            "isSmoker": False, 
            "asthmaSeverity": "Mild", 
            "isEosinophilic": False
        }
        actual_info = build_input_info(self.patient_info, 0)
        assert expected_info == actual_info

    def test_calculate_age(self):
        """Test helper function calculate age."""
        expected_age = 70
        actual_age = calculate_age(self.patient_info.date_of_birth)
        assert expected_age == actual_age

    def test_get_saved_trials_filter_by_user(self):
        """Test endpoint to get saved trials for a specific user."""
        response = self.client.get(self.trials, {"user": self.user.id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_get_saved_trials_filter_by_profile_1(self):
        """Test endpoint to get saved trials for a specific profile."""
        response = self.client.get(self.trials, {"profile": self.patient_info.id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_get_saved_trials_filter_by_profile_2(self):
        """Test endpoint to get saved trials by a different profile."""
        response = self.client.get(self.trials, {"profile": self.patient_info2.id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_create_saved_trial(self):
        """Test endpoint to create a saved trial."""
        formatted_data = {**self.trial_data1}
        formatted_data["user"] = self.user.id
        formatted_data["profile"] = self.patient_info.id
        response = self.client.post(self.trials, data=json.dumps(formatted_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_get_patient_profiles_by_user(self):
        """Test endpoint to get patient profiles for a specific user."""
        response = self.client.get(self.profiles, {"user": self.user.id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_create_patient_profile(self):
        """Test endpoint to create a patient profile."""
        formatted_data = {**self.patient_info_data}
        formatted_data["user"] = self.user.id
        formatted_data["date_of_birth"] = "1954-01-01"
        response = self.client.post(self.profiles, data=json.dumps(formatted_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
