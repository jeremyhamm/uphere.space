import requests
import json
import psycopg2

# Connect to local or remote postgres DB
def connectDB():
  return psycopg2.connect(
    dbname = "uphere-space",
    user = "uphere-admin",
    password = ,
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
  cursor.execute('SELECT name, number FROM satellites WHERE name LIKE\'%SPACE STATION%\'')
  data = cursor.fetchall()
  for sat in data:
    term = sat[0]
    number = sat[1]
    
    articles = findArticles(term)
    for article in articles:
      cursor.execute('SELECT article_id FROM news WHERE article_id = %(article_id)s', {'article_id': article['_id']})
      existing_article = cursor.fetchall()
      
      if not existing_article:
        print(article['news_site'])
        print(article['title'])
        print(article['url'])
        print(article['featured_image'])
        print(article['_id'])
        print("-----")

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







