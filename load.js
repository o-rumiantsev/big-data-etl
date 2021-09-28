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
    client.openJDKEvents.createMany({
      data: events.openjdk.map(event => ({ data: event, createdAt: event.created_at })),
    }),
    client.mockingBirdEvents.createMany({
      data: events.mockingBird.map(event => ({ data: event, createdAt: event.created_at })),
    }),
    client.secretKnowledgeEvents.createMany({
      data: events.secretKnowledge.map(event => ({ data: event, createdAt: event.created_at })),
    }),
    client.hexagonEvents.createMany({
      data: events.hexagon.map(event => ({ data: event, createdAt: event.created_at })),
    })
  ]);
};

module.exports = {
  load
};