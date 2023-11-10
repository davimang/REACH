from geopy.geocoders import Nominatim
from geopy.distance import geodesic

locator = Nominatim(user_agent="my_request")

class Distance():

    @staticmethod
    def get_distance_km(address1, address2):
        location1 = locator.geocode(address1)
        location2 = locator.geocode(address2)

        path_between = geodesic((location1.latitude, location1.longitude),(location2.latitude, location2.longitude))
        return path_between.kilometers

print(Distance.get_distance_km("72 Livingstone Ave, Toronto, Ontario, Canada", "Mayo Clinic, Rochester, Minnesota 55905, United States"))
