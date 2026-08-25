/*
  Warnings:

  - Added the required column `supabaseId` to the `USER` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "USER" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER',
ADD COLUMN     "supabaseId" TEXT NOT NULL;
