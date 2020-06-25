import urllib.request
from skyfield.api import Topos, load, EarthSatellite
from skyfield.positionlib import ICRF
from skyfield.vectorlib import VectorFunction
import redis
from satellite_sources import *

# Methods
def read_satellite_file(url):
  satelliteNumbers = []
  html = urllib.request.urlopen(url).readlines()
  for index, line in enumerate(html):
    #satellite_value = line.strip().decode('utf-8')
    if (index % 3 == 0):
      satellite = {}
      key = str(html[index+1]).split(' ', 2)[1].replace('U', '').replace(' ', '')
      satellite[key] = {"tle1": html[index+1], "tle2": html[index+2]} 
      satelliteNumbers.append(satellite)
  return satelliteNumbers

def connect_redis():
  # pool = redis.ConnectionPool(
  #   host='redis',
  #   port=6379
  # )
  pool = redis.ConnectionPool(
    host='uphere-space-sattelite-list-do-user-1621323-0.a.db.ondigitalocean.com',
    password="vycqi41k2bccix7c",
    port=25061,
    connection_class=redis.SSLConnection
  )
  return redis.Redis(connection_pool=pool)

def save_to_redis(number, elements):
  existing = r.exists(number)
  if not existing:
    r.hmset(number, elements)

# Logic
r = connect_redis()
r.flushall()
# f = open("temp.txt","w+")
for key in satellite_source_data:
  print(key)
  satellite_list = read_satellite_file(satellite_source_data[key])
  for sat in satellite_list:
    for key, value in sat.items():
      # print(key)
      # f.write(key + "\r")
      save_to_redis(key, value)
# f.close()