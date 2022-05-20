/*
  Warnings:

  - The primary key for the `usersMovies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `usersMovies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usersMovies" DROP CONSTRAINT "usersMovies_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "usersMovies_pkey" PRIMARY KEY ("movieId", "userId");
