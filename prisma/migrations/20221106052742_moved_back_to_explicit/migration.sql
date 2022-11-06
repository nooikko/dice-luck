/*
  Warnings:

  - You are about to drop the `_UsersOnProjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UsersOnProjects" DROP CONSTRAINT "_UsersOnProjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_UsersOnProjects" DROP CONSTRAINT "_UsersOnProjects_B_fkey";

-- DropTable
DROP TABLE "_UsersOnProjects";

-- CreateTable
CREATE TABLE "ProjectUserRelation" (
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectUserRelation_pkey" PRIMARY KEY ("userId","projectId")
);

-- AddForeignKey
ALTER TABLE "ProjectUserRelation" ADD CONSTRAINT "ProjectUserRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUserRelation" ADD CONSTRAINT "ProjectUserRelation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUserRelation" ADD CONSTRAINT "ProjectUserRelation_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
