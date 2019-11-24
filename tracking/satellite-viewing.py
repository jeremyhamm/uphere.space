from simple_rest_client.api import API
from skyfield.api import Topos, load, EarthSatellite
import datetime

# REST API
api = API(
  api_root_url='http://134.209.63.38/api/',
  params={},
  headers={},
  append_slash=False,
  json_encode_body=True
)

# Variables
spaceStations = 'https://www.celestrak.com/NORAD/elements/stations.txt'
brightest100 = 'https://www.celestrak.com/NORAD/elements/visual.txt'
activeSatellites = 'https://www.celestrak.com/NORAD/elements/active.txt'
stations_url = activeSatellites
satellite_list = [
  "ALTAIR PATHFINDER",
  "AQUA",
  "GOES 17",
  "HST",
  "IRIS",
  "ISS (ZARYA)",
  "STARLINK A"
]

def get_satellite(url, satellite):
  satellites = load.tle(url)
  return satellites[satellite]


satellite = get_satellite(stations_url, "ISS (ZARYA)")
home = Topos('32.8002678 N', '-117.1377616 W')
difference = satellite - home
ts = load.timescale()
t = ts.utc(datetime.datetime.now(datetime.timezone.utc))
topocentric = difference.at(t)
alt, az, distance = topocentric.altaz()
if alt.degrees > 0:
  print('The ISS is above the horizon')
print(alt)
print(az)
print(distance.km)