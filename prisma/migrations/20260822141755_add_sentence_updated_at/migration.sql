/*
  Warnings:

  - Added the required column `updatedAt` to the `SENTENCE` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SENTENCE" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
