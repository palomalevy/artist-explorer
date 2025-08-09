-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "following" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;
