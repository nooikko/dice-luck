/*
  Warnings:

  - Added the required column `userId` to the `ArchetypeLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArchetypeLevel" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ArchetypeLevel" ADD CONSTRAINT "ArchetypeLevel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
