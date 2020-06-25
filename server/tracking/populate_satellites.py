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
import datetime

# Integrations
from satellite_sources import *
from twitter_integration import *
from prerender_integration import *
from google_integration import *
from wikipedia_integration import *

# Methods

# Connect to local or remote postgres DB
def connectDB():
  return psycopg2.connect(
    dbname = "defaultdb",
    user = "doadmin",
    password = "f384emytm3a5supc",
    host = "uphere-space-db-do-user-1621323-0.a.db.ondigitalocean.com",
    port = "25060"

    # dbname = "uphere-space",
    # user = "doadmin",
    # password = "i3280utmczxv65vq",
    # host = "uphere-space-db-do-user-6401666-0.db.ondigitalocean.com",
    # port = "25060"

    # dbname = "uphere-space",
    # user = "uphere-admin",
    # password = "c87PGaqOxDR8pdXz15zO",
    # host = "localhost",
    # port = "5432"
  )

# Scape photos from url
def scrapePhotos(site):
  response = requests.get(site)
  html = response.content
  soup = BeautifulSoup(html, 'html5lib')
  urls = []
  for elem in soup.findAll("div", {"class": "satellite-group-item"}):
    urls.append('https://db.satnogs.org/' + elem['data-image'])
  for url in urls:
    request.urlretrieve(url, "C://TEMP//" + os.path.basename(url))

# Read satellites TLE text file
def readSatelliteFile(url):
  satelliteNames = []
  html = request.urlopen(url).readlines()
  for index, line in enumerate(html):
    if (index % 3 == 0):
      satellite_name = line.strip().decode('utf-8')
      satellite_number = str(html[index+1]).split(' ', 2)[1].replace('U', '').replace(' ', '')
      satelliteNames.append({ "name": satellite_name, "number": satellite_number })
  return satelliteNames

# Save satellites to DB
def saveSatellitesToDB(cursor):
  for key in satellite_source_data:
    print(key)
    satellite_list = readSatelliteFile(satellite_source_data[key])
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
          #sendTweet(sat)

          #new_url = 'https://uphere.space/satellites/' + sat['number']

          # Prerender new url
          #addPrerenderUrl(new_url)

          # Notify Google of new url
          #addNewUrls(new_url)
          
        except psycopg2.Error:
          print(psycopg2.Error)

# Deactivate satellites no longer in orbit
def deactivateSatellites(cursor):
  # Get all active satellites
  active = []
  for key in satellite_source_data:
    satellite_list = readSatelliteFile(satellite_source_data[key])
    for sat in satellite_list:
      active.append(sat['number'])
  
  # Get satellites in DB
  existing = []
  cursor.execute('SELECT number FROM satellites')
  data = cursor.fetchall()
  for sat in data:
    existing.append(sat[0])

  inactive = list(set(existing) - set(active))
  print("Not in Orbit: ")
  print(inactive)

  if inactive:
    for remove_sat in inactive:
      cursor.execute(
        """
        UPDATE satellites 
        SET active = FALSE
        WHERE number = %(number)s
        """, 
        {
          'number': remove_sat
        }
      )
      connection.commit()

# Get launch data from Space-Track.org
def getLaunchData():
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

# Add additional properties from Space-Track.org
def addAdditionalProperties(cursor):
  leo_satellites = getLaunchData()
  for sat in leo_satellites:
    print(sat)
    cursor.execute('SELECT name FROM satellites WHERE number = %(sat_number)s AND number != \'25544\' AND number != \'45623\'', {'sat_number': sat['number']})
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

# Update document_vectors
def updateDocumentVectors(cursor):
  cursor.execute(
    """
    UPDATE satellites 
    SET document_vectors = 
      (
        to_tsvector(name) || 
        to_tsvector(number) || 
        to_tsvector(country) || 
        to_tsvector(type) || 
        to_tsvector(intldes)
      )
    """
  )
  connection.commit()

# Remove duplicate categories
def removeDuplicateCategories(duplicate): 
  final_list = [] 
  for num in duplicate: 
    if num not in final_list: 
      final_list.append(num) 
  return final_list

# Add categories from N2YO
def addCategories(cursor):
  category_list = []
  for key, val in categories.items():
    print(key)
    category = requests.get(val)
    soup = BeautifulSoup(category.content, 'lxml')
    category_table = soup.find('table', id='categoriestab') 
    tr = category_table.find_all('tr')
    categoryList = []
    for row in tr:
      for col in row:
        link = col.find_all('a')
        if link:
          href = link[0]['href']
          sat_number = re.findall(r'\d+', href)[0]
          categoryList.append(sat_number)
    category_list_item = {
      'name': soup.find('h1').text.replace(' SATELLITES', ''),
      'ids': categoryList
    }
    category_list.append(category_list_item)

  for index, cat in enumerate(category_list):
    cursor.execute('SELECT * FROM categories WHERE name = %(name)s', {'name': cat['name']})
    data = cursor.fetchall()
    cat['db_id'] = data[0][0]

  for index, cat in enumerate(category_list):
    sat_ids = removeDuplicateCategories(cat['ids'])
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

# Add wikipedia summary
def addSummaryToSatellite(cursor):
  cursor.execute("""
    SELECT DISTINCT(s.name) as name, s.intldes as int_id
    FROM satellites s
    JOIN satellite_categories sc ON s.id = sc.satellite_id
    WHERE s.description IS NULL
  """)
  data = cursor.fetchall()
  for sat in data:
    title = getPageTitle(sat[0], sat[1])
    if (title):
      summary = getSummary(title)
      if summary:
        print(sat[0])
        #print(summary)
        cursor.execute(
          """
          UPDATE satellites
          SET description = %(description)s
          WHERE name = %(name)s
          """, 
          {
            'description': summary,
            'name': sat[0]
          }
        )
        connection.commit()


### ...
### Begin Script
### 1. Scrape photos from SatNogs ('https://db.satnogs.org/')
### 2. Connect to DB
### 3. Scrape data from CelsTrak (https://celestrak.com/NORAD/elements/) and insert into DB
### 4. Deactivate satellites no longer in orbit
### 5. Add additional fields from Space-Track.org (https://www.space-track.org/#catalog)
### 6. Add categories from n2yo.com (https://www.n2yo.com/satellites/)
### 7. Add wikipedia summary from Wikipedia API
### ...

# 1.
print("STEP 1 - Scrape Photos")
# Get satnog photos
#scrapePhotos('https://db.satnogs.org/')
print("---SKIP---")

# 2.
# Connect to DB
print("STEP 2 - Connect to DB")
connection = connectDB()
cursor = connection.cursor()

# 3.
# Save satellite(s) to DB
print("STEP 3 - Save satellites to DB")
saveSatellitesToDB(cursor)

# 4.
# Deactivate satellites no longer in orbit
print("STEP 4 - Deactivate Satellites no longer in orbit")
deactivateSatellites(cursor)

# 5.
# Add additional properties from space-track.org
print("STEP 5 - Add additional properties from space-track.org")
addAdditionalProperties(cursor)
updateDocumentVectors(cursor)

# 6.
# Parse categories from n2yo.com
# Return format {name: "TEST", "ids": []}
print("STEP 6 - Add categories from n2yo.com")
addCategories(cursor)

# 7.
# Add Wikipedia summary
print("STEP 7 - Add wikipedia summary to satellite")
#addSummaryToSatellite(cursor)
