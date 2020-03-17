import tweepy

# Twitter credentials
twitter_credentials = {
  'consumer_key': 'tD6sFxHUTczoSOnvnztFwIIs9',
  'consumer_secret': 'L51qGSMMDbxeXAZqZ2JLPkqdMiYYamJcjW1kMTVK2QZzK9ylGS',
  'access_token': '1183116222159716352-AEW6Yh8ZkUKHZFI7chQJVYBmvuoxWO',
  'access_token_secret': 'inCz7I4a5QNVISetL0X1r4Tbgg3ECWDuGat1QrI5sfKUX'
}

def authenticateTwitter():
  auth = tweepy.OAuthHandler(twitter_credentials['consumer_key'], twitter_credentials['consumer_secret'])
  auth.set_access_token(twitter_credentials['access_token'], twitter_credentials['access_token_secret'])
  api = tweepy.API(auth)
  return api

def sendTweet(satellite):
  twitter = authenticateTwitter()
  twitter.update_status("Satellite " + satellite['name'] + " was just launched! Follow its orbit here https://uphere.space/satellites/" + satellite['number'] + " #uphere.space #satellitetracking")

