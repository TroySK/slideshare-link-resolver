var sync = require('synchronize');
var request = require('request');
var mustache = require('mustache');
var fs = require('fs');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();

  // SlideShare urls are in the format:
  // http://slideshare.net/<username>/<presentation-slug>
  var matches = url.match(/slideshare\.net\/([a-zA-Z0-9]+)\/([a-zA-Z0-9-]+)$/);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var response;
  try {
    response = sync.await(request({
      url: 'https://www.slideshare.net/api/oembed/2?url=' + url + '&format=json',
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }


  var template = fs.readFileSync('views/slideshare.mustache').toString();

  var html = mustache.to_html(template, {
    "title": response.body.title,
    "thumbnail": response.body.thumbnail,
    "width": response.body.width,
    "height": response.body.height,
    "html": response.body.html.trim(),
    "url": url
  });

  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};
