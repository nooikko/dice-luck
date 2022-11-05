/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassLevel` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Archetype" AS ENUM ('BARBARIAN', 'BARD', 'CLERIC', 'DRUID', 'FIGHTER', 'MONK', 'PALADIN', 'RANGER', 'ROGUE', 'SORCERER', 'WARLOCK', 'WIZARD', 'ARTIFICER', 'BLOOD_HUNTER');

-- DropForeignKey
ALTER TABLE "ClassLevel" DROP CONSTRAINT "ClassLevel_characterId_fkey";

-- DropForeignKey
ALTER TABLE "ClassLevel" DROP CONSTRAINT "ClassLevel_classId_fkey";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "ClassLevel";

-- CreateTable
CREATE TABLE "ArchetypeLevel" (
    "id" TEXT NOT NULL,
    "archetype" "Archetype" NOT NULL,
    "characterId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ArchetypeLevel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArchetypeLevel" ADD CONSTRAINT "ArchetypeLevel_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
