/*
  Warnings:

  - The primary key for the `usersMovies` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "usersMovies" DROP CONSTRAINT "usersMovies_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "usersMovies_pkey" PRIMARY KEY ("id");
