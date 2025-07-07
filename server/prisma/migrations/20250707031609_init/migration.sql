/*
  Warnings:

  - The `postImages` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `musicURL` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postImages",
ADD COLUMN     "postImages" TEXT[],
DROP COLUMN "musicURL",
ADD COLUMN     "musicURL" TEXT[];
