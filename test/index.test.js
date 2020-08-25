const webMetaScraper = require('./../src/webMetaScraper');

const linkTestData = [
  // { url: "https://www.apple.com.au/", expected: "https://www.apple.com.au/favicon.ico" },
  { url: "https://reactjs.org/", expected: "https://reactjs.org/favicon.ico" },
  { url: "https://www.sony.com.au/", expected: "https://www.sony.com.au/assets/images/Favicon_144x144.png" },
  { url: "https://www.bbc.co.uk/", expected: "https://www.bbc.co.uk/favicon.ico" },
  { url: "https://github.com", expected: "https://github.githubassets.com/favicon.ico" },
  { url: "https://auspost.com.au/", expected: "https://auspost.com.au/content/dam/global/favicons/apple-touch-icon-144x144.png" },
  { url: "https://www.ibm.com/au-en", expected: "https://www.ibm.com/favicon.ico" },
  { url: "https://www.bose.com.au/en_au/index.html", expected: "https://static.bose.com/etc/designs/bose/consumer-products-2016/favicon.ico" },
  { url: "https://momentjs.com", expected: "https://momentjs.com/static/img/moment-favicon.png" },
  { url: "https://slack.com/intl/en-au/", expected: "https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png" },
  { url: "https://www.ministryofsound.com/", expected: "https://www.ministryofsound.com/media/3982/mos-favicon.png?width=32&height=32" },
  { url: "https://brave.com/", expected: "https://brave.com/wp-content/uploads/2018/02/cropped-brave_appicon_release-32x32.png" },
  { url: "https://swedishhousemafia.com/", expected: "https://swedishhousemafia.com/gfx/meta/favicon.ico?1615" },
  { url: "https://firebase.com", expected: "https://www.gstatic.com/devrel-devsite/v2355ed73ae6b243a36832e70498f2cd0b3f352ff30481ebdfdc56826b566bf8a/firebase/images/favicon.png" }
];

// Fixes: Ensure the URLS start with HTTPS:
// www.sony.com/image/sonyview1?fmt=png&wid=1200
// Add URL Before the Link:
// /favicon-32x32.png?v=f4d46f030265b4c48a05c999b8d93791
// Save OG Image, but do not use as Icon:
// https://www.apple.com/favicon.ico e.g. large image or small icon.
// https://auspost.com.au/content/dam/auspost_corp/media/images/photo-man-and-woman-holding-hands-on-pier-water-boats-background.jpg
// Should we remove 'static' (downloads the ico)
// bose.com/etc/designs/bose/consumer-products-2016/favicon.ico
// static.bose.com/etc/designs/bose/consumer-products-2016/favicon.ico
// Missing the start of the URL (MOS)
// /media/3982/mos-favicon.png?width=180&height=180
// Difficult ./gfx/meta/favicon.ico?1615 (https://swedishhousemafia.com/)

jest.setTimeout(30000);

test('Ensure Meta Contains Icons', async () => {
  for (var i = 0; i < linkTestData.length; i++) {
    const result = await webMetaScraper({ url: linkTestData[i].url });
    console.log(linkTestData[i].url, result);
    expect((result.output.icon) ? true : false).toBe(true);
  }
});


