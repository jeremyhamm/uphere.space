# Send new satellite urls to be prerendered

import requests
import json

endpoint = 'https://api.prerender.io/recache'

def addPrerenderUrl(url):
  body = dict(
    prerenderToken=,
    url=url
  )
  requests.post(endpoint, body)
