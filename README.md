# docker-puppeteer

Puppeteer running within a docker container

# Usage and Instructions

This micro service is designed to scrape and store data to Redis / flat file system.

### Local Dev

0. Install and run `brew services start redis` to start up redis. Providing the cache mechanism. 

1. run `node server` to test the application via a web browser or Postman. Providing a Url

e.g. `localhost:8080//api/v1/?url=https://facebook.com`

2. run `yarn test` to test the application

### Docker Dev

See Docker steps below. This is still a working progress item. However you should be able to
start docker and access the micro service as required. 

## TODO:

- Add logic to add the correct path to the URLS (some tidying needed in this area)
- Add tests (check expected outcomes rather than specific meta text)
- Tidy and simplify the code
- Apply Re-Direct Logic to make the service more robust (!!!AFTER MVP!!!)
- Host the Micro Service ensuring it is secure and can only be used by CloudLinks

## Redis:

https://gist.github.com/tomysmile/1b8a321e7c58499ef9f9441b2faa0aa8

### start

brew services start redis

### stop

brew services stop redis

## Docket commands

### Build image

`docker build -t nicktaras/web-meta-scraper .`

### Run image

`docker run -p 8080:8080 -d nicktaras/web-meta-scraper`

### Check image exists

`docker images`

### Check image is running

`docker ps`

## Example output

````

  [
    {
      name: 'description',
      content: 'GitHub brings together the world’s largest community of developers to discover, share, and build better software. From open source projects to private team repositories, we’re your all-in-one platform for collaborative development.'
    },
    { name: 'og:url', content: 'https://github.com' },
    { name: 'og:site_name', content: 'GitHub' },
    { name: 'og:title', content: 'Build software better, together' },
    {
      name: 'og:description',
      content: 'GitHub is where people build software. More than 50 million people use GitHub to discover, fork, and contribute to over 100 million projects.'
    },
    {
      name: 'og:image',
      content: 'https://github.githubassets.com/images/modules/open_graph/github-logo.png'
    },
    {
      name: 'og:image',
      content: 'https://github.githubassets.com/images/modules/open_graph/github-mark.png'
    },
    {
      name: 'og:image',
      content: 'https://github.githubassets.com/images/modules/open_graph/github-octocat.png'
    },
    { name: 'twitter:site', content: 'github' },
    { name: 'twitter:creator', content: 'github' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'GitHub' },
    {
      name: 'twitter:description',
      content: 'GitHub is where people build software. More than 50 million people use GitHub to discover, fork, and contribute to over 100 million projects.'
    }
  ]

````
