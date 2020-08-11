// webMetaScraper

const puppeteer = require('puppeteer');
function run({ url, mKeys }) {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      let urls = await page.evaluate((mKeys) => {
        let output = [];
        let meta = document.querySelectorAll('meta');
        meta.forEach((item) => {
          let outputItem = { name: '', content: '' };
          const logDataName = mKeys.indexOf(item.getAttribute("name")) > -1;
          const logDataProperty = mKeys.indexOf(item.getAttribute("property")) > -1;
          if (logDataName) outputItem['name'] = item.getAttribute("name");
          if (logDataProperty) outputItem['name'] = item.getAttribute("property");
          if (logDataProperty || logDataName) {
            outputItem.content = item.getAttribute("content");
            output.push(outputItem);
          }
        })
        return output;
      }, mKeys);
      browser.close();
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  })
}

module.exports = async (url) => {
  return await run(url);
};
