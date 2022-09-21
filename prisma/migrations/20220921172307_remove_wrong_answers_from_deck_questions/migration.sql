/*
  Warnings:

  - You are about to drop the column `wrongAnswer1` on the `deckQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `wrongAnswer2` on the `deckQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `wrongAnswer3` on the `deckQuestions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deckQuestions" DROP COLUMN "wrongAnswer1",
DROP COLUMN "wrongAnswer2",
DROP COLUMN "wrongAnswer3";
