import tweepy

# Twitter credentials
twitter_credentials = {}

def authenticateTwitter():
  auth = tweepy.OAuthHandler(twitter_credentials['consumer_key'], twitter_credentials['consumer_secret'])
  auth.set_access_token(twitter_credentials['access_token'], twitter_credentials['access_token_secret'])
  api = tweepy.API(auth)
  return api

def sendTweet(satellite):
  twitter = authenticateTwitter()
  twitter.update_status("Satellite " + satellite['name'] + " was just launched! Follow its orbit here https://uphere.space/satellites/" + satellite['number'] + " #uphere.space #satellitetracking")

