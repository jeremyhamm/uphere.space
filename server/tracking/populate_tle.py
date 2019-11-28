import urllib.request
from skyfield.api import Topos, load, EarthSatellite
from skyfield.positionlib import ICRF
from skyfield.vectorlib import VectorFunction
import redis
from satellite_sources import *

# Methods
def read_satellite_file(url):
  satelliteNames = []
  html = urllib.request.urlopen(url).readlines()
  for index, line in enumerate(html):
    satellite_value = line.strip().decode('utf-8')
    if (index % 3 == 0):
      satellite = {}
      key = satellite_value #str(html[index+1]).split(' ', 2)[1].replace('U', '').replace(' ', '')
      satellite[key] = {"tle1": html[index+1], "tle2": html[index+2]} 
      satelliteNames.append(satellite)
  return satelliteNames

def connect_redis():
  pool = pool = redis.ConnectionPool(host='satellite-list-do-user-6401666-0.db.ondigitalocean.com', password='du4riwzdieyv098q', port=25061, connection_class=redis.SSLConnection)
  return redis.Redis(connection_pool=pool)

def save_to_redis(name, elements):
  existing = r.exists(name)
  if not existing:
    r.hmset(name, elements)

# Logic
r = connect_redis()
r.flushall()
for key in satellite_source_data:
  print(key)
  satellite_list = read_satellite_file(satellite_source_data[key])
  for sat in satellite_list:
    for key, value in sat.items():
      save_to_redis(key, value)