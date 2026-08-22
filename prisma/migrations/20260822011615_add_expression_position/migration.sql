/*
  Warnings:

  - Added the required column `endIndex` to the `EXPRESSION_SENTENCE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startIndex` to the `EXPRESSION_SENTENCE` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EXPRESSION_SENTENCE" ADD COLUMN     "endIndex" INTEGER NOT NULL,
ADD COLUMN     "startIndex" INTEGER NOT NULL;
