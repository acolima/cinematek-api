/*
  Warnings:

  - You are about to drop the column `backdropPath` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `runtime` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `usersMovies` table. All the data in the column will be lost.
  - You are about to drop the `genres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moviesGenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "moviesGenres" DROP CONSTRAINT "moviesGenres_genreId_fkey";

-- DropForeignKey
ALTER TABLE "moviesGenres" DROP CONSTRAINT "moviesGenres_movieId_fkey";

-- DropForeignKey
ALTER TABLE "usersMovies" DROP CONSTRAINT "usersMovies_genreId_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "backdropPath",
DROP COLUMN "overview",
DROP COLUMN "runtime";

-- AlterTable
ALTER TABLE "usersMovies" DROP COLUMN "genreId";

-- DropTable
DROP TABLE "genres";

-- DropTable
DROP TABLE "moviesGenres";
