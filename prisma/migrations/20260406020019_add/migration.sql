/*
  Warnings:

  - Added the required column `translate` to the `SENTENCE` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SENTENCE" ADD COLUMN     "translate" TEXT NOT NULL;
