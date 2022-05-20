/*
  Warnings:

  - The primary key for the `movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `movies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "usersMovies" DROP CONSTRAINT "usersMovies_movieId_fkey";

-- AlterTable
ALTER TABLE "movies" DROP CONSTRAINT "movies_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "movies_pkey" PRIMARY KEY ("tmdbId");

-- AddForeignKey
ALTER TABLE "usersMovies" ADD CONSTRAINT "usersMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE;
