/*
  Warnings:

  - You are about to drop the column `assignById` on the `ProjectUserRelation` table. All the data in the column will be lost.
  - Added the required column `assignedById` to the `ProjectUserRelation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectUserRelation" DROP COLUMN "assignById",
ADD COLUMN     "assignedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectUserRelation" ADD CONSTRAINT "ProjectUserRelation_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
