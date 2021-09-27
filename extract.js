'use strict';

const github = require('./github');
const { getLastCreatedAt } = require('./last-created-at');

const extract = async () => {
  const [nodejsEvents, githubEvents, linuxEvents] = await Promise.all([
    getNewEvents('orgs/nodejs'),
    getNewEvents('orgs/github'),
    getNewEvents('repos/torvalds/linux')
  ]);
  return {
    nodejs: nodejsEvents,
    github: githubEvents,
    linux: linuxEvents,
  }
};

const getNewEvents = async (type) => {
  const result = [];
  const iterator = github.iterate(`${type}/events`);
  const lastCreatedAt = await getLastCreatedAt(type);

  for await (const events of iterator) {
    let lastEventIndex = undefined;

    const lastEvent = events.find((event, index) => {
      if (event.created_at < lastCreatedAt) {
        lastEventIndex = index;
        return true;
      }
    });


    const eventsToPush =
      lastEvent
        ? events.slice(0, lastEventIndex)
        : events;

    result.push(...eventsToPush);

    if (lastEvent) {
      break;
    }
  }

  console.log(type, result.length);
  return result;
};


module.exports = {
  extract,
};
