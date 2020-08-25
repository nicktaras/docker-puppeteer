const puppeteer = require('puppeteer');
const metaKeys = require('./metaKeys.json');
const linkKeys = require('./linkKeys.json');
const scraperUtils = require('./scraperUtils.js');

const run = ({ url }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      let urls = await page.evaluate(({ metaKeys, linkKeys, scraperUtils }) => {
        let output = {
          meta: {},
          link: {},
          output: {}
        };
        // Title
        output.meta.title = document.querySelectorAll('title')[0];
        // META Collection
        let meta = document.querySelectorAll('meta');
        meta.forEach((item) => {
          let outputItem = { name: '', content: '' };
          const logDataName = metaKeys.indexOf(item.getAttribute("name")) > -1;
          const logDataProperty = metaKeys.indexOf(item.getAttribute("property")) > -1;
          if (logDataName) outputItem.name = item.getAttribute("name");
          if (logDataProperty) outputItem.name = item.getAttribute("property");
          if (logDataProperty || logDataName) {
            outputItem.content = item.getAttribute("content");
            output.meta[outputItem.name] = { content: outputItem.content };
          }
        })
        // LINK Collection
        let link = document.querySelectorAll('link');
        link.forEach((item) => {
          const logDataRelIndex = linkKeys.map.indexOf(item.getAttribute("rel"));
          if (logDataRelIndex > -1) {
            const relName = item.getAttribute("rel");
            output.link[relName] = {};
            linkKeys.keys[logDataRelIndex].keys.map((itemKey) => {
              output.link[relName][itemKey] = item.getAttribute(itemKey);
            })
          }
        })
        return output;
      }, { metaKeys, linkKeys });
      browser.close();
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  })
}

// Entry Point
// Recieves URL
// Attempts to webscrape with Puppetter
// With result, cleans up found URLs to located images
// returns output or error
module.exports = async ({ url }) => {
  const urlObject = new URL(url);
  const host = urlObject.host;
  const protocol = urlObject.protocol;
  try {
    const result = await run({ url });
    var output = result;
    const reqProtocol = (protocol.indexOf('https') <= -1) ? 'http' : 'https';
    for (var key in output.link) {
      if (output.link[key].href) {
        output.link[key].href = scraperUtils.getCleanLink({
          link: output.link[key].href,
          host: host,
          reqProtocol: reqProtocol
        })
        output.output['icon'] = output.link[key].href;
      }
    }
    for (var key in output.meta) {
      if (key.indexOf('description') > -1) {
        output.output['description'] = output.meta[key]
      }
      if (key.indexOf('title') > -1) {
        output.output['title'] = output.meta[key]
      }
      if (key.indexOf('subject') > -1) {
        output.output['subject'] = output.meta[key]
      }
      if (key.indexOf('keywords') > -1) {
        output.output['keywords'] = output.meta[key]
      }
      if (key.indexOf('image') > -1) {
        output.output['image'] = output.meta[key]
      }
    }
    return output;
  } catch (error) {
    return error
  }
};
