'use strict';

const { URL } = require('url');
const axios = require('axios');
const parseLinkHeader = require('parse-link-header');
const config = require('./config');

const GITHUB_API_URL = 'https://api.github.com';

const token = Buffer.from(`${config.github.user}:${config.github.token}`).toString('base64');

const iterate = (path) => {
  let nextURL = new URL(path, GITHUB_API_URL).href;

  const next = async () => {
    try {
      console.log('iterate', path)
      const result = await request(nextURL);
      nextURL = result.link.next.url;
      return {
        done: result.link.next.url === result.link.last.url,
        value: result.data,
      };
    } catch (error) {
      console.error(path, error);
      return {
        done: true,
        value: [],
      }
    }
  };

  return {
    [Symbol.asyncIterator]() {
      return {
        next,
      };
    },
  };
}

const request = (url, params) => axios.request({
  url,
  headers: {
    accept: 'application/vnd.github.v3+json',
    authorization: `Basic ${token}`,
  },
  params,
}).then(response => {
  return {
    data: response.data,
    link: parseLinkHeader(response.headers.link)
  };
});

module.exports = {
  iterate,
  request,
};


