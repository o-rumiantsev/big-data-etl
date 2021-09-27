'use strict';

module.exports = {
  url: {
    triggerETL: process.env.TRIGGER_ETL
  },
  port: process.env.PORT,
  github: {
    user: process.env.GITHUB_USER,
    token: process.env.GITHUB_TOKEN,
  }
};