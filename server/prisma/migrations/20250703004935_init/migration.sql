/*
  Warnings:

  - You are about to drop the column `music` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "music",
ADD COLUMN     "musicURL" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imageURL" DROP DEFAULT;
