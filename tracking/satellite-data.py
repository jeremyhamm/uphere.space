from multiprocessing import Process
import urllib.request
import pytz
import datetime
from skyfield.api import Topos, load, EarthSatellite
from skyfield.positionlib import ICRF
from skyfield.vectorlib import VectorFunction
import redis
import time
import numpy as np

# Variables
spaceStations = 'https://www.celestrak.com/NORAD/elements/stations.txt'
brightest100 = 'https://www.celestrak.com/NORAD/elements/visual.txt'
activeSatellites = 'https://www.celestrak.com/NORAD/elements/active.txt'
stations_url = activeSatellites

def dms_to_dd(coord):
  coordStr = str(coord).split(" ")
  deg = coordStr[0].replace("deg", "")
  minutes = coordStr[1].replace("'", "")
  seconds = coordStr[2].replace('"', "")
  
  # If negitive number save minus sign
  decimalDegrees = ''
  if (float(deg) < 0):
    decimalDegrees += '-'
  return float(decimalDegrees + str(abs(float(deg)) + float(minutes)/60 + float(seconds)/3600))

def m_to_miles(meters):
  return float(meters * 0.00062137)

def merge(list1, list2):
    merged_list = [[list1[i], list2[i]] for i in range(0, len(list1))]
    return merged_list

def get_satellite(url, satellite):
  satellites = load.tle(url)
  return satellites[satellite]

def read_satellite_file(url):
  html = urllib.request.urlopen(url).readlines()
  satelliteNames = []
  for index, line in enumerate(html):
    if (index % 3 == 0):
      formattedLine = line.strip().decode('utf-8')
      satelliteNames.append(formattedLine)
  return satelliteNames

def find_location(satellite_name):
  
  # Find current location of iss
  satellite = None
  try:
    satellite = get_satellite(stations_url, satellite_name)
  except:
    error = None
    # print(satellite_name + " is no longer in orbit")
  
  if satellite:
    ts = load.timescale()
    t = ts.utc(datetime.datetime.now(datetime.timezone.utc))
    days = t - satellite.epoch
    if abs(days) > 14:
      satellites = load.tle(stations_url, reload=True)
      satellite = satellites[satellite]

    # Get current coordinates for satellite
    subpoint = satellite.at(t).subpoint()

    # Get orbital path and save in tracklist
    minutes = np.arange(0, 100, 1)
    now = datetime.datetime.now(datetime.timezone.utc)
    time = ts.utc(now.year, now.month, now.day, now.hour, minutes)
    track = satellite.at(time).subpoint()
    trackList = str(merge(track.latitude.degrees, track.longitude.degrees))
    
    home = Topos('32.8002678 N', '-117.1377616 W')
    difference = satellite - home
    topocentric = difference.at(t)
    speed_meters = topocentric.speed().km_per_s * 1000
    mph = ((m_to_miles(speed_meters) * 60) * 60)
    
    # alt, az, distance = topocentric.altaz()
    # if alt.degrees > 0:
    #   print('The ISS is above the horizon')
    # print(alt)
    # print(az)
    # print(distance.km)

    # Create location dictionary
    return {
      "lng" : dms_to_dd(subpoint.longitude),
      "lat" : dms_to_dd(subpoint.latitude),
      "height" : m_to_miles(subpoint.elevation.m),
      "speed" : mph,
      "track": trackList
    }

# Save coords to redis
def save_to_redis(satellite, location):
  pool = redis.ConnectionPool(host='localhost', password='RoWxWabXZ%CHSj7No|ZL|\PfvKDS*`Rz', port=6379)
  r = redis.Redis(connection_pool=pool)
  r.hmset(satellite, location)

# Process runner
def run_process(satellite):
  while True:
    location = find_location(satellite)
    if location:
      save_to_redis(satellite, location)
      time.sleep(1)

# Run one process for each satellite
if __name__ == '__main__':
  # satelliteList = read_satellite_file(stations_url)
  
  satellite_list = [
    "ALTAIR PATHFINDER",
    "AQUA",
    "GOES 17",
    "HST",
    "IRIS",
    "ISS (ZARYA)",
    "STARLINK A"
  ]
  for sat in satellite_list:
    proc = Process(target=run_process, args=(sat,))
    proc.start()
