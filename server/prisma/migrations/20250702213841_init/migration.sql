-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postImages" TEXT,
ALTER COLUMN "music" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageURL" TEXT DEFAULT 'https://cdn-icons-png.flaticon.com/512/12225/12225935.png';
