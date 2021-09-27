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

  return entry?.createdAt.toISOString();
};

const getPrismaDelegateByType = type => {
  switch (type) {
    case 'orgs/nodejs':
      return client.nodeJsEvents;
    case 'orgs/github':
      return client.gitHubEvents;
    case 'repos/torvalds/linux':
      return client.linuxEvents;
  }
}

module.exports = {
  getLastCreatedAt,
};
