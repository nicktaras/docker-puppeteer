const test = require('./src/webMetaScraper.js');

const result = test({
  url: "https://www.github.com/", mKeys: [
    "charset",
    "title",
    "description",
    "keywords",
    "subject",
    "Classification",
    "topic",
    "summary",
    "og:title",
    "og:type",
    "og:url",
    "og:image",
    "og:site_name",
    "og:description",
    "fb:page_id",
    "og:email",
    "og:phone_number",
    "og:fax_number",
    "twitter:card",
    "twitter:site",
    "twitter:title",
    "twitter:description",
    "twitter:creator",
    "twitter:image"
  ]
}).then((data) => {
  console.log(data);
}).catch((err) => {
  console.log('failed', err);
})