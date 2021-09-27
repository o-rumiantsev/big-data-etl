/*
  Warnings:

  - Added the required column `createdAt` to the `GitHubEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `LinuxEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `NodeJsEvents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GitHubEvents" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LinuxEvents" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NodeJsEvents" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
