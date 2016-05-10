# SlideShare Embed for Mixmax

This is an open source Mixmax Link Resolver. Just paste a SlideShare url in your Gmail/Inbox compose window and watch it transform into an embedded presentation automagically. See <http://sdk.mixmax.com/docs/tutorial-giphy-link-preview> for more information about how to build similar resolvers in Mixmax.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9146/resolver?url=http%3A%2F%2Fwww.slideshare.net%2Fpinky14%2Fwhat-happens-online-every-60-seconds-61379808
```
