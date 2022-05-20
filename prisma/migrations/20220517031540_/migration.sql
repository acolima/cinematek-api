/*
  Warnings:

  - You are about to drop the column `categoryId` on the `usersMovies` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "usersMovies" DROP CONSTRAINT "usersMovies_categoryId_fkey";

-- AlterTable
ALTER TABLE "usersMovies" DROP COLUMN "categoryId",
ADD COLUMN     "dislike" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "genreId" INTEGER,
ADD COLUMN     "watched" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "watchlist" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "categories";

-- AddForeignKey
ALTER TABLE "usersMovies" ADD CONSTRAINT "usersMovies_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;
