'use strict';

const github = require('./github');
const { getLastCreatedAt } = require('./last-created-at');

const extract = async () => {
  const [
    nodejsEvents,
    githubEvents,
    openjdkEvents,
  ] = await Promise.all([
    getNewEvents('orgs/nodejs'),
    getNewEvents('orgs/github'),
    getNewEvents('orgs/openjdk'),
  ]);
  const [
    linuxEvents,
    mockingBirdEvents,
    secretKnowledgeEvents,
    hexagonEvents,
  ] = await Promise.all([
    getNewEvents('repos/torvalds/linux'),
    getNewEvents('repos/babysor/MockingBird'),
    getNewEvents('repos/trimstray/the-book-of-secret-knowledge'),
    getNewEvents('repos/Sairyss/domain-driven-hexagon'),
  ]);
  return {
    nodejs: nodejsEvents,
    github: githubEvents,
    linux: linuxEvents,
    openjdk: openjdkEvents,
    mockingBird: mockingBirdEvents,
    secretKnowledge: secretKnowledgeEvents,
    hexagon: hexagonEvents,
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
