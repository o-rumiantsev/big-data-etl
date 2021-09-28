'use strict';

const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

const getLastCreatedAt = async (type) => {
  const prismaDelegate = getPrismaDelegateByType(type);

  const entry = await prismaDelegate.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        createdAt: true,
      }
    });

  console.log(type, 'last created at', entry?.createdAt || null)
  return entry?.createdAt.toISOString();
};

const getPrismaDelegateByType = type => {
  switch (type) {
    case 'orgs/nodejs':
      return client.nodeJsEvents;
    case 'orgs/github':
      return client.gitHubEvents;
    case 'orgs/openjdk':
      return client.openJDKEvents;
    case 'repos/torvalds/linux':
      return client.linuxEvents;
    case 'repos/babysor/MockingBird':
      return client.mockingBirdEvents;
    case 'repos/trimstray/the-book-of-secret-knowledge':
      return client.secretKnowledgeEvents;
    case 'repos/Sairyss/domain-driven-hexagon':
      return client.hexagonEvents;
  }
}

module.exports = {
  getLastCreatedAt,
};
