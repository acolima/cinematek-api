/*
  Warnings:

  - You are about to drop the `ListMovies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListMovies" DROP CONSTRAINT "ListMovies_listId_fkey";

-- DropForeignKey
ALTER TABLE "ListMovies" DROP CONSTRAINT "ListMovies_movieId_fkey";

-- DropIndex
DROP INDEX "lists_name_key";

-- DropTable
DROP TABLE "ListMovies";

-- CreateTable
CREATE TABLE "listMovies" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "listMovies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "listMovies" ADD CONSTRAINT "listMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listMovies" ADD CONSTRAINT "listMovies_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
