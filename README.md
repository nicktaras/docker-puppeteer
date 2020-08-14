# docker-puppeteer
Puppeteer running within a docker container

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