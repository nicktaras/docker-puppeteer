const puppeteer = require('puppeteer');

const run = ({ url, metaKeys }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      let urls = await page.evaluate((metaKeys) => {
        let output = {
          meta: [],
          link: []
        };

        // META Collection
        let meta = document.querySelectorAll('meta');
        meta.forEach((item) => {
          let outputItem = { name: '', content: '' };
          const logDataName = metaKeys.indexOf(item.getAttribute("name")) > -1;
          const logDataProperty = metaKeys.indexOf(item.getAttribute("property")) > -1;
          if (logDataName) outputItem['name'] = item.getAttribute("name");
          if (logDataProperty) outputItem['name'] = item.getAttribute("property");
          if (logDataProperty || logDataName) {
            outputItem.content = item.getAttribute("content");
            output.meta.push(outputItem);
          }
        })

        // LINK Collection
        // let link = document.querySelectorAll('link');
        // link.forEach((item) => {
        // { rel="" and keys=[] }
        // let outputItem = { name: '', content: '' };
        // const logDataName = metaKeys.indexOf(item.getAttribute("name")) > -1;
        // const logDataProperty = metaKeys.indexOf(item.getAttribute("property")) > -1;
        // if (logDataName) outputItem['name'] = item.getAttribute("name");
        // if (logDataProperty) outputItem['name'] = item.getAttribute("property");
        // if (logDataProperty || logDataName) {
        //   outputItem.content = item.getAttribute("content");
        //   output.link.push(outputItem);
        // }
        // })

        return output;
      }, metaKeys);
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
