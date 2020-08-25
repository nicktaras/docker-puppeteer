const domainExtList = require('./domainExtList');

const scraperUtils = {
  reduceSlashes(url) {
    return url.replace(/(\/)(?=\/\1)/g, "");
  },
  removeRelativePath(url) {
    if (url.indexOf('.') === 0) return url.replace('.', '');
    return url;
  },
  getIconMaxSize(sizes) {
    if (!sizes) console.warn('getIconMaxSize: sizes were missing');
    const sIndex = sizes ? sizes.lastIndexOf('x') + 1 : undefined;
    return (sizes && sIndex) ? Number(sizes.substring(sIndex, sizes.length)) : undefined;
  },
  includeRelativeSlash(url) {
    if (url.indexOf('/') <= -1) return '/' + url;
    return url;
  },
  getCleanLink({ link, host, reqProtocol }) {
    if (!link) console.warn('getCleanLink: link was missing');
    const indexOfHttp = link.indexOf('http');
    const indexOfWww = link.indexOf('www');
    // if link found starts with a relative path ./
    link = this.removeRelativePath(link);
    // if link contains no /
    link = this.includeRelativeSlash(link);
    // e.g. htts://www.a.com/favicon.ico
    if (indexOfHttp === 0 || indexOfWww === 0) return link;
    // e.g. example.www.a.com/favicon.ico
    if (indexOfWww > 0 && indexOfHttp === -1) {
      const removeChars = link.substring(0, indexOfWww);
      link = link.replace(removeChars, '');
      return this.reduceSlashes(`${reqProtocol}://${link}`);
    }
    // e.g. example.https://a.com/favicon.ico
    if (indexOfHttp > 0) {
      const removeChars = link.substring(0, indexOfHttp);
      return link.replace(removeChars, '');
    }
    // e.g. static.com/favicon.ico
    const linkToArray = link.toUpperCase().split(/(?=[\/.])/g);
    const matchFound = linkToArray.some(r => domainExtList.indexOf(r) >= 0);
    if (matchFound) {
      return this.reduceSlashes(`${reqProtocol}://${link}`);
    }
    if (host) {
      return this.reduceSlashes(reqProtocol + '://' + host + '/' + link);
    }
    return undefined;
  }
}

module.exports = scraperUtils;
