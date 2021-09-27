-- CreateTable
CREATE TABLE "NodeJsEvents" (
    "id" UUID NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "NodeJsEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitHubEvents" (
    "id" UUID NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "GitHubEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinuxEvents" (
    "id" UUID NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "LinuxEvents_pkey" PRIMARY KEY ("id")
);
