"""Unit testing for the trial filterer module."""
import pandas as pd
from geopy.geocoders import Nominatim
from ..trial_filterer import TrialFilterer

locator = Nominatim(user_agent="my_request")
home_geo = locator.geocode("1280 Main St W, Hamilton, Ontario L8S 4L8", timeout=10)

input_params = {
    "conditions": ["asthma"],
    "maxRank": 0,
    "age": 40,
    "sex": "Male",
    "max_distance": 100,
    "address": {
        "street": "1280 Main St W",
        "city": "Hamilton",
        "province": "Ontario",
        "postalCode": "L8S 4L8",
    },
    "packYears": 5,
    "numExacerbations": 12,
}

test_trials = {
    "NCTId": ["10", "11", "12"],
    "Keyword": ["", "exacerbation", ""],
    "MinimumAge": ["18 years", "18 years", "50 years"],
    "MaximumAge": ["100 years", "20 years", "100 years"],
    "LocationCity": ["Hamilton", "Toronto", "Miami"],
    "LocationState": ["Ontario", "Ontario", "Florida"],
    "LocationZip": ["L8S 1T2", "M6E 2L8", "10010"],
    "LocationCountry": ["Canada", "Canada", "United States"],
    "LocationLatitude": [43.2617, 43.6532, 25.7617],
    "LocationLongitude": [-79.9228, -79.3832, -80.1918],
    "Gender": ["MALE", "FEMALE", "ALL"],
    "OverallStatus": ["RECRUITING", "RECRUITING", "RECRUITING"],
}

test_df = pd.DataFrame(test_trials)


def test_clean_age():
    """Test helper function for parsing/cleaning string containing age.

    Module: TrialFilterer
    Id: UNT-15
    """
    test_age = "12 years"
    assert TrialFilterer.clean_age(test_age) == 12


def test_address():
    """Test helper function for generating an address.

    Module: TrialFilterer
    Id: UNT-16
    """
    df = TrialFilterer.generate_address(test_df)
    assert df.at[0, "FullAddress"] == "Hamilton, Ontario L8S 1T2, Canada"


def test_gender():
    """Test helper function for filtering trials based on gender.

    Module: TrialFilterer
    Id: UNT-17
    """
    df = TrialFilterer.filter_gender("Male", test_df)
    assert df.shape[0] == 2


def test_filter_trials():
    """Test filter trials.

    Module: TrialFilterer
    Id: UNT-18
    """
    df = TrialFilterer.filter_trials(test_df, input_params)
    assert df.shape[0] == 1


def test_post_filter():
    """Test post filter.

    Module: TrialFilterer
    Id: UNT-19
    """
    df = TrialFilterer.post_filter(test_df, input_params, home_geo)
    assert df.shape[0] == 2


def test_get_distance_km():
    """Test helper function for getting the distance between two locations in km.

    Module: TrialFilterer
    Id: UNT-20
    """
    output = TrialFilterer.get_distance_km(43.6635, -79.3961, 43.2617, -79.9228)
    assert abs(output - 61.64) < 0.1
