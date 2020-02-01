import requests
import wikipediaapi

def getPageTitle(term):
  url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&srlimit=1&list=search&srsearch=' + term
  r = requests.get(url)
  data = r.json()
  title = data['query']['search'][0]['title']
  return title

def getSummary(title):
  wiki_wiki = wikipediaapi.Wikipedia('en')
  page_py = wiki_wiki.page(title)
  if (page_py.exists()):
    return page_py.summary
  else:
    return None