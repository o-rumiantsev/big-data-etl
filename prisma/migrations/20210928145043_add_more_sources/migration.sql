-- CreateTable
CREATE TABLE "OpenJDKEvents" (
    "id" UUID NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpenJDKEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockingBirdEvents" (
    "id" UUID NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MockingBirdEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecretKnowledgeEvents" (
    "id" UUID NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecretKnowledgeEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HexagonEvents" (
    "id" UUID NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HexagonEvents_pkey" PRIMARY KEY ("id")
);
