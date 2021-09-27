'use strict';

const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

const load = async (events) => {
  await Promise.all([
    client.nodeJsEvents.createMany({
      data: events.nodejs.map(event => ({ data: event, createdAt: event.created_at })),
    }),
    client.gitHubEvents.createMany({
      data: events.github.map(event => ({ data: event, createdAt: event.created_at })),
    }),
    client.linuxEvents.createMany({
      data: events.linux.map(event => ({ data: event, createdAt: event.created_at })),
    }),
  ]);
};

module.exports = {
  load
};