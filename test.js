const webMetaScraper = require('./src/webMetaScraper.js');
const metaKeys = require('./metaKeys.json');

const result = webMetaScraper({ url: "https://www.github.com/", metaKeys }).then((data) => {
  console.log(data);
}).catch((err) => {
  console.log('failed', err);
})