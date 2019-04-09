# [thoro.news](https://thoro.news)
> Automated news aggregator.

![Sources Badge](https://img.shields.io/endpoint.svg?url=https://api.thoro.news/api/stats/badges/sources.json&style=for-the-badge)
![Articles Badge](https://img.shields.io/endpoint.svg?url=https://api.thoro.news/api/stats/badges/articles.json&style=for-the-badge)
![Uptime](https://img.shields.io/uptimerobot/ratio/m781040119-fa1f7f481be9520d132082b1.svg?style=for-the-badge)

![Header](https://github.com/mstrlaw/thoro.news/blob/master/static/images/app_gif.gif?raw=true)


## What is Thoro News
Thoro News - or simply Thoro - is a free news aggregator service that scrapes thousands of articles on a daily basis and groups them into common topics. 

It allows to understand what are the dominating conversations and themes around the media landscape as well as discovering articles that could otherwise be missed under traditional platforms for news consumption [i.e. Facebook, Apple News, Twitter, Reddit, etc).

It is [@mstrlaw](https://mstrlaw.com)'s side project.

## The case for creating a news aggregator
Thoro was born out multiple needs that weren't met from other services, mainly:

* Ability to follow a very large amount of news sources and still be able to consume the information in a time-conscious way;
* Avoid the prevalent filter-bubble from social media algorithms that show you "what we think you'll want to see";
* Provide a way to see what are trending topics at a glance and easily explore each trend cluster;



### Features

* +120 unique news sources and counting;
* Near real-time retrieval of articles;
* Classification of articles into categories (Business, Politics[Global, U.S.A. & European] and Technology )
* Clustering of common news articles globally and per category;
* Display of realtime cryptocurrency market capitalization % change (provided by [coincap.io](https://coincap.io/));
* Display of related top Tweets when exploring a trend cluster;

### Stack
* [Nuxt.Js](https://nuxtjs.org)
* [Node.Js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [DigitalOcean](https://digitalocean.com)

Frontend using [Bulma](https://bulma.io) + custom SCSS. Individual components can be checked [here](https://styleguide.thoro.news/?path=/story/card--default).

Thoro is entirely written using Javascript. 

### Architecture
Thoro follows a microservice architecture pattern comrpised of a Nuxt.Js web app, a Node/Express API, two NodeJs scraping services (getter_1 & getter_2) and one data cruncher service.

The flow is +/- as follows:

1. scraper_1 & scraper_2 each run multiple scheduled cron jobs to retrieve articles and insert them in the DB;
2. cruncher service runs multiple scheduled cron jobs that:
a) clean and normalize articles' data for later processing;
  b) classify articles into categories;
  c) generate theme clusters globally and per each categories by aggregating up to 5000 articles inserted since start of given day;
3. Web app requests data through the API;

![Architecture](https://github.com/mstrlaw/thoro.news/blob/master/static/images/architecture.png?raw=true)

### TODO/Future

- [ ] Merge tests branch
- [ ] Move remaining ToDo list to here
