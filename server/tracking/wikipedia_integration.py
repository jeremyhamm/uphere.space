import requests
import wikipediaapi

# Get page title page
def getPageTitle(term, int_id):
  url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&srlimit=1&srnamespace=0&list=search&srsearch=" + str(term) + " " + str(int_id)
  r = requests.get(url)
  data = r.json()
  if (data['query']):
    if (data['query']['search']):
      if (data['query']['search'][0]):
        return data['query']['search'][0]['title']
  else:
    return None

# Get article summary
def getSummary(title):
  wiki_wiki = wikipediaapi.Wikipedia('en')
  page_py = wiki_wiki.page(title)
  if (page_py.exists()):
    return page_py.summary
  else:
    return None