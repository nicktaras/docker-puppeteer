const scraperUtils = require('./../src/scraperUtils');

test('expect https://www.bbc.co.uk/ to return meta icon', async () => {
  var output = scraperUtils.reduceSlashes("https://www.bbc.co.uk/");
  expect(output).toBe("https://www.bbc.co.uk/");
});


// scraperUtils = {
//   reduceSlashes(url) {
//     return url.replace(/(\/)(?=\/\1)/g, "");
//   },
//   removeRelativePath(url) {
//     if (url.indexOf('.') === 0) return url.replace('.', '');
//     return url;
//   },

