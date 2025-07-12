/*
  Warnings:

  - You are about to drop the column `follow` on the `Post` table. All the data in the column will be lost.
  - Added the required column `postEventType` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postGenre` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('POP', 'CLASSICAL', 'LATIN', 'HOUSE', 'COUNTRY', 'HIPHOP', 'JAZZ', 'ROCK', 'DISCO', 'EDM', 'BLUES', 'LOFI');

-- CreateEnum
CREATE TYPE "Event" AS ENUM ('CONCERT', 'FESTIVAL', 'NIGHTCLUB', 'SPEAKEASY', 'BAND', 'STUDIO', 'AWARDS', 'CLASSES', 'THEATER');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "follow",
ADD COLUMN     "postEventType" "Event" NOT NULL,
ADD COLUMN     "postGenre" "Genre" NOT NULL,
ALTER COLUMN "postImages" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "musicURL" DROP NOT NULL,
ALTER COLUMN "musicURL" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "eventType" "Event"[] DEFAULT ARRAY['CONCERT', 'FESTIVAL', 'NIGHTCLUB', 'SPEAKEASY', 'BAND', 'STUDIO', 'AWARDS', 'CLASSES', 'THEATER']::"Event"[],
ADD COLUMN     "genres" "Genre"[] DEFAULT ARRAY['POP', 'CLASSICAL', 'LATIN', 'HOUSE', 'COUNTRY', 'HIPHOP', 'JAZZ', 'ROCK', 'DISCO', 'EDM', 'BLUES', 'LOFI']::"Genre"[],
ADD COLUMN     "likedPosts" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
