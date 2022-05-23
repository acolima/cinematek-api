-- DropForeignKey
ALTER TABLE "listMovies" DROP CONSTRAINT "listMovies_listId_fkey";

-- AddForeignKey
ALTER TABLE "listMovies" ADD CONSTRAINT "listMovies_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
