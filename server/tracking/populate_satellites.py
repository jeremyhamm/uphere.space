import os
import sys
import psycopg2
from urllib import request
import requests
import re
import json
from bs4 import BeautifulSoup
import spacetrack.operators as op
from spacetrack import SpaceTrackClient
from satellite_sources import *
import datetime
import tweepy

# Methods
def connect_db():
  return psycopg2.connect(
    dbname = "uphere-space",
    user = "doadmin",
    password = "i3280utmczxv65vq",
    host = "uphere-space-db-do-user-6401666-0.db.ondigitalocean.com",
    port = "25060"
    # dbname = "uphere-space",
    # user = "uphere-admin",
    # password = "c87PGaqOxDR8pdXz15zO",
    # host = "localhost",
    # port = "5432"
  )

def read_satellite_file(url):
  satelliteNames = []
  html = request.urlopen(url).readlines()
  for index, line in enumerate(html):
    if (index % 3 == 0):
      satellite_name = line.strip().decode('utf-8')
      satellite_number = str(html[index+1]).split(' ', 2)[1].replace('U', '').replace(' ', '')
      satelliteNames.append({ "name": satellite_name, "number": satellite_number })
  return satelliteNames

def get_launch_data():
  st = SpaceTrackClient(identity=spacetrack_identity, password=spacetrack_password)
  data = st.satcat(decay=None, current='Y')
  launch_data = []
  for sat in data:
    print(sat)
    launch_data.append(
      {
        "intldes": sat['INTLDES'],
        'name': sat['SATNAME'],
        "number": sat['NORAD_CAT_ID'],
        "date": sat['LAUNCH'],
        "orbital_period": sat['PERIOD'],
        "country": sat['COUNTRY'],
        "type": sat['OBJECT_TYPE'],
        "size": sat['RCS_SIZE']
      }
    )
  return launch_data

def scrape_photos(site):
  response = requests.get(site)
  html = response.content
  soup = BeautifulSoup(html, 'html5lib')
  urls = []
  for elem in soup.findAll("div", {"class": "satellite-group-item"}):
    urls.append('https://db.satnogs.org/' + elem['data-image'])
  for url in urls:
    request.urlretrieve(url, "C://TEMP//" + os.path.basename(url))

def remove_duplicates(duplicate): 
  final_list = [] 
  for num in duplicate: 
    if num not in final_list: 
      final_list.append(num) 
  return final_list

def authenticate_twitter():
  auth = tweepy.OAuthHandler(twitter_credentials['consumer_key'], twitter_credentials['secret'])
  auth.set_access_token(twitter_credentials['access_token'], twitter_credentials['access_token_secret'])
  api = tweepy.API(auth)
  return api

### ...
### Begin Script
### 1. Scrape photos from SatNogs ('https://db.satnogs.org/')
### 2. Connect to DB
### 3. Scrape data from CelsTrak (https://celestrak.com/NORAD/elements/) and insert into DB
### 4. Add additional fields from Space-Track.org (https://www.space-track.org/#catalog)
### 5. Add categories from n2yo.com (https://www.n2yo.com/satellites/)
### ...

# 1.
# Get satnog photos
#scrape_photos('https://db.satnogs.org/')

# 2.
# Connect to DB
connection = connect_db()
cursor = connection.cursor()

# 3.
# Save satellite(s) to DB
new_satellite_data = ()
for key in satellite_source_data:
  print(key)
  satellite_list = read_satellite_file(satellite_source_data[key])
  for sat in satellite_list:
    cursor.execute('SELECT name FROM satellites WHERE number = %(sat_number)s', {'sat_number': sat['number']})
    data = cursor.fetchall()
    if not data:
      try:
        cursor.execute(
          """
            INSERT INTO satellites (name, number, classification, active, launch_date)
            VALUES (%(name)s, %(number)s, %(classification)s, %(active)s, %(launch_date)s);
          """, 
          {'name': sat['name'], 'number': sat['number'], 'classification': 'U', 'active': True, 'launch_date': datetime.datetime.now()}
        )
        connection.commit()
        
        # Send tweet with my satellite info
        twitter = authenticate_twitter()
        twitter.update_status("Satellite " + sat['name'] + " was just launched! Follow its orbit here https://uphere.space/satellites" + sat['name'])
      
      except psycopg2.Error:
        print(psycopg2.Error)

# 4.
# Add additional properties from space-track.org
leo_satellites = get_launch_data()
for sat in leo_satellites:
  print(sat)
  cursor.execute('SELECT name FROM satellites WHERE number = %(sat_number)s', {'sat_number': sat['number']})
  data = cursor.fetchall()
  if data:
    cursor.execute(
      """
      UPDATE satellites 
      SET intldes = %(intldes)s,
      name = %(name)s, 
      launch_date = %(date)s,
      orbital_period = %(period)s,
      country = %(country)s,
      type = %(type)s,
      size = %(size)s
      WHERE number = %(number)s
      """, 
      {
        'intldes': sat['intldes'],
        'name': sat['name'],
        'date': sat['date'], 
        'period': sat['orbital_period'], 
        'country': sat['country'],
        'type': sat['type'],
        'size': sat['size'],
        'number': sat['number']
      }
    )
    connection.commit()

# 5.
# Parse categories from n2yo.com
# Return format {name: "TEST", "ids": []}
category_list = []
for key, val in categories.items():
  print(key)
  category = requests.get(val)
  soup = BeautifulSoup(category.content, 'lxml')
  category_table = soup.find('table', id='categoriestab') 
  tr = category_table.find_all('tr')
  categories = []
  for row in tr:
    for col in row:
      link = col.find_all('a')
      if link:
        href = link[0]['href']
        sat_number = re.findall(r'\d+', href)[0]
        categories.append(sat_number)
  category_list_item = {
    'name': soup.find('h1').text.replace(' SATELLITES', ''),
    'ids': categories
  }
  category_list.append(category_list_item)

for index, cat in enumerate(category_list):
  cursor.execute('SELECT * FROM categories WHERE name = %(name)s', {'name': cat['name']})
  data = cursor.fetchall()
  cat['db_id'] = data[0][0]

for index, cat in enumerate(category_list):
  sat_ids = remove_duplicates(cat['ids'])
  for nid in sat_ids:
    cursor.execute('SELECT id, number FROM satellites WHERE number = %(number)s', {'number': nid})
    data = cursor.fetchall()
    if data:
      # Check for existing satellite_id & category_id in table
      cursor.execute(
        """
          SELECT satellite_id, category_id
          FROM satellite_categories
          WHERE satellite_id = %(satellite_id)s AND category_id = %(category_id)s
        """,
        {'satellite_id': data[0][0], 'category_id': cat['db_id']}
      )
      existing_category = cursor.fetchall()
      # If not found add new category to satellite
      if not existing_category:
        cursor.execute(
          """
            INSERT INTO satellite_categories (satellite_id, category_id)
            VALUES (%(satellite_id)s, %(category_id)s);
          """, 
          {'satellite_id': data[0][0], 'category_id': cat['db_id']}
        )
        connection.commit()
