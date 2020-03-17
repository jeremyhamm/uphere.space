# Send new satellite urls to be prerendered

import requests
import json

endpoint = 'https://api.prerender.io/recache'

def addPrerenderUrl(url):
  body = dict(
    prerenderToken='bvr3j7yP6o7m7KCLVTIV',
    url=url
  )
  requests.post(endpoint, body)