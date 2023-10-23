from geopy.geocoders import Nominatim
from geopy.distance import geodesic

loc1 = "156 Bond St S, Hamilton, Ontario"
loc2 = "72 Livingstone Ave, Toronto"

locator = Nominatim(user_agent="my_request")

location1 = locator.geocode(loc1)
location2 = locator.geocode(loc2)

print(location1.latitude, location1.longitude)
print(location2.latitude, location2.longitude)
print(geodesic((location1.latitude, location1.longitude),(location2.latitude, location2.longitude)).kilometers)