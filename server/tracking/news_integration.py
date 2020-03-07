import requests
import json
import psycopg2

# Connect to local or remote postgres DB
def connectDB():
  return psycopg2.connect(
    # dbname = "uphere-space",
    # user = "doadmin",
    # password = "i3280utmczxv65vq",
    # host = "uphere-space-db-do-user-6401666-0.db.ondigitalocean.com",
    # port = "25060"
    dbname = "uphere-space",
    user = "uphere-admin",
    password = "c87PGaqOxDR8pdXz15zO",
    host = "localhost",
    port = "5432"
  )

def findArticles(term):
  params = {
    'search': term
  }
  url = 'https://spaceflightnewsapi.net/api/v1/articles'
  r = requests.get(url, params=params)
  return json.loads(r.text)['docs']

def findNews(cursor):
  cursor.execute('SELECT name, number FROM satellites')
  data = cursor.fetchall()
  for sat in data:
    term = sat[0]
    number = sat[1]
    
    articles = findArticles(term)
    for article in articles:
      cursor.execute('SELECT article_id FROM news')
      existing_articles = cursor.fetchall()

      found = False
      for existing in existing_articles:
        
        print(str(existing))
        print(''.join(article['_id']))
        
        if (str(existing) == str(article['_id'])):
          print("here")

      # cursor.execute(
      #   """
      #   INSERT INTO news (satellite_number, title, url, image, article_id, news_organization, published_date) 
      #   VALUES (
      #     %(satellite_number)s,
      #     %(title)s,
      #     %(url)s,
      #     %(image)s,
      #     %(article_id)s,
      #     %(news_organization)s,
      #     %(published_date)s
      #   )
      #   """, 
      #   {
      #     'satellite_number': number,
      #     'title': article['title'],
      #     'url': article['url'],
      #     'image': article['featured_image'],
      #     'article_id': article['_id'],
      #     'news_organization': article['news_site_long'],
      #     'published_date': article['published_date']
      #   }
      # )
      # connection.commit()

connection = connectDB()
cursor = connection.cursor()
findNews(cursor)







