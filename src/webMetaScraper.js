const puppeteer = require('puppeteer');
const metaKeys = require('./metaKeys.json');
const linkKeys = require('./linkKeys.json');
const scraperUtils = require('./scraperUtils.js');

// Questions to answer:
// 1. Should we provide a custom interface YES e.g.
// { 
//    icon: Most suitable icon,
//    title: Most suitable tite, 
//    description: Most suitable description... 
// }
// 2. Should we use a DB to cache all requests YES
//    Or use a CDN Cache Layer etc / TTL.
//    - Security issues could arise e.g. people changing icon to zip.

const run = ({ url }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      let urls = await page.evaluate(({ metaKeys, linkKeys, scraperUtils }) => {
        let output = {
          meta: {},
          link: {}
        };
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
      }
    }
    return output;
  } catch (error) {
    return error
  }
};
