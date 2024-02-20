"""Module defining tests for the Api service."""
from .test_setup import TestSearchTrialSetup
from unittest.mock import MagicMock, patch
from ..trial_fetcher import TrialFetcher

class TestSearchTrial(TestSearchTrialSetup):

    def test_valid_search_no_rank(self):
        with patch.object(TrialFetcher, "search_studies", return_value={}) as mock_search, patch("Api.views.build_input_info", return_value={}) as mock_build:
            response = self.client.get(self.search_trials, {
                "info_id": 1
            })
            self.assertEqual(response.status_code, 200)
        mock_search.assert_called_once()
        mock_build.assert_called_once_with(info_profile=self.patient_info, rank=0)

    def test_valid_search_with_rank(self):
        with patch.object(TrialFetcher, "search_studies", return_value={}) as mock_search, patch("Api.views.build_input_info", return_value={}) as mock_build:
            response = self.client.get(self.search_trials, {
                "info_id": 1,
                "rank": 5
            })
            self.assertEqual(response.status_code, 200)
        mock_search.assert_called_once()
        mock_build.assert_called_once_with(info_profile=self.patient_info, rank=5)
    
    def test_invalid_search_missing_profile_id(self):
        with patch.object(TrialFetcher, "search_studies", return_value={}) as _, patch("Api.views.build_input_info", return_value={}) as _:
            response = self.client.get(self.search_trials, {
                "rank": 5
            })
            self.assertEqual(response.status_code, 400)

    def test_invalid_search_invalid_profile_id(self):
        with patch.object(TrialFetcher, "search_studies", return_value={}) as _, patch("Api.views.build_input_info", return_value={}) as _:
            response = self.client.get(self.search_trials, {
                "info_id": 100,
                "rank": 5
            })
            self.assertEqual(response.status_code, 404)
