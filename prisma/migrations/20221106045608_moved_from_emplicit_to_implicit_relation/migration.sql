/*
  Warnings:

  - You are about to drop the `ProjectUserRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectUserRelation" DROP CONSTRAINT "ProjectUserRelation_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUserRelation" DROP CONSTRAINT "ProjectUserRelation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUserRelation" DROP CONSTRAINT "ProjectUserRelation_userId_fkey";

-- DropTable
DROP TABLE "ProjectUserRelation";

-- CreateTable
CREATE TABLE "_ProjectToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToUser_AB_unique" ON "_ProjectToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToUser_B_index" ON "_ProjectToUser"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
